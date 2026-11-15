function normalizeAnswer(text) {
  return text.normalize('NFC').toLowerCase().replace(/[‘’]/g, "'")
    .replace(/[.,!?;:«»"()]/g, ' ').trim().replace(/\s+/g, ' ');
}

for (const field of document.querySelectorAll('li [aria-label="Your answer"]')) {
  const row = field.closest('li');
  const comparison = row.querySelector('details');
  const answer = normalizeAnswer(comparison.querySelector('p').textContent);
  const accepted = [answer];
  const prompt = normalizeAnswer(row.querySelector('p').textContent).split(' ');
  if (field.tagName === 'INPUT' && prompt.includes('___')) {
    const words = answer.split(' ');
    accepted.push(prompt.flatMap((word, i) => word === '___' ? [words[i]] : []).join(' '));
  }

  const status = document.createElement('span');
  status.setAttribute('role', 'status');
  function check() {
    const value = normalizeAnswer(field.value);
    status.textContent = !value ? ' Enter an answer.' :
      accepted.includes(value) ? ' ✓ Correct' : ' ✗ Incorrect';
  }

  if (field.tagName === 'INPUT') {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Check answer';
    field.after(' ', button, status);
    button.addEventListener('click', check);
    field.addEventListener('keydown', event => {
      if (event.key === 'Enter') check();
    });
    field.addEventListener('input', () => { status.textContent = ''; });
  } else {
    field.after(status);
    field.addEventListener('change', check);
  }
  comparison.addEventListener('toggle', () => {
    if (comparison.open && field.value.trim()) check();
  });
}
