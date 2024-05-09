const character = document.getElementById("character");
const character_spritesheet = document.getElementById("character_spritesheet");
//const plate = document.getElementById("plate");

const furnitures = document.querySelectorAll("#furniture img"); // Furniture element
const walls = document.querySelectorAll("#wall img");
const counter = document.getElementById("counter");
const kitchenFloor = document.getElementById("kitchen_floor");

const kitchen = document.getElementById("kitchen");
const kitchenSet = document.getElementById("kitchenSet");
const fridge = document.getElementById("fridge");
const stove = document.getElementById("stove");

const scaleSize = 4; //for feet
const pixelSize = 4; // Scaling factor

function scaleFurniture() {
    // Scale the furniture sizes
    for (const furniture of furnitures) {
        let originalWidth = furniture.clientWidth;
        console.log("original width = " + originalWidth);
        if (furniture.id == "fridge") {
            originalWidth = originalWidth * 1.4; //the fridge was small compared to other furniture so i fixed it here
        }
        console.log("new width = " + (originalWidth * pixelSize));
        furniture.style.width = originalWidth * pixelSize + "px";
    }
    //have to do the counter seperately because it doesn't have the furniture ID
    counter.style.width = counter.clientWidth * pixelSize + "px";
    //styling the tiled floor
    kitchenFloor.style.width = 166 * pixelSize + "px";
    kitchenFloor.style.height = 65 * pixelSize + "px";
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
    stove.style.left = 0 + "px"; //can do this in CSS?
    kitchenSet.style.left = stove.clientWidth + "px";
    console.log("kitchenset left: " + kitchenSet.style.left);
    fridge.style.left = stove.clientWidth + kitchenSet.clientWidth + "px";
    kitchen.style.top = 12 * pixelSize + "px";
    console.log("kitchen top: " + kitchen.style.top);
    fridge.style.top = 6 * pixelSize + "px";
    kitchen.style.width = stove.clientWidth + kitchenSet.clientWidth + fridge.clientWidth + "px"; // to be able to center the kitchen
}

scaleFurniture();
putWalls();
positioningFurniture();

const feet = document.getElementById("feet");
const kitchenFloorWidth = kitchenFloor.clientWidth;

//getting the kitchen floor's position
/* const kitchenFloorRect = {
    top: kitchenFloor.getBoundingClientRect().top,
    left: kitchenFloor.getBoundingClientRect().left,
    right: kitchenFloor.getBoundingClientRect().right,
    bottom: kitchenFloor.getBoundingClientRect().bottom,
} */

//checks
console.log("kitchenFloorWidth = " + kitchenFloorWidth);
//console.log("kitchenFloor right = " + kitchenFloorRect.right);
//console.log("kitchenFloorWidth + kitchenFloorRect.left = " , (kitchenFloorWidth + kitchenFloorRect.left));
//console.log("kitchenFloorRect = ", kitchenFloorRect);

let x = 600; // Initial character X position
let y = 150; // Initial character Y position
let speed = 8; // Character movement speed
character.style.left = x + "px";
character.style.top = y + "px";

function checkCollision(newFeetX, newFeetY) {
    const feetRect = { //maybe the problem is here, bc these are CSS styles and the furniture is sth else. EDIT: CSS positioning and ClientRect is the same (values)
        top: newFeetY, 
        left: newFeetX,
        right: newFeetX + feet.clientWidth,
        bottom: newFeetY + feet.clientHeight,
    };
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
            return true; // Collision detected
        }
        console.log("furnitureRect ", furnitureRect);
        console.log("feetRect " , feetRect);
    }
    return false; // No collision
}


document.addEventListener("keydown", function (event) {
    console.log(event);
    //tried moving these definitions but it caused problems:
    let newX = x; // New potential X position. CSS left
    let newY = y; // New potential Y position. CSS top
    let newFeetX = newX + (5 * scaleSize);
    let newFeetY = newY + (30 * scaleSize); //note: here its in CSS positioning
    //left
    if (event.code == "ArrowLeft") {
        newX -= speed;
        character_spritesheet.classList.add("face-left", "animate_spritesheet")
        //plate.classList.add("animate_plate")
        newFeetX -= speed;
    }
    //up
    else if (event.code == "ArrowUp") {
        newY -= speed;
        character_spritesheet.classList.add("face-back", "animate_spritesheet")
        newFeetY -= speed;
    }
    //right
    else if (event.code == "ArrowRight") {
        newX += speed;
        character_spritesheet.classList.add("face-right", "animate_spritesheet")
        newFeetX += speed; 
    }
    //down
    else if (event.code == "ArrowDown") {
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
    }

})

document.addEventListener('keyup', function (event) {
    console.log(event)
    //left
    if (event.code == "ArrowLeft") {
        character_spritesheet.classList.remove("face-left", "animate_spritesheet")
        plate.classList.remove("animate_plate")
    }
    //up
    else if (event.code == "ArrowUp") {
        character_spritesheet.classList.remove("face-back", "animate_spritesheet")
    }
    //right
    else if (event.code == "ArrowRight") {
        character_spritesheet.classList.remove("face-right", "animate_spritesheet")
    }
    //down
    else if (event.code == "ArrowDown") {
        character_spritesheet.classList.remove("animate_spritesheet")
    }

})

