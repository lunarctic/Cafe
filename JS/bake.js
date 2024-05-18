const bakeBtn = document.querySelector("#ovenModal button");
bakeBtn.addEventListener("click", bake);
let ovenIsOn = false;
const timer = document.getElementById("timer");
const timerSound = document.getElementById("timerSound");
const dingSound = document.getElementById("ding");

//Function to check if a combination matches a recipe
function findMatchingRecipe(ingredients) {
  const sortedIngredientsStr = ingredients.sort().join(",");

  for (const recipe of recipes) {
    const recipeStr = recipe.ingredients.sort().join(",");
    console.log("recipeStr: " + recipeStr);
    console.log("sortedIngredientsStr: " + sortedIngredientsStr);
    if (sortedIngredientsStr === recipeStr) {
      return recipe.name;
    }
  };
  return null;
};

function bake() {
  ovenIsOn = true;
  ovenBtn.classList.remove("show");
  toggleModal(ovenModal, false, false);
  timer.classList.add("show");

  const ingredients = [
    getFilename(ovenSlot1.src),
    getFilename(ovenSlot2.src),
    getFilename(ovenSlot3.src),
  ];
  console.log("ingredients baking: ", ingredients);

  const matchedRecipe = findMatchingRecipe(ingredients);

  // Clear oven slots after baking
  ovenSlot1.removeAttribute("src");
  ovenSlot2.removeAttribute("src");
  ovenSlot3.removeAttribute("src");

  if (matchedRecipe) {
    console.log("Recipe matched: " + matchedRecipe);
    ovenSlot2.src = "img/food/" + matchedRecipe + ".png";
  } else {
    console.log("No matching recipe found.");
  };

  // The initial countdown value in seconds
  let countdownValue = 10;
  timerSound.play();
  // Function to update the timer
  function updateTimer() {
    if (countdownValue >= 0) {
      timer.innerHTML = countdownValue;
      countdownValue--;
    } else {
      // Timer has reached zero, clear the interval
      clearInterval(countdownInterval);
      timerSound.pause();
      dingSound.play();
      timer.innerHTML = "✓";
      ovenIsOn = false;
    }
  };

  // Start the countdown, updating every second (1000 ms)
  const countdownInterval = setInterval(updateTimer, 1000);

  // Initial update (so the timer starts with 10 instead of waiting for the first interval)
  updateTimer();
};
