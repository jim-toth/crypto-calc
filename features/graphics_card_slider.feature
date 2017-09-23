Feature: Graphics Card Slider
  As a user of CryptoCalc
  I want to interact with a visual representation of the amount of GPUs selected
  So that I can calculate a hashrate for different mining setups

  Scenario: Initialization & default selection
    Given I am on the CryptoCalc page
    Then I should see 1 graphics card slider with 4 rigs containing 6 GPUs each
    And I should see 8 graphics cards pre-selected

  Scenario Outline: Changing slider value (hover)
    Given I am on the CryptoCalc page
    When I hover the mouse cursor over the <cards> card slot
    Then I should see the slider fill up to the <cards> card slot
    And I should see a tooltip with <cards> graphics cards selected

    Examples:
      | cards |  
      | 1     |  
      | 3     |  
      | 6     |  
      | 8     |  
      | 12    |  
      | 18    |  
      | 24    |  

  Scenario Outline: Changing slider value (click)
    Given I am on the CryptoCalc page
    When I click on the <cards> card slot
    Then I should see <cards> in the "# Graphics Cards" field

    Examples:
      | cards |  
      | 1     |  
      | 3     |  
      | 6     |  
      | 8     |  
      | 12    |  
      | 18    |  
      | 24    |  

  Scenario Outline: Slider updates when value in text field
    Given I am on the CryptoCalc page
    When I enter <cards> in the "# Graphics Cards" field
    Then I should see the slider fill up to the <slot> card slot

    Examples:
      | cards | slot |  
      | 0     | 0    |  
      | 1     | 1    |  
      | 3     | 3    |  
      | 6     | 6    |  
      | 8     | 8    |  
      | 12    | 12   |  
      | 18    | 18   |  
      | 24    | 24   |  
      | 48    | 24   |  
