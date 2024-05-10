const bakeBtn = document.querySelector("#ovenModal button");
bakeBtn.addEventListener("click", bake);
let ovenIsOn = false;
const timer = document.getElementById("timer");


  
  //Function to check if a combination matches a recipe
  function findMatchingRecipe(ingredients) {
    const sortedIngredientsStr = ingredients.sort().join(",");
  
    for (const recipe of recipes) {
      const recipeStr = recipe.ingredients.sort().join(",");
      console.log("recipeStr: "+ recipeStr );
      console.log("sortedIngredientsStr: "+ sortedIngredientsStr );
      if (sortedIngredientsStr === recipeStr) {
        return recipe.name; // If strings match, return recipe name
      }
    }
  
    return null; // Return null if no match is found
  }
  

function bake(){
    ovenIsOn = true;
    ovenBtn.classList.remove("show");
    myModal.classList.remove("show");
    timer.classList.add("show");

    const ingredients = [
        getFilename(ovenSlot1.src),
        getFilename(ovenSlot2.src),
        getFilename(ovenSlot3.src),
      ];

      console.log("ingredients baking: ", ingredients);

    const matchedRecipe = findMatchingRecipe(ingredients);
    if (matchedRecipe) {
        console.log("Recipe matched: " + matchedRecipe);
    } else {
        console.log("No matching recipe found.");
    }

    // Clear oven slots after baking
    ovenSlot1.removeAttribute("src");
    ovenSlot2.removeAttribute("src");
    ovenSlot3.removeAttribute("src");
    ovenSlot2.src = "img/food/" + matchedRecipe + ".png";
    
    // The initial countdown value in seconds
    let countdownValue = 20;

    // Function to update the timer
    function updateTimer() {
    if (countdownValue >= 0) {
        timer.innerHTML = countdownValue; // Update the div content
        countdownValue--; // Decrement the countdown
    } else {
        // Timer has reached zero, clear the interval and perform any desired action
        clearInterval(countdownInterval);
        timer.innerHTML = "Time's up!"; // Optional: Indicate the end of the countdown
        ovenIsOn = false;
    }
    }

    // Start the countdown, updating every second (1000 ms)
    const countdownInterval = setInterval(updateTimer, 1000);

    // Initial update (so the timer starts with 20 instead of waiting for the first interval)
    updateTimer();
}
