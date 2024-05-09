let foods = ["chocolate", "strawberry" , "chocolate", "strawberry" , "chocolate", "strawberry" , "chocolate", "strawberry" , "chocolate", "strawberry" , "chocolate", "strawberry" , ];

const fridgeContent = document.querySelector("#fridgeModal .modalContent");

const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");

function createFridgeSlots(){
    for (let i = 1; i < 13; i++) {
        const fridgeSlot = document.createElement("div");
        const food = document.createElement("img");
        fridgeContent.appendChild(fridgeSlot);
        fridgeSlot.classList.add("fridgeSlot");
        fridgeSlot.appendChild(food);
        food.classList.add("food");
        food.src = "img/food/" + foods[i-1] + ".png";
        console.log("creating food/slot no" + i);
        food.addEventListener("click", getFoodFromFridge);
}
}

createFridgeSlots()

/*
function getFoodFromFridge(event) {
    const food = event.target;
    if (slot1.src == "") {
        slot1.src = food.src;
    } else if(slot1.src != "" && slot2.src == ""){
        slot2.src = food.src;
    }
}
*/


function getFoodFromFridge(event) {
    const food= event.target;
    const foodSrc = getFilename(food.src);
    console.log("food: " + food);
    console.log("src: " + foodSrc);
    
    const slots = [slot1, slot2, slot3];
    
    for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];
        
        // If the slot is empty, assign the food source and add an event listener
        if (!slot.src || slot.src === "") {
            console.log(`Condition activated for slot${i + 1}`);
            slot.src = "img/food/" + foodSrc;
            console.log(`slot${i + 1} src:`, slot.src);
            slot.addEventListener("click", putFoodBack);
    
            // Exit the loop once a slot is filled
            break;
        }
    }
}

/*
function getFoodFromFridge(event) {
    const food= event.target;
    const foodSrc = getFilename(food.src);
    console.log("food: " + food);
    console.log("src: " + foodSrc);
    
    
    if (!slot1.src || slot1.src === "") {
        console.log("first condition activated");
        slot1.src = "img/food/" + foodSrc;
        console.log("slot1 src:", slot1.src);
        slot1.addEventListener("click", putFoodBack);
    } else if (!slot2.src || slot2.src === "") {
        console.log("second condition activated");
        slot2.src = "img/food/" + foodSrc;
        slot2.addEventListener("click", putFoodBack);
    } else if (!slot3.src || slot3.src === "") {
        console.log("third condition activated");
        slot3.src = "img/food/" + foodSrc;
        slot3.addEventListener("click", putFoodBack);
    }
}
*/

function getFilename(src) {
    // This extracts the filename from the src URL
    const parts = src.split("/");
    return parts.pop(); // Gets the last part (the filename)
}

function putFoodBack(event){
    const foodToPutBack= event.target;
    foodToPutBack.src = "";
}