// henter modal
const fridgeModal = document.getElementById("fridgeModal");
// henter button som åpner modal
const fridgeBtn = document.getElementById("fridgeBtn");
// henter <span> elementet som lukker modal (close button)
const ovenModal = document.getElementById("ovenModal");
const ovenBtn = document.getElementById("ovenBtn");

const inventory = document.getElementById("inventory");

//checking the character's distance to the fridge/oven. if the character is standing in front of the fridge/oven, the "open" button will show
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
        inventory.classList.add("show");
    } else {
        modal.classList.remove("show");
    }
}

fridgeBtn.onclick = () => {
    fridge.src = "img/furniture/openfridge.png";
    fridge.style.width = fridge.clientWidth + (13 * scaleSize * 1.4) + "px";
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
            fridge.style.width = fridge.clientWidth - (13 * scaleSize * 1.4) + "px";
        }
        toggleModal(modal, false);
    }
}

window.onclick = (event) => {
    if (event.target.classList.contains("modal")) {
        toggleModal(event.target, false);
    }
};

