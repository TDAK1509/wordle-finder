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

  const optionalMatchesString = e.target.elements.contains.value.toLowerCase();
  const optionalMatches = optionalMatchesString
    ? optionalMatchesString.split(",")
    : [];

  let hasResult = false;

  for (word of words) {
    if (searchTermRegex.test(word)) {
      const processedWord = testWordContaining(
        searchTerm,
        word,
        optionalMatches
      );
      if (!processedWord) continue;
      addAResult(processedWord);
      hasResult = true;
    }
  }

  if (!hasResult) setNoResult();
}

function clearOldResults() {
  resultsDiv.innerHTML = "";
}

function testWordContaining(searchTerm, word, contains) {
  let wordRemovingMainMatches = "";

  for (let i = 0; i < 5; i++) {
    const letter = searchTerm[i] !== "?" ? word[i].toUpperCase() : word[i];
    wordRemovingMainMatches += letter;
  }

  for (contain of contains) {
    if (!wordRemovingMainMatches.includes(contain)) return false;
    wordRemovingMainMatches = wordRemovingMainMatches.replaceAll(
      contain,
      contain.toUpperCase()
    );
  }

  return wordRemovingMainMatches;
}

function addAResult(word) {
  const p = document.createElement("p");

  for (i = 0; i < 5; i++) {
    let span;
    const letter = word[i];
    if (letter === letter.toUpperCase()) {
      span = createASpan(letter, true);
    } else {
      span = createASpan(letter);
    }

    p.append(span);
  }

  resultsDiv.append(p);
}

function createASpan(letter, isHighlight = false) {
  const span = document.createElement("span");
  if (isHighlight) span.classList.add("highlight");
  span.innerHTML = letter.toLowerCase();
  return span;
}

function setNoResult() {
  const p = document.createElement("p");
  p.innerHTML = "No word found.";
  resultsDiv.append(p);
}
