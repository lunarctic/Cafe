const character = document.getElementById("character");
const character_spritesheet = document.getElementById("character_spritesheet");
//const plate = document.getElementById("plate");
const feet = document.getElementById("feet");

const furnitures = document.querySelectorAll("#furniture img"); // Furniture element
const walls = document.querySelectorAll("#wall img");
const counter = document.getElementById("counter");
const kitchenFloor = document.getElementById("kitchen_floor");

const kitchen = document.getElementById("kitchen");
const kitchenSet = document.getElementById("kitchenSet");
const fridge = document.getElementById("fridge");
const fridgeContainer = document.getElementById("fridgeContainer");
const oven = document.getElementById("oven");
const ovenContainer = document.getElementById("ovenContainer");

const counterRight = document.getElementById("counterRight");
const counterLeft = document.getElementById("counterLeft");
const counterCenter = document.getElementById("counterCenter");

const scaleSize = 4; //for feet, because maybe i'll want to give the character a different size
const pixelSize = 4; // Scaling factor

function scaleFurniture() {
    // Scale the furniture sizes
    for (const furniture of furnitures) {
        let originalWidth = furniture.clientWidth;
        // console.log("original width = " + originalWidth);
        if (furniture.id == "fridge") {
            originalWidth = originalWidth * 1.4; //the fridge was small compared to other furniture so i fixed it here
        }
        // console.log("new width = " + (originalWidth * pixelSize));
        furniture.style.width = originalWidth * pixelSize + "px";
    }

    fridgeContainer.style.width = fridge.width + (13 * pixelSize * 1.4) + "px";
    fridgeContainer.style.height = fridge.height + "px";
    ovenContainer.style.width = oven.width + "px";
    ovenContainer.style.height = oven.height + "px";

    //have to do the counter seperately because it doesn't have the furniture ID
    counterRight.style.width = counterRight.clientWidth * pixelSize + "px";
    counterLeft.style.width = counterLeft.clientWidth * pixelSize + "px";
    counterCenter.style.width = counterCenter.clientWidth * pixelSize + "px";
    counter.style.width = counterRight.clientWidth + counterLeft.clientWidth + counterCenter.clientWidth + "px";
    counter.style.height = counterRight.clientHeight + "px";

    //styling the tiled floor
    kitchenFloor.style.width = 166 * pixelSize + "px";
    kitchenFloor.style.height = 54 * pixelSize + "px";
    kitchenFloor.style.backgroundSize = (25 * pixelSize) + "px" + " " + (25 * pixelSize) + "px";
}

function putWalls() {
    // Size the walls and put them up side by side
    let leftPosition = 0;
    for (const wall of walls) {
        let originalWidth = wall.clientWidth;
        let newWidth = originalWidth * pixelSize;
        wall.style.width = newWidth + "px";
        wall.style.left = leftPosition + "px";
        //console.log("current width = " + newWidth);
        leftPosition += newWidth;
        //console.log("left pos = " + leftPosition);
    }
}

// Positioning
function positioningFurniture() {
    ovenContainer.style.left = 0 + "px"; //can do this in CSS?
    kitchenSet.style.left = ovenContainer.clientWidth + "px";
    // console.log("kitchenset left: " + kitchenSet.style.left);
    fridgeContainer.style.left = ovenContainer.clientWidth + kitchenSet.clientWidth + "px";
    kitchen.style.top = 9 * pixelSize + "px";
    kitchenFloor.style.top = 48 * pixelSize + "px";
    // console.log("kitchen top: " + kitchen.style.top);
    fridgeContainer.style.top = 6 * pixelSize + "px";
    kitchen.style.width = ovenContainer.clientWidth + kitchenSet.clientWidth + fridgeContainer.clientWidth + "px"; // to be able to center the kitchen

    counter.style.top = 33 * pixelSize + "px";
    counterLeft.style.left = 0;
    counterRight.style.right = 0;
    counterCenter.style.top = (33 * pixelSize) + (56 * pixelSize) + "px";
    

}

scaleFurniture();
putWalls();
positioningFurniture();

