let score = 0; // Current score. Max score is 100
let level = 1; // Current level
const savedScore = localStorage.getItem("savedScore");
const savedLevel = localStorage.getItem("savedLevel");

const currentScore = document.getElementById("currentScore");
currentScore.innerHTML = score;

if (savedScore) {
  score = Number(savedScore);
  updateScoreNLevel();
  updateProgressBar();
}

if (savedLevel) {
  level = Number(savedLevel);
  updateScoreNLevel();
  updateProgressBar();
}

function updateScoreNLevel() {
  localStorage.setItem("savedScore", score);
  currentScore.innerHTML = score;

  if (score >= 100) {
    level++;
    localStorage.setItem("savedLevel", level);
    score = 0; // Reset the score
    localStorage.setItem("savedScore", score);
    currentScore.innerHTML = score;
  }
  updateRecipeBook(); // Because there may be new recipes now
};

function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const levelDisplay = document.getElementById("levelDisplay");

  // Set the width of the progress bar as a percentage
  progressBar.style.width = score + "%"; // Since score is between 0 and 100
  levelDisplay.innerHTML = "Level " + level;
};

function updateRecipeBook() {
  console.log("current level: ", level);
  recipes.length = 0; //deleting current recipes before making a new recipe book to avoid repetition
  //first the beginner recipes:
  addRecipe("ChocolateCake", ["strawberry.png", "CakeBase.png", "chocolate.png"]);
  addRecipe("RaspberryCheesecakePot", ["raspberry.png", "CreamCheese.png", "cookies.png"]);
  addRecipe("StrawberryDonut", ["strawberry.png", "DonutBase.png", "Cream.png"]);

  if (level >= 2) {
    // Adding a new recipe
    addRecipe("BerryPancakes", ["pancakes.png", "blueberries.png", "raspberry.png"]);
  }

  if (level >= 3) {
    addRecipe("LemonCheesecake", ["lemon.png", "cookies.png", "CreamCheese.png"]);
  }

  if (level >= 4) {
    addRecipe("LemonBlueberryPot", ["lemon.png", "blueberries.png", "cookies.png"]);
  }

  if (level >= 5) {
    addRecipe("LemonDonut", ["lemon.png", "DonutBase.png", "Cream.png"]);
  }

  if (level >= 6) {
    addRecipe("ChocolatePancakes", ["pancakes.png", "chocolate.png", "strawberry.png"]);
  }

  if (level >= 7) {
    addRecipe("CarrotCake", ["Carrot.png", "Cream.png", "CakeBase.png"]);
  }

  if (level >= 8) {
    addRecipe("CookiesNCreamPot", ["Cream.png", "cookies.png", "chocolate.png"]);
  }

  if (level >= 9) {
    addRecipe("ChocolateDonut", ["chocolate.png", "DonutBase.png", "Cream.png"]);
  }

  if (level >= 10) {
    addRecipe("CookiesNCreamPancakes", ["pancakes.png", "cookies.png", "Cream.png"]);
  }

  makeRecipeBook();
};

function addRecipe(name, ingredients) {
  const newRecipe = {
    name: name,
    ingredients: ingredients.sort(),
  };

  recipes.push(newRecipe);
};

