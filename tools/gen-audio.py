#!/usr/bin/env python3
"""Generate neural TTS audio for a language's course content.

Reads the spoken-string list from tools/dump-strings.js, synthesizes each with
Microsoft Edge neural voices (edge-tts), and writes content-addressed MP3s plus
a text->file manifest into site/<code>/audio/.

Idempotent: existing files are kept, orphans are deleted, the manifest is
rewritten every run.

Usage:
  pip3 install edge-tts
  python3 tools/gen-audio.py fr [--limit N]
"""
import asyncio
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

import edge_tts

# Voice slots per language: f1 = default voice (vocab, readings, exercises and
# female dialogue speaker #1), m1 = male speaker #1, f2/m2 = second speaker of the
# same gender. Each entry is (edge voice, pitch). ru-RU ships one voice per gender,
# so its second slots are pitch-shifted variants.
VOICES = {
    "fr": {"f1": ("fr-FR-DeniseNeural", "+0Hz"), "m1": ("fr-FR-HenriNeural", "+0Hz"),
           "f2": ("fr-FR-VivienneMultilingualNeural", "+0Hz"), "m2": ("fr-FR-RemyMultilingualNeural", "+0Hz")},
    "de": {"f1": ("de-DE-KatjaNeural", "+0Hz"), "m1": ("de-DE-ConradNeural", "+0Hz"),
           "f2": ("de-DE-AmalaNeural", "+0Hz"), "m2": ("de-DE-KillianNeural", "+0Hz")},
    "ru": {"f1": ("ru-RU-SvetlanaNeural", "+0Hz"), "m1": ("ru-RU-DmitryNeural", "+0Hz"),
           "f2": ("ru-RU-SvetlanaNeural", "-8Hz"), "m2": ("ru-RU-DmitryNeural", "-8Hz")},
    "it": {"f1": ("it-IT-ElsaNeural", "+0Hz"), "m1": ("it-IT-DiegoNeural", "+0Hz"),
           "f2": ("it-IT-IsabellaNeural", "+0Hz"), "m2": ("it-IT-GiuseppeMultilingualNeural", "+0Hz")},
    "es": {"f1": ("es-MX-DaliaNeural", "+0Hz"), "m1": ("es-MX-JorgeNeural", "+0Hz"),
           "f2": ("es-US-PalomaNeural", "+0Hz"), "m2": ("es-US-AlonsoNeural", "+0Hz")},
    "en": {"f1": ("en-US-JennyNeural", "+0Hz"), "m1": ("en-US-GuyNeural", "+0Hz"),   # standalone English app
           "f2": ("en-US-AriaNeural", "+0Hz"), "m2": ("en-US-ChristopherNeural", "+0Hz")},
}
RATE = "-5%"          # slightly slower for learners (matches the app's 0.95 TTS rate)
CONCURRENCY = 8
RETRIES = 3

SITE = Path(__file__).resolve().parent.parent


def speech_text(text: str) -> str:
    """Preprocess for synthesis only — manifest keys keep the exact original."""
    return re.sub(r"\s*/\s*", ", ", text)


def manifest_key(text: str, slot: str) -> str:
    """Manifest key: plain text for the default voice, "[m1] text" etc. otherwise
    (must match the lookup in app.js)."""
    return text if slot == "f1" else f"[{slot}] {text}"


def fname(key: str) -> str:
    return hashlib.sha1(key.encode("utf-8")).hexdigest()[:16] + ".mp3"


async def synth(sem: asyncio.Semaphore, voice: str, pitch: str, text: str, dest: Path) -> bool:
    async with sem:
        for attempt in range(RETRIES):
            try:
                tmp = dest.with_suffix(".tmp")
                await edge_tts.Communicate(speech_text(text), voice, rate=RATE, pitch=pitch).save(str(tmp))
                if tmp.stat().st_size < 200:  # sanity: an mp3 this small is broken
                    tmp.unlink()
                    raise RuntimeError("suspiciously small output")
                tmp.rename(dest)
                return True
            except Exception as e:
                if attempt == RETRIES - 1:
                    print(f"FAILED: {text[:60]!r}: {e}", file=sys.stderr)
                    return False
                await asyncio.sleep(2 * (attempt + 1))
    return False


async def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args or args[0] not in VOICES:
        sys.exit(f"usage: gen-audio.py <{'|'.join(VOICES)}> [--limit N]")
    code = args[0]
    limit = None
    for a in sys.argv[1:]:
        if a.startswith("--limit"):
            limit = int(sys.argv[sys.argv.index(a) + 1] if a == "--limit" else a.split("=")[1])

    out = subprocess.run(
        ["node", str(SITE / "tools" / "dump-strings.js"), code],
        capture_output=True, text=True, check=True,
    )
    items = json.loads(out.stdout)  # [{t, v}]
    if limit:
        items = items[:limit]
    slots = VOICES[code]
    print(f"{code}: {len(items)} strings, voices " + ", ".join(f"{k}={v[0]}" for k, v in slots.items()))

    audio_dir = SITE / ("english" if code == "en" else code) / "audio"
    audio_dir.mkdir(parents=True, exist_ok=True)

    keyed = {manifest_key(i["t"], i["v"]): i for i in items}
    manifest = {k: fname(k) for k in keyed}
    if len(set(manifest.values())) != len(manifest):
        sys.exit("sha1 filename collision — investigate before generating")

    todo = [(keyed[k], audio_dir / f) for k, f in manifest.items() if not (audio_dir / f).exists()]
    print(f"{len(manifest) - len(todo)} cached, {len(todo)} to synthesize")

    sem = asyncio.Semaphore(CONCURRENCY)
    done = 0
    failed = 0

    async def run(item, dest):
        nonlocal done, failed
        voice, pitch = slots[item["v"]]
        ok = await synth(sem, voice, pitch, item["t"], dest)
        done += 1
        failed += 0 if ok else 1
        if done % 100 == 0 or done == len(todo):
            print(f"  {done}/{len(todo)} ({failed} failed)")

    await asyncio.gather(*(run(item, dest) for item, dest in todo))

    if failed:
        sys.exit(f"{failed} strings failed — rerun to retry (existing files are kept)")

    # drop orphans from previous content versions (only when generating the full set)
    if not limit:
        keep = set(manifest.values()) | {"manifest.js"}
        for f in audio_dir.iterdir():
            if f.name not in keep:
                f.unlink()

        (audio_dir / "manifest.js").write_text(
            "/* GENERATED by tools/gen-audio.py — do not edit. */\n"
            "window.AUDIO_FILES = " + json.dumps(manifest, ensure_ascii=False) + ";\n",
            encoding="utf-8",
        )
        print("wrote manifest.js")

    size = sum(f.stat().st_size for f in audio_dir.glob("*.mp3"))
    print(f"total: {len(list(audio_dir.glob('*.mp3')))} files, {size // 1024 // 1024} MB")


if __name__ == "__main__":
    asyncio.run(main())
