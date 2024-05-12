
let x = 600; // Initial character X position
let y = 150; // Initial character Y position
let speed = 2 * scaleSize; // Character movement speed
character.style.left = x + "px";
character.style.top = y + "px";

function checkCollision(newFeetX, newFeetY) {
    const feetRect = {
        top: newFeetY, 
        left: newFeetX,
        right: newFeetX + feet.clientWidth,
        bottom: newFeetY + feet.clientHeight,
    };

    feetJS.style.width = feet.clientWidth + "px";
    feetJS.style.height = feet.clientHeight + "px";

    for (const furniture of furnitures) {
        const furnitureRect = {
            name: furniture.id, //to check in console if there are problems
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
            console.log("furniture collision");
            console.log("collision furnitureRect ", furnitureRect);
            
            newFeetJS.style.width = feet.clientWidth + "px";
            newFeetJS.style.height = feet.clientHeight + "px";
            newFeetJS.style.left = newFeetX + "px";
            newFeetJS.style.top = newFeetY + "px";

            return true; // Collision detected
        }
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
    //tried moving these definitions but it caused problems:
    let newX = x; // New potential X position
    let newY = y; // New potential Y position
    let newFeetX = newX + (5 * feetScaleSize);
    let newFeetY = newY + (30 * feetScaleSize); 

    //left
    if (event.key == "a" || event.key == "A") {
        newX -= speed;
        characterSpritesheet.classList.add("face-left", "animate_spritesheet")
        //plate.classList.add("animate_plate")
        newFeetX -= speed;
    }
    //up
    else if (event.key == "w" || event.key == "W") {
        newY -= speed;
        characterSpritesheet.classList.add("face-back", "animate_spritesheet")
        newFeetY -= speed;
    }
    //right
    else if (event.key == "d" || event.key == "D") {
        newX += speed;
        characterSpritesheet.classList.add("face-right", "animate_spritesheet")
        newFeetX += speed; 
    }
    //down
    else if (event.key == "s" || event.key == "S") {
        newY += speed;
        characterSpritesheet.classList.add("animate_spritesheet")
        newFeetY += speed;
    }

    if (!checkCollision(newFeetX, newFeetY)) {
        x = newX;
        y = newY;
        character.style.left = x + "px";
        character.style.top = y + "px";

        feetJS.style.left = newFeetX + "px";
        feetJS.style.top = newFeetY + "px";

        checkButtons();
    }

})



document.addEventListener('keyup', function (event) {
    //left
    if (event.key == "a" || event.key == "A") {
        characterSpritesheet.classList.remove("face-left", "animate_spritesheet")
    }
    //up
    else if (event.key == "w" || event.key == "W") {
        characterSpritesheet.classList.remove("face-back", "animate_spritesheet")
    }
    //right
    else if (event.key == "d" || event.key == "D") {
        characterSpritesheet.classList.remove("face-right", "animate_spritesheet")
    }
    //down
    else if (event.key == "s" || event.key == "S") {
        characterSpritesheet.classList.remove("animate_spritesheet")
    }

});
