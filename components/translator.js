const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  translate(text, translatedText, dict) {
    for (let word in dict) {
      let translatedWord;

      const regex = new RegExp(`(?<=^|\\s)${word}(?=\\.|\\s)`, "i");
      const searchedWord = text.match(regex) && text.match(regex)[0];
      if (
        searchedWord &&
        searchedWord.charAt(0) === searchedWord.charAt(0).toUpperCase()
      ) {
        translatedWord =
          dict[word].charAt(0).toUpperCase() + dict[word].slice(1);
      } else {
        translatedWord = dict[word];
      }
      text = text.replace(
        searchedWord,
        `<span class="highlight">${translatedWord}</span>`
      );
      translatedText = translatedText.replace(searchedWord, translatedWord);
    }
    return [text, translatedText];
  }

  reverseDict(obj) {
    let dict = {};
    Object.entries(obj).forEach((title) => {
      dict[title[1]] = title[0];
    });
    return dict;
  }

  us2Uk(text) {
    let notTranslatedText = text;

    let [newText, translatedText] = this.translate(
      text,
      notTranslatedText,
      americanOnly
    );

    [newText, translatedText] = this.translate(
      newText,
      translatedText,
      americanToBritishTitles
    );

    [newText, translatedText] = this.translate(
      newText,
      translatedText,
      americanToBritishSpelling
    );

    if (/[0-9]+:[0-9]+/.test(newText)) {
      let [, hour, min] = newText.match(/([0-9]+):([0-9]+)/);

      newText = newText.replace(
        /[0-9]+:[0-9]+/,
        `<span class="highlight">${hour}.${min}</span>`
      );

      translatedText = translatedText.replace(
        /[0-9]+:[0-9]+/,
        `${hour}.${min}`
      );
    }

    if (newText === text) {
      return false;
    }
    return [newText, translatedText];
  }

  uk2Us(text) {
    let notTranslatedText = text;

    let [newText, translatedText] = this.translate(
      text,
      notTranslatedText,
      britishOnly
    );

    const britishToAmericanTitles = this.reverseDict(americanToBritishTitles);
    [newText, translatedText] = this.translate(
      newText,
      translatedText,
      britishToAmericanTitles
    );

    const britishSpellingToAmerican = this.reverseDict(
      americanToBritishSpelling
    );
    [newText, translatedText] = this.translate(
      newText,
      translatedText,
      britishSpellingToAmerican
    );

    if (/[0-9]+\.[0-9]+/.test(newText)) {
      let [, hour, min] = newText.match(/([0-9]+)\.([0-9]+)/);

      newText = newText.replace(
        /[0-9]+\.[0-9]+/,
        `<span class="highlight">${hour}:${min}</span>`
      );

      translatedText = translatedText.replace(
        /[0-9]+\.[0-9]+/,
        `${hour}:${min}`
      );
    }
    if (newText === text) {
      return false;
    }
    return [newText, translatedText];
  }
}

module.exports = Translator;
