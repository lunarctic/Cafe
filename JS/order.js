const deliverBtn = document.getElementById("deliverBtn");
deliverBtn.addEventListener("click", deliver);
const order = document.getElementById("order");
let newOrder = "";

const messageTitle = document.querySelector("#messageContent h3");
const messageContent = document.querySelector("#messageContent p");

function getNewOrder() {
    newOrder = (recipes[Math.floor(Math.random() * recipes.length)].name) + ".png";
    console.log("new order: " + newOrder);
    order.src = "img/food/" + newOrder;
}

getNewOrder();

function deliver() {
    putOrderBtn.classList.remove("show");
    myModal.classList.remove("show");
    toggleModal(deliveryModal, false, false);
    const deliveredFood = getFilename(deliverySlot.src);
    if (deliveredFood === newOrder) {
        messageTitle.innerHTML = "You got it right!"
        messageContent.innerHTML = "Good job :) Your reward is 20XP. Keep going!"
        toggleModal(messageModal, true, false);
        score += 20; 
        console.log("score: " + score)
        updateScoreNLevel();
        updateProgressBar();

    } else {
        messageTitle.innerHTML = "You got it wrong!"
        messageContent.innerHTML = "Well that's a shame. You lost 20XP. Do better next time."
        toggleModal(messageModal, true, false);
        score -= 20;
        console.log("score: " + score)
        updateScoreNLevel();
        updateProgressBar();
    }
    deliverySlot.removeAttribute("src");
    getNewOrder();
}