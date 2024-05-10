const deliverBtn = document.getElementById("deliverBtn");
deliverBtn.addEventListener("click", deliver);
const order = document.getElementById("order");
let newOrder = "";

function getNewOrder(){
    newOrder = (recipes[Math.floor(Math.random() * recipes.length)].name) + ".png";
    console.log("new order: " + newOrder);
    order.src = "img/food/" + newOrder;
}

getNewOrder();

function deliver(){
    putOrderBtn.classList.remove("show");
    myModal.classList.remove("show");
    const deliveredFood = getFilename(deliverySlot.src);
    if(deliveredFood === newOrder){
        window.alert("You got it right!")
            score += 80; // Increase the score
            // If the score reaches 100, start the next level
            currentScore.innerHTML = score;

            if (score >= 100) {
              level++; // Increase the level
              score = 0; // Reset the score
              currentScore.innerHTML = score;
              startNextLevel(); // Function to handle the start of a new level
            }
            updateProgressBar(); // Function to update the visual progress bar
          
    } else{
        window.alert("You got it wrong!")
    }
    deliverySlot.removeAttribute("src");
    getNewOrder();
}