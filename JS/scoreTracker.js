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
}