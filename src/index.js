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
  const searchTermLetters = searchTerm.split("");
  const searchTermRegexString = "^" + searchTerm.replaceAll("?", "[a-z]") + "$";
  const searchTermRegex = new RegExp(searchTermRegexString);

  let hasResult = false;

  for (word of words) {
    if (searchTermRegex.test(word)) {
      addAResult(word, searchTermLetters);
      hasResult = true;
    }
  }

  if (!hasResult) {
    const p = document.createElement("p");
    p.innerHTML = "No word found.";
    resultsDiv.append(p);
  }
}

function clearOldResults() {
  resultsDiv.innerHTML = "";
}

function addAResult(word, searchTermLetters) {
  const p = document.createElement("p");
  searchTermLetters.forEach((searchLetter, letterIndex) => {
    const wordLetter = word[letterIndex];
    let span;

    if (searchLetter === "?") {
      span = createASpan(wordLetter);
    } else {
      span = createASpan(wordLetter, true);
    }

    p.append(span);
  });
  resultsDiv.append(p);
}

function createASpan(letter, isHighlight = false) {
  const span = document.createElement("span");
  if (isHighlight) span.classList.add("highlight");
  span.innerHTML = letter;
  return span;
}
