const character = document.getElementById("character");
const character_spritesheet = document.getElementById("character_spritesheet");
const plate = document.getElementById("plate");

let scaleSize = 4; //for feet

let x = 20; // Initial character X position
let y = 350; // Initial character Y position
let speed = 5; // Character movement speed
character.style.left = x + "px";
character.style.top = y + "px";

const pixelSize = 4; // Scaling factor
const furnitures = document.querySelectorAll("#furniture img"); // Furniture element
const walls = document.querySelectorAll("#wall img");
let leftPosition = 0;

window.onload = function () {
    // Scale the furniture sizes
    for (const furniture of furnitures) {
        const originalWidth = furniture.clientWidth;
        console.log("original width = " + originalWidth);
        if (furniture.id == "fridge") {
            console.log("new width = " + (originalWidth * (pixelSize + 0.7)));
            furniture.style.width = originalWidth * (pixelSize + 0.7) + "px";
        }
        else {
            console.log("new width = " + (originalWidth * pixelSize));
            furniture.style.width = originalWidth * pixelSize + "px";
        }
    }

    // Put up the walls
    for (const wall of walls) {
        wall.style.left = leftPosition + "px";
        const ogWidth = wall.clientWidth;
        console.log("og width = " + ogWidth);
        leftPosition += ogWidth;
        console.log("left pos = " + leftPosition);
    }

    const kitchen = document.getElementById("kitchen");
    const kitchenSet = document.getElementById("kitchenSet");
    const fridge = document.getElementById("fridge");
    const stove = document.getElementById("stove");

    kitchenSet.style.left = stove.clientWidth;
    console.log("kitchenset left: " + kitchenSet.style.left);
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

function checkCollision(newFeetX, newFeetY) {
    const feetRect = {
        top: newFeetY,
        left: newFeetX,
        right: newFeetX + (25 * scaleSize),
        bottom: newFeetY + (3 * scaleSize),
    };

    for (const furniture of furnitures) {
        const furnitureRect = {
            top: furniture.getBoundingClientRect().top,
            left: furniture.getBoundingClientRect().left,
            right: furniture.getBoundingClientRect().right,
            bottom: furniture.getBoundingClientRect().bottom,
        };

        if (
            feetRect.right > furnitureRect.left &&
            feetRect.left < furnitureRect.right &&
            feetRect.bottom > furnitureRect.top &&
            feetRect.top < furnitureRect.bottom
        ) {
            return true; // Collision detected
        }
    }

    return false; // No collision
}

document.addEventListener("keydown", function (event) {
    console.log(event);
    let newX = x; // New potential X position
    let newY = y; // New potential Y position

    //left
    if (event.code == "ArrowLeft") {
        newX -= speed;
        character_spritesheet.classList.add("face-left", "animate_spritesheet")
        plate.classList.add("animate_plate")
    }
    //up
    else if (event.code == "ArrowUp") {
        newY -= speed;
        character_spritesheet.classList.add("face-back", "animate_spritesheet")
    }
    //right
    else if (event.code == "ArrowRight") {
        newX += speed;
        character_spritesheet.classList.add("face-right", "animate_spritesheet")
    }
    //down
    else if (event.code == "ArrowDown") {
        newY += speed;
        character_spritesheet.classList.add("animate_spritesheet")
    }

    console.log("newX: " + newX);
    console.log("newY: " + newY);

    let newFeetX = newX + (3.5 * scaleSize);
    console.log("newFeetX: " + newFeetX);
    let newFeetY = newY + (30 * scaleSize);
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

