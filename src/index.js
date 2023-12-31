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
  const searchTerm = e.target.elements.searchTerm.value.toLowerCase();
  const searchTermRegexString = "^" + searchTerm.replaceAll("?", "[a-z]") + "$";
  const searchTermRegex = new RegExp(searchTermRegexString);

  const results = document.getElementById("results");

  for (word of words) {
    if (searchTermRegex.test(word)) {
      const p = document.createElement("p");
      p.innerHTML = word;
      results.append(p);
    }
  }
}