const kitchenFloorWidth = kitchenFloor.clientWidth; //need to get it AFTER the scaling function is run (? or not?)

let x = 600; // Initial character X position
let y = 150; // Initial character Y position
let speed = 2 * pixelSize; // Character movement speed
character.style.left = x + "px";
character.style.top = y + "px";

function checkCollision(newFeetX, newFeetY) {
    const feetRect = { //maybe the problem is here, bc these are CSS styles and the furniture is sth else. EDIT: CSS positioning and ClientRect is the same (values)
        top: newFeetY, 
        left: newFeetX,
        right: newFeetX + feet.clientWidth,
        bottom: newFeetY + feet.clientHeight,
    };
    feetJS.style.width = feet.clientWidth + "px";
    feetJS.style.height = feet.clientHeight + "px";
    //console.log("kitchenFloorRect ", kitchenFloorRect)
    console.log("feetRect ", feetRect)

    for (const furniture of furnitures) {
        const furnitureRect = {
            name: furniture.id,
            top: furniture.getBoundingClientRect().top,
            left: furniture.getBoundingClientRect().left,
            right: furniture.getBoundingClientRect().right,
            bottom: furniture.getBoundingClientRect().bottom,
        };
        console.log("furnitureRect ", furnitureRect)
        if (
           feetRect.right > furnitureRect.left &&
            feetRect.left < furnitureRect.right &&
            feetRect.bottom > furnitureRect.top &&
            feetRect.top < furnitureRect.bottom 
        ) {
            console.log("collision furnitureRect ", furnitureRect);
            console.log("collision feetRect " , feetRect);
            console.log("furniture collision");
            console.log("furniture " + furniture.clientWidth); //sth is up with the wall
            newFeetJS.style.width = feet.clientWidth + "px";
            newFeetJS.style.height = feet.clientHeight + "px";
            newFeetJS.style.left = newFeetX + "px";
            newFeetJS.style.top = newFeetY + "px";
            return true; // Collision detected
        }
        console.log("furnitureRect ", furnitureRect);
        console.log("feetRect " , feetRect);
    }

    //getting the kitchen floor's position (to check collisions)
    const kitchenFloorRect = {
        top: kitchenFloor.getBoundingClientRect().top,
        left: kitchenFloor.getBoundingClientRect().left,
        right: kitchenFloor.getBoundingClientRect().right,
        bottom: kitchenFloor.getBoundingClientRect().bottom,
        } 

    if(feetRect.right > kitchenFloorRect.right || feetRect.left < kitchenFloorRect.left || feetRect.top < kitchenFloorRect.top || feetRect.bottom > kitchenFloorRect.bottom){
        console.log("floor collision");
        console.log("collision floorRect ", kitchenFloorRect);
        console.log("collision feetRect " , feetRect);
        newFeetJS.style.width = feet.clientWidth + "px";
            newFeetJS.style.height = feet.clientHeight + "px";
            newFeetJS.style.left = newFeetX + "px";
            newFeetJS.style.top = newFeetY + "px";
        return true; // Collision detected
    }
    return false; // No collision
}

const feetJS = document.getElementById("feetJS");
const newFeetJS = document.getElementById("newFeetJS");

document.addEventListener("keydown", function (event) {
    console.log(event);
    //tried moving these definitions but it caused problems:
    let newX = x; // New potential X position. CSS left
    let newY = y; // New potential Y position. CSS top
    let newFeetX = newX + (5 * scaleSize);
    let newFeetY = newY + (30 * scaleSize); //note: here its in CSS positioning

    //left
    if (event.key == "a") {
        newX -= speed;
        character_spritesheet.classList.add("face-left", "animate_spritesheet")
        //plate.classList.add("animate_plate")
        newFeetX -= speed;
    }
    //up
    else if (event.key == "w") {
        newY -= speed;
        character_spritesheet.classList.add("face-back", "animate_spritesheet")
        newFeetY -= speed;
    }
    //right
    else if (event.key == "d") {
        newX += speed;
        character_spritesheet.classList.add("face-right", "animate_spritesheet")
        newFeetX += speed; 
    }
    //down
    else if (event.key == "s") {
        newY += speed;
        character_spritesheet.classList.add("animate_spritesheet")
        newFeetY += speed;
    }

    console.log("newX: " + newX);
    console.log("newY: " + newY);
    console.log("newFeetX: " + newFeetX);
    console.log("newFeetY: " + newFeetY);

    if (!checkCollision(newFeetX, newFeetY)) {
        x = newX;
        y = newY;
        character.style.left = x + "px";
        character.style.top = y + "px";
        feetJS.style.left = newFeetX + "px";
        feetJS.style.top = newFeetY + "px";
        checkButtons()
    }

})

