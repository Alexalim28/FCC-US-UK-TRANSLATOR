const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  us2Uk(text) {
    let text2LowerCase = text.toLowerCase();

    for (let word in americanOnly) {
      text2LowerCase = text2LowerCase.replace(word, americanOnly[word]);
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
    text = text
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

    if (/[0-9]+:[0-9]+/.test(text)) {
      let [, hour, min] = text.match(/([0-9]+):([0-9]+)/);

      text = text.replace(
        /[0-9]+:[0-9]+/,
        `<span class="highlight">${hour}.${min}</span>`
      );
      console.log(hour, min);
    }
    return text;
  }

  uk2Us(text) {
    if (text in americanToBritishTitles) {
      return `<span class="highlight">${americanToBritishTitles[text]}</span>`;
    }

    if (/[0-9]+.[0-9]+/.test(text)) {
      return `<span class="highlight">${text.replace(".", ":")}</span>`;
    }
  }
}

module.exports = Translator;
