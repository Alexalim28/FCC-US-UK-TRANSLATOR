const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  us2Uk(text) {
    let text2LowerCase = text.toLowerCase();

    for (let word in americanOnly) {
      const regex = new RegExp(`(?<=^|\\s)${word}(?=\\.|\\s)`);
      const searchedWord =
        text2LowerCase.match(regex) && text2LowerCase.match(regex)[0];
      text2LowerCase = text2LowerCase.replace(searchedWord, americanOnly[word]);
    }

    for (let title in americanToBritishTitles) {
      text2LowerCase = text2LowerCase.replace(
        title,
        americanToBritishTitles[title]
      );
    }

    for (let spelling in americanToBritishSpelling) {
      text2LowerCase = text2LowerCase.replace(
        spelling,
        americanToBritishSpelling[spelling]
      );
    }

    text2LowerCase = text2LowerCase.split(" ");
    let newText = text
      .split(" ")
      .map((word, i) => {
        if (word.toLowerCase() === text2LowerCase[i]) {
          return word;
        } else {
          if (/[A-Z]/.test(word[0])) {
            const firstLetter = text2LowerCase[i].charAt(0).toUpperCase();
            text2LowerCase[i] = firstLetter + text2LowerCase[i].slice(1);
            return `<span class="highlight">${text2LowerCase[i]}</span>`;
          }
          return `<span class="highlight">${text2LowerCase[i]}</span>`;
        }
      })
      .join(" ");

    if (/[0-9]+:[0-9]+/.test(newText)) {
      let [, hour, min] = newText.match(/([0-9]+):([0-9]+)/);

      newText = newText.replace(
        /[0-9]+:[0-9]+/,
        `<span class="highlight">${hour}.${min}</span>`
      );
    }
    if (newText === text) {
      return false;
    }
    return newText;
  }

  uk2Us(text) {
    let text2LowerCase = text.toLowerCase();

    for (let word in britishOnly) {
      const regex = new RegExp(`(?<=^|\\s)${word}(?=\\.|\\s)`);
      const searchedWord =
        text2LowerCase.match(regex) && text2LowerCase.match(regex)[0];
      text2LowerCase = text2LowerCase.replace(searchedWord, britishOnly[word]);
    }
    console.log(text2LowerCase);

    Object.entries(americanToBritishTitles).forEach((title) => {
      const regex = new RegExp(`\\b${title[1]}\\b`);
      text2LowerCase = text2LowerCase.replace(regex, title[0]);
    });

    Object.entries(americanToBritishSpelling).forEach((spelling) => {
      const regex = new RegExp(`\\b${spelling[1]}\\b`);
      text2LowerCase = text2LowerCase.replace(spelling[1], spelling[0]);
    });

    text2LowerCase = text2LowerCase.split(" ");
    let newText = text
      .split(" ")
      .map((word, i) => {
        if (word.toLowerCase() === text2LowerCase[i]) {
          return word;
        } else {
          if (/[A-Z]/.test(word[0])) {
            const firstLetter = text2LowerCase[i].charAt(0).toUpperCase();
            text2LowerCase[i] = firstLetter + text2LowerCase[i].slice(1);
            return `<span class="highlight">${text2LowerCase[i]}</span>`;
          }
          return `<span class="highlight">${text2LowerCase[i]}</span>`;
        }
      })
      .join(" ");

    if (/[0-9]+:[0-9]+/.test(newText)) {
      let [, hour, min] = newText.match(/([0-9]+):([0-9]+)/);

      newText = newText.replace(
        /[0-9]+:[0-9]+/,
        `<span class="highlight">${hour}.${min}</span>`
      );
    }
    if (newText === text) {
      return false;
    }
    return newText;
  }
}

module.exports = Translator;
