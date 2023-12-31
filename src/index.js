let words = [];

document.addEventListener("DOMContentLoaded", event => {
  fetch("words.txt")
    .then(res => res.text())
    .then(text => {
      words = text.split("\n");
    })
    .catch(e => console.error(e));
});

function findWords(e) {
  e.preventDefault();
  const searchTerm = e.target.elements.searchTerm.value;
  if (words.includes(searchTerm)) console.log(true);
  else console.log(false);
}
