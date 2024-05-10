const deliverBtn = document.getElementById("deliverBtn");
deliverBtn.addEventListener("click", deliver);
const order = document.getElementById("order");
let newOrder = "";

const messageTitle = document.querySelector("#messageContent h3");
const messageContent = document.querySelector("#messageContent p");

function getNewOrder(){
    newOrder = (recipes[Math.floor(Math.random() * recipes.length)].name) + ".png";
    console.log("new order: " + newOrder);
    order.src = "img/food/" + newOrder;
}

getNewOrder();

function deliver(){
    putOrderBtn.classList.remove("show");
    myModal.classList.remove("show");
    toggleModal(deliveryModal, false, false);
    const deliveredFood = getFilename(deliverySlot.src);
    if(deliveredFood === newOrder){
        messageTitle.innerHTML = "You got it right!"
        messageContent.innerHTML = "Good job :)"
        toggleModal(messageModal, true, false);
            score += 100; // Increase the score
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
        messageTitle.innerHTML = "You got it wrong!"
        messageContent.innerHTML = "Do better next time"
        toggleModal(messageModal, true, false);
    }
    deliverySlot.removeAttribute("src");
    getNewOrder();
}