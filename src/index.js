let words = [];
const resultsDiv = document.getElementById("results");

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
  clearOldResults();

  const searchTerm = e.target.elements.searchTerm.value.toLowerCase();
  const searchTermRegexString = "^" + searchTerm.replaceAll("?", "[a-z]") + "$";
  const searchTermRegex = new RegExp(searchTermRegexString);

  for (word of words) {
    if (searchTermRegex.test(word)) {
      const p = document.createElement("p");
      p.innerHTML = word;
      resultsDiv.append(p);
    }
  }
}

function clearOldResults() {
  resultsDiv.innerHTML = "";
}
