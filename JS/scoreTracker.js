let score = 0; // Current score. Max score is 100
let level = 1; // Current level
const currentScore = document.getElementById("currentScore");
currentScore.innerHTML = score;

function updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    const levelDisplay = document.getElementById("levelDisplay");
  
    // Set the width of the progress bar as a percentage
    progressBar.style.width = score + "%"; // Since score is between 0 and 100
  
    // Update the level display
    levelDisplay.innerHTML = "Level " + level;
  }

function startNextLevel() {
  console.log("Starting level", level);
  if(level == 2){
    // Adding a new recipe
    addRecipe("BerryPancakes", ["pancakes.png", "blueberries.png", "raspberry.png"]);
  }

  if(level == 3){
    addRecipe("LemonCheesecake", ["lemon.png", "cookies.png", "CreamCheese.png"]);
  }

  if(level == 4){
    addRecipe("LemonBlueberryPot", ["lemon.png", "blueberries.png", "cookies.png"]);
  }

  makeRecipeBook();

}

/*
  const recipes = [
    {
        name: "ChocolateCake",
        ingredients: ["strawberry.png", "CakeBase.png", "chocolate.png"].sort(), // Always sort ingredients for consistency
    },
    {
        name: "RaspberryCheesecakePot",
        ingredients: ["raspberry.png", "CreamCheese.png", "cookies.png"].sort(),
    },
    {
        name: "StrawberryDonut",
        ingredients: ["strawberry.png", "DonutBase.png", "Cream.png"].sort(),
    },
    {
        name: "LemonDonut",
        ingredients: ["lemon.png", "DonutBase.png", "Cream.png"].sort(),
    },
    
    {
        name: "ChocolatePancakes",
        ingredients: ["pancakes.png", "chocolate.png", "strawberry.png"].sort(),
    },
    {
        name: "CarrotCake",
        ingredients: ["Carrot.png", "Cream.png", "CakeBase.png"].sort(),
    },
    {
        name: "CookiesNCreamPot",
        ingredients: ["Cream.png", "cookies.png", "chocolate.png"].sort(),
    },
    {
        name: "ChocolateDonut",
        ingredients: ["chocolate.png", "DonutBase.png", "Cream.png"].sort(),
    },
    {
        name: "CookiesNCreamPancakes",
        ingredients: ["pancakes.png", "cookies.png", "Cream.png"].sort(),
    },
  
]; */

function addRecipe(name, ingredients) {
  const newRecipe = {
      name: name,
      ingredients: ingredients.sort(),
  };

  recipes.push(newRecipe);
}

