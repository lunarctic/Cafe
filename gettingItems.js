let foods = ["chocolate", "strawberry" , "chocolate", "strawberry" , "chocolate", "strawberry" , "chocolate", "strawberry" , "chocolate", "strawberry" , "chocolate", "strawberry" , ];

const fridgeContent = document.querySelector("#fridgeModal .modalContent");

const inventorySlot1 = document.getElementById("inventorySlot1");
const inventorySlot2 = document.getElementById("inventorySlot2");
const inventorySlot3 = document.getElementById("inventorySlot3");

const ovenSlot1 = document.getElementById("ovenSlot1");
const ovenSlot2 = document.getElementById("ovenSlot2");
const ovenSlot3 = document.getElementById("ovenSlot3");

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
        food.addEventListener("click", transferFoodToInventory);
}
}

createFridgeSlots()

function transferFoodToInventory(event) {
    const food= event.target;
    const foodSrc = getFilename(food.src);
    console.log("food: " + food);
    console.log("src: " + foodSrc);
    
    const inventorySlots = [inventorySlot1, inventorySlot2, inventorySlot3];
    
    for (let i = 0; i < inventorySlots.length; i++) {
        const inventorySlot = inventorySlots[i];
        
        // If the slot is empty, assign the food source and add an event listener
        if (!inventorySlot.src || inventorySlot.src === "") {
            console.log(`Condition activated for inventorySlot${i + 1}`);
            inventorySlot.src = "img/food/" + foodSrc;
            console.log(`inventorySlot${i + 1} src:`, inventorySlot.src);
            inventorySlot.addEventListener("click", transferFood);
            if(ovenModal.classList.contains("show") && !food.parentNode.classList.contains("inventorySlot")){
                //if the food is being transferred from the oven to the inventory
                food.removeAttribute("src");
            }
            // Exit the loop once a slot is filled
            break;
        }
    }
}


function getFilename(src) {
    // This extracts the filename from the src URL
    const parts = src.split("/");
    return parts.pop(); // Gets the last part (the filename)
}

function transferFood(event){
    const foodToTransfer= event.target;
    if (fridgeModal.classList.contains("show")) {
        //if the food is being transferred back to the fridge, just delete the food from the inventory
        foodToTransfer.removeAttribute("src");
    } else if (ovenModal.classList.contains("show") && foodToTransfer.parentNode.classList.contains("inventorySlot")) {
        //if the food is being transferred to the oven, copy the food into the oven before deleting it from the inventory
        putFoodInOven(foodToTransfer);
        foodToTransfer.removeAttribute("src");
    } 
    // If the fridge modal is not open, do nothing
    return;
}

function putFoodInOven(event){
    const food = event;
    const foodSrc = getFilename(food.src);
    console.log("src: " + foodSrc)
    const ovenSlots = [ovenSlot1, ovenSlot2, ovenSlot3];
    
    for (let i = 0; i < ovenSlots.length; i++) {
        const ovenSlot = ovenSlots[i];
        
        // If the slot is empty, assign the food source and add an event listener
        if (!ovenSlot.src || ovenSlot.src === "") {
            console.log(`Condition activated for ovenSlot${i + 1}`);
            ovenSlot.src = "img/food/" + foodSrc;
            console.log(`ovenSlot${i + 1} src:`, ovenSlot.src);
            ovenSlot.addEventListener("click", transferFoodToInventory);

            // Exit the loop once a slot is filled
            break;
        }
    }
}