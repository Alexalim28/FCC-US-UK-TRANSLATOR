const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  us2Uk(text) {
    let newText = text;

    for (let word in americanOnly) {
      let translatedWord;
      const regex = new RegExp(`(?<=^|\\s)${word}(?=\\.|\\s)`, "i");
      const searchedWord = text.match(regex) && text.match(regex)[0];
      if (
        searchedWord &&
        searchedWord.charAt(0) === searchedWord.charAt(0).toUpperCase()
      ) {
        translatedWord =
          americanOnly[word].charAt(0).toUpperCase() +
          americanOnly[word].slice(1);
      } else {
        translatedWord = americanOnly[word];
      }
      newText = newText.replace(
        searchedWord,
        `<span class="highlight">${translatedWord}</span>`
      );
    }

    for (let title in americanToBritishTitles) {
      let translatedWord;
      const regex = new RegExp(`(?<=^|\\s)${title}(?=\\.|\\s)`, "i");
      const searchedWord = text.match(regex) && text.match(regex)[0];
      if (
        searchedWord &&
        searchedWord.charAt(0) === searchedWord.charAt(0).toUpperCase()
      ) {
        translatedWord =
          americanToBritishTitles[title].charAt(0).toUpperCase() +
          americanToBritishTitles[title].slice(1);
      } else {
        translatedWord = americanToBritishTitles[title];
      }
      newText = newText.replace(
        searchedWord,
        `<span class="highlight">${translatedWord}</span>`
      );
    }

    for (let spelling in americanToBritishSpelling) {
      let translatedWord;
      const regex = new RegExp(`(?<=^|\\s)${spelling}(?=\\.|\\s)`, "i");
      const searchedWord = text.match(regex) && text.match(regex)[0];
      if (
        searchedWord &&
        searchedWord.charAt(0) === searchedWord.charAt(0).toUpperCase()
      ) {
        translatedWord =
          americanToBritishSpelling[spelling].charAt(0).toUpperCase() +
          americanToBritishSpelling[spelling].slice(1);
      } else {
        translatedWord = americanToBritishSpelling[spelling];
      }
      newText = newText.replace(
        searchedWord,
        `<span class="highlight">${translatedWord}</span>`
      );
    }

    if (/[0-9]+:[0-9]+/.test(newText)) {
      let [, hour, min] = newText.match(/([0-9]+):([0-9]+)/);

      newText = newText.replace(
        /[0-9]+:[0-9]+/,
        `<span class="highlight">${hour}.${min}</span>`
      );
    }

    // text2LowerCase = text2LowerCase.split(" ");
    // let newText = text
    //   .split(" ")
    //   .map((word, i) => {
    //     if (word.toLowerCase() === text2LowerCase[i]) {
    //       return word;
    //     } else {
    //       if (/[A-Z]/.test(word[0])) {
    //         const firstLetter = text2LowerCase[i].charAt(0).toUpperCase();
    //         text2LowerCase[i] = firstLetter + text2LowerCase[i].slice(1);
    //         return `<span class="highlight">${text2LowerCase[i]}</span>`;
    //       }
    //       return;
    //     }
    //   })
    //   .join(" ");

    if (newText === text) {
      return false;
    }
    return newText;
  }

  uk2Us(text) {
    let newText = text;

    for (let word in britishOnly) {
      let translatedWord;
      const regex = new RegExp(`(?<=^|\\s)${word}(?=\\.|\\s)`, "i");
      const searchedWord = text.match(regex) && text.match(regex)[0];
      if (
        searchedWord &&
        searchedWord.charAt(0) === searchedWord.charAt(0).toUpperCase()
      ) {
        translatedWord =
          britishOnly[word].charAt(0).toUpperCase() +
          britishOnly[word].slice(1);
      } else {
        translatedWord = britishOnly[word];
      }
      newText = newText.replace(
        searchedWord,
        `<span class="highlight">${translatedWord}</span>`
      );
    }

    Object.entries(americanToBritishTitles).forEach((title) => {
      let translatedWord;
      const regex = new RegExp(`(?<=^|\\s)${title[1]}(?=\\.|\\s)`, "i");
      const searchedWord = text.match(regex) && text.match(regex)[0];
      if (
        searchedWord &&
        searchedWord.charAt(0) === searchedWord.charAt(0).toUpperCase()
      ) {
        translatedWord = title[0].charAt(0).toUpperCase() + title[0].slice(1);
      } else {
        translatedWord = title[0];
      }
      newText = newText.replace(
        searchedWord,
        `<span class="highlight">${translatedWord}</span>`
      );
    });

    Object.entries(americanToBritishSpelling).forEach((spelling) => {
      let translatedWord;
      const regex = new RegExp(`(?<=^|\\s)${spelling[1]}(?=\\.|\\s)`, "i");
      const searchedWord = text.match(regex) && text.match(regex)[0];
      if (
        searchedWord &&
        searchedWord.charAt(0) === searchedWord.charAt(0).toUpperCase()
      ) {
        translatedWord =
          spelling[0].charAt(0).toUpperCase() + spelling[0].slice(1);
      } else {
        translatedWord = spelling[0];
      }
      newText = newText.replace(
        searchedWord,
        `<span class="highlight">${translatedWord}</span>`
      );
    });

    if (/[0-9]+:[0-9]+/.test(newText)) {
      let [, hour, min] = newText.match(/([0-9]+):([0-9]+)/);

      newText = newText.replace(
        /[0-9]+:[0-9]+/,
        `<span class="highlight">${hour}.${min}</span>`
      );
    }

    // text2LowerCase = text2LowerCase.split(" ");
    // let newText = text
    //   .split(" ")
    //   .map((word, i) => {
    //     if (word.toLowerCase() === text2LowerCase[i]) {
    //       return word;
    //     } else {
    //       if (/[A-Z]/.test(word[0])) {
    //         const firstLetter = text2LowerCase[i].charAt(0).toUpperCase();
    //         text2LowerCase[i] = firstLetter + text2LowerCase[i].slice(1);
    //         return `<span class="highlight">${text2LowerCase[i]}</span>`;
    //       }
    //       return `<span class="highlight">${text2LowerCase[i]}</span>`;
    //     }
    //   })
    //   .join(" ");

    if (newText === text) {
      return false;
    }
    return newText;
  }
}

module.exports = Translator;