document.addEventListener('keyup', function (event) {
    console.log(event)
    //left
    if (event.key == "a") {
        character_spritesheet.classList.remove("face-left", "animate_spritesheet")
        plate.classList.remove("animate_plate")
    }
    //up
    else if (event.key == "w") {
        character_spritesheet.classList.remove("face-back", "animate_spritesheet")
    }
    //right
    else if (event.key == "d") {
        character_spritesheet.classList.remove("face-right", "animate_spritesheet")
    }
    //down
    else if (event.key == "s") {
        character_spritesheet.classList.remove("animate_spritesheet")
    }

})

// henter modal
const fridgeModal = document.getElementById("fridgeModal");
// henter button som åpner modal
const fridgeBtn = document.getElementById("fridgeBtn");
// henter <span> elementet som lukker modal (close button)
const closeBtn = document.getElementById("close");

const ovenModal = document.getElementById("ovenModal");
const ovenBtn = document.getElementById("ovenBtn");

//checking the character's distance to the fridge. if the character is standing in front of the fridge, the "open fridge" button will show
function checkButtons(){
    const fridgeRect = {
        top: fridge.getBoundingClientRect().top,
        left: fridge.getBoundingClientRect().left,
        right: fridge.getBoundingClientRect().right,
        bottom: fridge.getBoundingClientRect().bottom,
    };

    const feetRect = { 
        top: feet.getBoundingClientRect().top,
        left: feet.getBoundingClientRect().left,
        right: feet.getBoundingClientRect().right,
        bottom: feet.getBoundingClientRect().bottom,
    };

    const ovenRect = { 
        top: oven.getBoundingClientRect().top,
        left: oven.getBoundingClientRect().left,
        right: oven.getBoundingClientRect().right,
        bottom: oven.getBoundingClientRect().bottom,
    };

    if(feetRect.top <= fridgeRect.bottom + 40 && feetRect.left >= fridgeRect.left - 25 && feetRect.right <= fridgeRect.right + 25 ){
        fridgeBtn.classList.add("show");
       } else if(feetRect.top <= ovenRect.bottom + 40 && feetRect.left >= ovenRect.left - 25 && feetRect.right <= ovenRect.right + 90 ){
        ovenBtn.classList.add("show");
       } else{
        fridgeBtn.classList.remove("show");
        ovenBtn.classList.remove("show");
       }

}

function toggleModal(modal, opened) {
    if (opened) {
        modal.classList.add("show");
    } else {
        modal.classList.remove("show");
    }
}

fridgeBtn.onclick = () => {
    fridge.src = "img/furniture/openfridge.png";
    fridge.style.width = fridge.clientWidth + (13 * pixelSize * 1.4) + "px";
    toggleModal(fridgeModal, true);
};

ovenBtn.onclick = () => {
    toggleModal(ovenModal, true);
};

const closeBtns = document.querySelectorAll(".close");
for(const closeBtn of closeBtns){
    closeBtn.onclick = () => {
        const modal = closeBtn.closest(".modal");
        if(closeBtn.closest(".modal").id === "fridgeModal"){
            fridge.src = "img/furniture/fridge181.png";
            fridge.style.width = fridge.clientWidth - (13 * pixelSize * 1.4) + "px";
        }
        toggleModal(modal, false);
    }
}

window.onclick = (event) => {
    if (event.target.classList.contains("modal")) {
        toggleModal(event.target, false);
    }
};

