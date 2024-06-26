const character = document.getElementById("character");
const characterSpritesheet = document.getElementById("character_spritesheet");
const feet = document.getElementById("feet");

const furnitures = document.querySelectorAll("#furniture img");
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
const deliverySpot = document.getElementById("deliverySpot");
const delivery = document.getElementById("delivery");
const walls = document.getElementById("walls");

const scaleSize = 5; // Scaling factor
const feetScaleSize = 5;

function scaleFurniture() {
    // Scale the furniture sizes
    for (const furniture of furnitures) {
        let originalWidth = furniture.clientWidth;
        if (furniture.id == "fridge") {
            originalWidth = originalWidth * 1.4; //the fridge was small compared to other furniture so i fixed it here
        }
        furniture.style.width = originalWidth * scaleSize + "px";
    }

    fridgeContainer.style.width = fridge.width + (13 * scaleSize * 1.4) + "px";
    fridgeContainer.style.height = fridge.height + "px";
    ovenContainer.style.width = oven.width + "px";
    ovenContainer.style.height = oven.height + "px";

    //have to do the counter(s) seperately because it doesn't have the furniture ID
    counterRight.style.width = counterRight.clientWidth * scaleSize + "px";
    counterLeft.style.width = counterLeft.clientWidth * scaleSize + "px";
    counterCenter.style.width = counterCenter.clientWidth * scaleSize + "px";
    counter.style.width = counterRight.clientWidth + counterLeft.clientWidth + counterCenter.clientWidth + "px";
    counter.style.height = counterRight.clientHeight + "px";

    delivery.style.width = delivery.clientWidth * scaleSize + "px";

    //styling the tiled floor
    kitchenFloor.style.width = 166 * scaleSize + "px";
    kitchenFloor.style.height = 54 * scaleSize + "px";
    kitchenFloor.style.backgroundSize = (25 * scaleSize) + "px" + " " + (25 * scaleSize) + "px";

    //styling the walls
    walls.style.width = "100vw";
    walls.style.height = 48 * scaleSize + "px";
    walls.style.backgroundSize = (16 * scaleSize) + "px" + " " + (48 * scaleSize) + "px";
}

function positioningFurniture() {
    //the kitchen
    ovenContainer.style.left = 0 + "px";
    kitchenSet.style.left = ovenContainer.clientWidth + "px";
    fridgeContainer.style.left = ovenContainer.clientWidth + kitchenSet.clientWidth + "px";
    kitchen.style.top = 9 * scaleSize + "px";
    fridgeContainer.style.top = 6 * scaleSize + "px";
    kitchen.style.width = ovenContainer.clientWidth + kitchenSet.clientWidth + fridgeContainer.clientWidth + "px"; // to be able to center the kitchen
    //kitchen floor
    kitchenFloor.style.top = 48 * scaleSize + "px";
    //counters
    counter.style.top = 33 * scaleSize + "px";
    counterLeft.style.left = 0;
    counterRight.style.right = 0;
    counterCenter.style.top = (33 * scaleSize) + (56 * scaleSize) + "px";

    deliverySpot.style.top = (92 * scaleSize) + "px";

}

//calling the functions immediately
scaleFurniture();
positioningFurniture();

const BGmusic = document.getElementById("BGmusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

musicBtn.addEventListener("click", function () {
    if (isPlaying) {
        BGmusic.pause();
        isPlaying = false;
        musicBtn.textContent = "Play Music";
    } else {
        BGmusic.play();
        isPlaying = true;
        musicBtn.textContent = "Pause Music";
    }
});
