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

window.onload = function () {
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
    counter.style.width = counter.clientWidth * pixelSize + "px"; //have to do the counter seperately because it doesn't have the furniture ID

    // Size the walls and put them up side by side
    let leftPosition = 0;
    for (const wall of walls) {
        let originalWidth = wall.clientWidth;
        let newWidth = originalWidth * pixelSize;
        wall.style.width = newWidth + "px";
        wall.style.left = leftPosition + "px";
        console.log("current width = " + newWidth);
        leftPosition += newWidth;
        console.log("left pos = " + leftPosition);
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

    //styling the tiled floor
    kitchenFloor.style.width = 166 * pixelSize + "px";
    kitchenFloor.style.height = 65 * pixelSize + "px";
    kitchenFloor.style.backgroundSize = (25 * pixelSize) + "px" + " " + (25 * pixelSize) + "px";
}

/*
//or like this
window.onload = function() {
    furnitures.forEach((furniture) => {
        const originalWidth = furniture.clientWidth;
        furniture.style.width = originalWidth * pixelSize + "px"; // Scale the width
    });
};
*/

const feet = document.getElementById("feet");
const kitchenFloorWidth = kitchenFloor.clientWidth;
const kitchenFloorRect = {
    top: kitchenFloor.getBoundingClientRect().top,
    left: kitchenFloor.getBoundingClientRect().left,
    right: kitchenFloor.getBoundingClientRect().right,
    bottom: kitchenFloor.getBoundingClientRect().bottom,
}

let x = 600; // Initial character X position
let y = 150; // Initial character Y position
let speed = 8; // Character movement speed
character.style.left = x + "px";
character.style.top = y + "px";

function checkCollision(newFeetX, newFeetY) {
    const feetRect = {
        top: newFeetY,
        left: newFeetX,
        right: newFeetX + (22 * scaleSize),
        bottom: newFeetY + (3 * scaleSize),
    };
    console.log(kitchenFloorRect)
    console.log(feetRect)

    for (const furniture of furnitures) {
        const furnitureRect = {
            name: furniture.id,
            top: furniture.getBoundingClientRect().top,
            left: furniture.getBoundingClientRect().left,
            right: furniture.getBoundingClientRect().right,
            bottom: furniture.getBoundingClientRect().bottom,
        };

        if (
           (feetRect.right > furnitureRect.left &&
            feetRect.left < furnitureRect.right &&
            feetRect.bottom > furnitureRect.top &&
            feetRect.top < furnitureRect.bottom) 
        ) {
            console.log(furnitureRect)
            console.log(feetRect)
            console.log("furniture collision");
            console.log("furniture " + furniture.clientWidth); //sth is up with the wall
            return true; // Collision detected
        }
        console.log(furnitureRect)
        console.log(feetRect)
    }
    return false; // No collision
}


document.addEventListener("keydown", function (event) {
    console.log(event);
    let newX = x; // New potential X position
    let newY = y; // New potential Y position
    let newFeetX = newX + (5 * scaleSize);
    let newFeetY = newY + (30 * scaleSize);
    //left
    if (event.code == "ArrowLeft") {
        newX -= speed;
        character_spritesheet.classList.add("face-left", "animate_spritesheet")
        plate.classList.add("animate_plate")
        newFeetX = newX - (5 * scaleSize); 
    }
    //up
    else if (event.code == "ArrowUp") {
        newY -= speed;
        character_spritesheet.classList.add("face-back", "animate_spritesheet")
        newFeetY = newY - (30 * scaleSize);
    }
    //right
    else if (event.code == "ArrowRight") {
        newX += speed;
        character_spritesheet.classList.add("face-right", "animate_spritesheet")
        newFeetX = newX + (5 * scaleSize); 
    }
    //down
    else if (event.code == "ArrowDown") {
        newY += speed;
        character_spritesheet.classList.add("animate_spritesheet")
        newY + (30 * scaleSize);
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

