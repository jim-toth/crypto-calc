const {Builder, By, Key, until} = require('selenium-webdriver');
var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');
var assert = require('assert');

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the CryptoCalc page', function () {
    return this.driver.get('http://localhost:3000/');
  });

  /* Scenario: Initialization */
  Then('I should see {int} graphics card slider with {int} rigs containing {int} GPUs each', function (expectedSliders, expectedRigs, expectedCards) {
    this.driver.findElements(By.className('GraphicsCardSlider')).then(sliders => {
      assert.equal(sliders.length, expectedSliders);
      sliders[0].findElements(By.className('GraphicsCardSlider-rig')).then(rigs => {
        assert.equal(rigs.length, expectedRigs);
        for (var i=0; i < rigs.length; i++) {
          rigs[i].findElements(By.className('GraphicsCardSlider-card')).then(cards => {
            assert.equal(cards.length, expectedCards);
          });
        }
      });
    });
  });
  Then('I should see {int} graphics cards pre-selected', function (preselectedCards) {
    this.driver.findElements(By.css('div.GraphicsCardSlider-card.selected')).then(selectedCards => {
      assert.equal(selectedCards.length, preselectedCards);
    });
  });

  /* Scenario: Changing slider value (hover) */
  When('I hover the mouse cursor over the {int} card slot', function (cardSlot) {
    this.driver.findElements(By.className('GraphicsCardSlider-card')).then(cards => {
      return this.driver.actions().mouseMove(cards[cardSlot-1], {x:5,y:5}).perform();
    });
  });
  Then('I should see the slider fill up to the {int} card slot', function (cardSlot) {
    this.driver.findElements(By.css('div.GraphicsCardSlider-card.selected')).then(selectedCards => {
      assert.equal(selectedCards.length, cardSlot);
    });
  });
  Then('I should see a tooltip with {int} graphics cards selected', function (cardSlot) {
    this.driver.findElements(By.css('div.GraphicsCardSlider-tooltip.show')).then(visibleTooltips => {
      assert.equal(visibleTooltips.length, 1);
      visibleTooltips[0].isDisplayed().then(displayed => {
        assert.equal(displayed, true);
        return visibleTooltips[0].getText();
      }).then(tooltipText => {
        assert.equal(tooltipText, cardSlot.toString());
      });
    })
  });

  /* Scenario: Changing slider value (click) */
  When('I click on the {int} card slot', function (cardSlot) {
    this.driver.findElements(By.className('GraphicsCardSlider-card')).then(cards => {
      return cards[cardSlot-1].click();
    });
  });
  Then('I should see {int} in the {string} field', function (cards, labelText) {
    var labelSelector = "//*[contains(text(),'" + labelText + "')]";
    this.driver.findElements(By.xpath(labelSelector)).then(label => {
      assert.equal(label.length, 1);
      return label[0].getAttribute('for');
    }).then(inputFieldId => {
      if (inputFieldId) {
        return this.driver.findElements(By.id(inputFieldId));
      } else {
        assert.fail("No 'for' attribute found on label element.");
      }
    }).then(inputField => {
      assert.equal(inputField.length,1);
      return inputField[0].getAttribute('value');
    }).then(inputFieldValue => {
      assert.equal(parseInt(inputFieldValue),cards);
    });
  });

  /* Scenario: Slider updates when value in text field */
  When('I enter {int} in the {string} field', function (cards, labelText) {
    var labelSelector = "//*[contains(text(),'" + labelText + "')]";
    this.driver.findElements(By.xpath(labelSelector)).then(label => {
      assert.equal(label.length, 1);
      return label[0].getAttribute('for');
    }).then(inputFieldId => {
      if (inputFieldId) {
        return this.driver.findElements(By.id(inputFieldId));
      } else {
        assert.fail("No 'for' attribute found on label element.");
      }
    }).then(inputField => {
      inputField[0].clear().then(() => {
        return inputField[0].sendKeys(cards.toString());
      });
    });
  });
});