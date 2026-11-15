const deck = document.querySelector('#deck');
const direction = document.querySelector('#direction');
const promptText = document.querySelector('#prompt');
const answer = document.querySelector('#answer');
const flip = document.querySelector('#flip');
const next = document.querySelector('#next');
let index = 0;

function showCard() {
  const rows = document.getElementById(deck.value).querySelectorAll('tbody tr');
  const side = Number(direction.value);
  const cells = rows[index].cells;
  document.querySelector('#position').textContent = 'Card ' + (index + 1) + ' of ' + rows.length;
  promptText.textContent = cells[side].textContent;
  promptText.lang = side ? 'en' : 'it';
  answer.textContent = cells[1 - side].textContent;
  answer.lang = side ? 'it' : 'en';
  answer.hidden = true;
  flip.textContent = 'Show answer';
  next.textContent = index === rows.length - 1 ? 'Restart deck' : 'Next card';
}

deck.onchange = () => { index = 0; showCard(); };
direction.onchange = showCard;
flip.onclick = () => {
  answer.hidden = !answer.hidden;
  flip.textContent = answer.hidden ? 'Show answer' : 'Hide answer';
};
next.onclick = () => {
  const total = document.getElementById(deck.value).querySelectorAll('tbody tr').length;
  index = (index + 1) % total;
  showCard();
};
showCard();
