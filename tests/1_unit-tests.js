const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", () => {
  suite("Translate to British English", function () {
    test("Translate 'Mangoes are my favorite fruit.'", function () {
      assert.equal(
        translator.us2Uk("Mangoes are my favorite fruit.")[1],
        "Mangoes are my favourite fruit."
      );
    });
    test("Translate 'I ate yogurt for breakfast.'", function () {
      assert.equal(
        translator.us2Uk("I ate yogurt for breakfast.")[1],
        "I ate yoghurt for breakfast."
      );
    });
    test("Translate 'We had a party at my friend's condo.'", function () {
      assert.equal(
        translator.us2Uk("We had a party at my friend's condo.")[1],
        "We had a party at my friend's flat."
      );
    });
    test("Translate'Can you toss this in the trashcan for me?'", function () {
      assert.equal(
        translator.us2Uk("Can you toss this in the trashcan for me?")[1],
        "Can you toss this in the bin for me?"
      );
    });
    test("Translate 'The parking lot was full.'", function () {
      assert.equal(
        translator.us2Uk("The parking lot was full.")[1],
        "The car park was full."
      );
    });
    test("Translate 'Like a high tech Rube Goldberg machine.'", function () {
      assert.equal(
        translator.us2Uk("Like a high tech Rube Goldberg machine.")[1],
        "Like a high tech Heath Robinson device."
      );
    });
    test("Translate 'To play hooky means to skip class or work.'", function () {
      assert.equal(
        translator.us2Uk("To play hooky means to skip class or work.")[1],
        "To bunk off means to skip class or work."
      );
    });
    test("Translate 'No Mr. Bond, I expect you to die.'", function () {
      assert.equal(
        translator.us2Uk("No Mr. Bond, I expect you to die.")[1],
        "No Mr Bond, I expect you to die."
      );
    });
    test("Translate 'Dr. Grosh will see you now.'", function () {
      assert.equal(
        translator.us2Uk("Dr. Grosh will see you now.")[1],
        "Dr Grosh will see you now."
      );
    });
    test("Translate 'Lunch is at 12:15 today.'", function () {
      assert.equal(
        translator.us2Uk("Lunch is at 12:15 today.")[1],
        "Lunch is at 12.15 today."
      );
    });
  });
  suite("Translate to American English", function () {
    test("Translate 'We watched the footie match for a while.'", function () {
      assert.equal(
        translator.uk2Us("We watched the footie match for a while.")[1],
        "We watched the soccer match for a while."
      );
    });
    test("Translate 'Paracetamol takes up to an hour to work.'", function () {
      assert.equal(
        translator.uk2Us("Paracetamol takes up to an hour to work.")[1],
        "Tylenol takes up to an hour to work."
      );
    });
    test("Translate 'First, caramelise the onions.'", function () {
      assert.equal(
        translator.uk2Us("First, caramelise the onions.")[1],
        "First, caramelize the onions."
      );
    });
    test("Translate 'I spent the bank holiday at the funfair.'", function () {
      assert.equal(
        translator.uk2Us("I spent the bank holiday at the funfair.")[1],
        "I spent the public holiday at the carnival."
      );
    });
    test("Translate 'I had a bicky then went to the chippy.'", function () {
      assert.equal(
        translator.uk2Us("I had a bicky then went to the chippy.")[1],
        "I had a cookie then went to the fish-and-chip shop."
      );
    });
    test("Translate 'I've just got bits and bobs in my bum bag.'", function () {
      assert.equal(
        translator.uk2Us("I've just got bits and bobs in my bum bag.")[1],
        "I've just got odds and ends in my fanny pack."
      );
    });
    test("Translate 'The car boot sale at Boxted Airfield was called off.'", function () {
      assert.equal(
        translator.uk2Us(
          "The car boot sale at Boxted Airfield was called off."
        )[1],
        "The swap meet at Boxted Airfield was called off."
      );
    });
    test("Translate 'Have you met Mrs Kalyani?'", function () {
      assert.equal(
        translator.uk2Us("Have you met Mrs Kalyani?")[1],
        "Have you met Mrs. Kalyani?"
      );
    });
    test("Translate 'Prof Joyner of King's College, London.'", function () {
      assert.equal(
        translator.uk2Us("Prof Joyner of King's College, London.")[1],
        "Prof. Joyner of King's College, London."
      );
    });
    test("Translate 'Tea time is usually around 4 or 4.30.'", function () {
      assert.equal(
        translator.uk2Us("Tea time is usually around 4 or 4.30.")[1],
        "Tea time is usually around 4 or 4:30."
      );
    });
  });
  suite("Highlight translation", function () {
    test("Highlight 'Mangoes are my favorite fruit.'", function () {
      assert.equal(
        translator.us2Uk("Mangoes are my favorite fruit.")[0],
        'Mangoes are my <span class="highlight">favourite</span> fruit.'
      );
    });
    test("Highlight 'I ate yogurt for breakfast.'", function () {
      assert.equal(
        translator.us2Uk("I ate yogurt for breakfast.")[0],
        'I ate <span class="highlight">yoghurt</span> for breakfast.'
      );
    });
    test("Highlight 'We watched the footie match for a while.'", function () {
      assert.equal(
        translator.uk2Us("We watched the footie match for a while.")[0],
        'We watched the <span class="highlight">soccer</span> match for a while.'
      );
    });
    test("Highlight 'Paracetamol takes up to an hour to work.'", function () {
      assert.equal(
        translator.uk2Us("Paracetamol takes up to an hour to work.")[0],
        '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      );
    });
  });
});
