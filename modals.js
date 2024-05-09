// henter modal
const fridgeModal = document.getElementById("fridgeModal");
// henter button som åpner modal
const fridgeBtn = document.getElementById("fridgeBtn");
// henter <span> elementet som lukker modal (close button)
const ovenModal = document.getElementById("ovenModal");
const ovenBtn = document.getElementById("ovenBtn");
const myModal = document.getElementById("modal");

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
        if (ovenIsOn === false){
            ovenBtn.classList.add("show");
        }
       } else{
        fridgeBtn.classList.remove("show");
        ovenBtn.classList.remove("show");
       }
}

function toggleModal(modal, opened) {
    if (opened) {
        modal.classList.add("show");
        myModal.classList.add("show");
        inventory.classList.add("show");
    } else {
        modal.classList.remove("show");
        myModal.classList.remove("show");
        inventory.classList.remove("show");
    }
}

fridgeBtn.onclick = () => {
    openFridge(true);
    toggleModal(fridgeModal, true);
};

ovenBtn.onclick = () => {
    toggleModal(ovenModal, true);
};

const closeBtns = document.querySelectorAll(".close");
for(const closeBtn of closeBtns){
    closeBtn.onclick = () => {
        if(closeBtn.parentNode.id === "fridgeModal"){
            openFridge(false)
        }
        toggleModal(ovenModal, false);
        toggleModal(fridgeModal, false);
    }
}

function openFridge(open){
    if(open){
        fridge.src = "img/furniture/openfridge.png";
        fridge.style.width = fridge.clientWidth + (13 * scaleSize * 1.4) + "px";
    } else{
        fridge.src = "img/furniture/fridge181.png";
        fridge.style.width = fridge.clientWidth - (13 * scaleSize * 1.4) + "px";
    }
}

window.onclick = (event) => {
    if (event.target === myModal) {
        if (fridgeModal.classList.contains("show")) {
            openFridge(false); // Closing the fridge if it was the fridge modal that was open
        }
        toggleModal(ovenModal, false);
        toggleModal(fridgeModal, false);
    }
};
