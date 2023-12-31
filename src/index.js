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

  const mainMatchIndexes = [];
  for (let i = 0; i < 5; i++) {
    if (searchTerm[i] !== "?") mainMatchIndexes.push(i);
  }

  const searchTermLetters = searchTerm.split("");
  const searchTermRegexString = "^" + searchTerm.replaceAll("?", "[a-z]") + "$";
  const searchTermRegex = new RegExp(searchTermRegexString);

  const optionalMatchesString = e.target.elements.contains.value.toLowerCase();
  const optionalMatches = optionalMatchesString
    ? optionalMatchesString.split(",")
    : [];

  let hasResult = false;

  for (word of words) {
    if (searchTermRegex.test(word)) {
      if (!testWordContaining(mainMatchIndexes, word, optionalMatches))
        continue;
      addAResult(word, searchTermLetters);
      hasResult = true;
    }
  }

  if (!hasResult) setNoResult();
}

function clearOldResults() {
  resultsDiv.innerHTML = "";
}

function testWordContaining(mainMatchIndexes, word, contains) {
  let wordRemovingMainMatches = "";

  for (let i = 0; i < 5; i++) {
    if (!mainMatchIndexes.includes(i)) wordRemovingMainMatches += word[i];
  }

  for (contain of contains) {
    if (!wordRemovingMainMatches.includes(contain)) {
      return false;
    }
  }

  return true;
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

function setNoResult() {
  const p = document.createElement("p");
  p.innerHTML = "No word found.";
  resultsDiv.append(p);
}
