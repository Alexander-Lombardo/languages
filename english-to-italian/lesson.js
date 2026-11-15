const lessons=[
[["What's your name?","Come ti chiami?"],["Nice to meet you.","Piacere di conoscerti."],["I'm from Italy.","Vengo dall’Italia."],["See you tomorrow.","Ci vediamo domani."]],
[["A coffee, please.","Un caffè, per favore."],["How much is it?","Quanto costa?"],["Can I pay by card?","Posso pagare con la carta?"],["That's all, thank you.","È tutto, grazie."]],
[["Where is the station?","Dov’è la stazione?"],["I'd like a return ticket.","Vorrei un biglietto di andata e ritorno."],["What time does the train leave?","A che ora parte il treno?"],["Is this seat free?","Questo posto è libero?"]]];
const $=id=>document.getElementById(id);
let step=0,score=0;
function draw(){
 const rows=lessons[$('lesson').selectedIndex],end=step===rows.length;
 $('count').textContent=end?'LEZIONE COMPLETATA':'ESERCIZIO '+(step+1)+' / '+rows.length;
 $('choices').replaceChildren();$('feedback').textContent='';
 $('phrase').lang=end?'it':'en';$('phrase').textContent=end?'Hai finito!':rows[step][0];
 $('listen').hidden=end||!('speechSynthesis' in window);
 $('next').hidden=!end;$('next').textContent=end?'Ricomincia':'Continua →';
 if(end){$('feedback').textContent='Risposte corrette: '+score+' su '+rows.length;return}
 const options=rows.map(r=>r[1]);
 for(let i=options.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[options[i],options[j]]=[options[j],options[i]]}
 for(const value of options){const b=document.createElement('button');b.textContent=value;b.onclick=()=>{const ok=value===rows[step][1];score+=Number(ok);$('feedback').textContent=ok?'Esatto!':'La risposta corretta è: '+rows[step][1];for(const item of $('choices').children)item.disabled=true;$('next').hidden=false};$('choices').append(b)}
}
$('lesson').onchange=()=>{step=score=0;draw()};
$('next').onclick=()=>{if(step===lessons[$('lesson').selectedIndex].length)step=score=0;else step++;draw()};
$('listen').onclick=()=>{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance($('phrase').textContent);u.lang='en-GB';speechSynthesis.speak(u)};
draw();
