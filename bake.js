const bakeBtn = document.querySelector("#ovenModal button");
bakeBtn.addEventListener("click", bake);
let ovenIsOn = false;
const timer = document.getElementById("timer");

function bake(){
    //const ovenSlots = [ovenSlot1, ovenSlot2, ovenSlot3];
    const food1 = getFilename(ovenSlot1.src);
    const food2 = getFilename(ovenSlot2.src);
    const food3 = getFilename(ovenSlot3.src);
    console.log("food1: " + food1);
    console.log("food2: " + food2);
    console.log("food3: " + food3);

    ovenIsOn = true;
    ovenBtn.classList.remove("show");
    timer.classList.add("show");
}

