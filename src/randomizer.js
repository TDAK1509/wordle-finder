let words = [];
const resultDiv = document.getElementById("result");

document.addEventListener("DOMContentLoaded", event => {
  fetch("words.txt")
    .then(res => res.text())
    .then(text => {
      words = text.split("\n");
    })
    .catch(e => console.error(e));
});

function randomAWord() {
  resultDiv.innerHTML = "random";
}
