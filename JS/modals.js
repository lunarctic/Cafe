const fridgeModal = document.getElementById("fridgeModal");
const fridgeBtn = document.getElementById("fridgeBtn");
const ovenModal = document.getElementById("ovenModal");
const ovenBtn = document.getElementById("ovenBtn");
const myModal = document.getElementById("modal");
const putOrderBtn = document.getElementById("putOrderBtn");
const deliveryModal = document.getElementById("deliveryModal");
const inventory = document.getElementById("inventory");
const recipeBtn = document.getElementById("recipeBtn");
const recipeBook = document.getElementById("recipeBook");
const messageModal = document.getElementById("messageModal");
const charCustomisationModal = document.getElementById("charCustomisationModal");
const charBtn = document.getElementById("charBtn");

//checking the character's distance to the fridge/oven. if the character is standing in front of the fridge/oven, the "open" button will show
function checkButtons() {
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

    const deliverySpotRect = {
        top: deliverySpot.getBoundingClientRect().top,
        left: deliverySpot.getBoundingClientRect().left,
        right: deliverySpot.getBoundingClientRect().right,
        bottom: deliverySpot.getBoundingClientRect().bottom,
    };

    if (feetRect.top <= fridgeRect.bottom + 40 && feetRect.left >= fridgeRect.left - 25 && feetRect.right <= fridgeRect.right + 25) {
        fridgeBtn.classList.add("show");
    } else if (feetRect.top <= ovenRect.bottom + 40 && feetRect.left >= ovenRect.left - 25 && feetRect.right <= ovenRect.right + 90) {
        if (ovenIsOn === false) {
            ovenBtn.classList.add("show");
            if (timer.classList.contains("show")) {
                timer.classList.remove("show");
            }
        }
    } else if (deliverySpotRect.top + 15 <= feetRect.bottom && feetRect.bottom <= deliverySpotRect.top + 60 && feetRect.left >= deliverySpotRect.left - 30 && feetRect.right <= deliverySpotRect.right + 30) {
        putOrderBtn.classList.add("show");
    }
    else {
        fridgeBtn.classList.remove("show");
        ovenBtn.classList.remove("show");
        putOrderBtn.classList.remove("show");
    }
}

function toggleModal(modal, opened, inventoryOpened) {
    if (opened && inventoryOpened) {
        modal.classList.add("show");
        myModal.classList.add("show");
        inventory.classList.add("show");
    } else if (opened && !inventoryOpened) {
        modal.classList.add("show");
        myModal.classList.add("show");
    }
    else {
        modal.classList.remove("show");
        myModal.classList.remove("show");
        inventory.classList.remove("show");
    }
}

fridgeBtn.onclick = () => {
    openFridge(true);
    toggleModal(fridgeModal, true, true);
};

ovenBtn.onclick = () => {
    toggleModal(ovenModal, true, true);
};

putOrderBtn.onclick = () => {
    toggleModal(deliveryModal, true, true);
};

recipeBtn.onclick = () => {
    toggleModal(recipeBook, true, false);
};

charBtn.onclick = () => {
    toggleModal(charCustomisationModal, true, false);
};


function getCloseBtns() {
    const closeBtns = document.querySelectorAll(".close");
    for (const closeBtn of closeBtns) {
        closeBtn.onclick = () => {
            if (closeBtn.parentNode.id === "fridgeModal") {
                openFridge(false)
            }
            toggleModal(ovenModal, false, false);
            toggleModal(fridgeModal, false, false);
            toggleModal(recipeBook, false, false);
            toggleModal(messageModal, false, false);
            toggleModal(charCustomisationModal, false, false);
            toggleModal(deliveryModal, false, false);
        }
    }
};

getCloseBtns();

function openFridge(open) {
    if (open) {
        fridge.src = "img/furniture/openfridge.png";
        fridge.style.width = fridge.clientWidth + (13 * scaleSize * 1.4) + "px";
    } else {
        fridge.src = "img/furniture/fridge181.png";
        fridge.style.width = fridge.clientWidth - (13 * scaleSize * 1.4) + "px";
    }
}

window.onclick = (event) => {
    if (event.target === myModal) {
        if (fridgeModal.classList.contains("show")) {
            openFridge(false); // Closing the fridge if it was the fridge modal that was open
        }
        toggleModal(ovenModal, false, false);
        toggleModal(fridgeModal, false, false);
        toggleModal(recipeBook, false, false);
        toggleModal(messageModal, false, false);
        toggleModal(charCustomisationModal, false, false);
        toggleModal(deliveryModal, false, false);
    }
};

const recipes = [
    {
        name: "ChocolateCake",
        ingredients: ["strawberry.png", "CakeBase.png", "chocolate.png"].sort(), // Always sort ingredients for consistency
    },
    {
        name: "RaspberryCheesecakePot",
        ingredients: ["raspberry.png", "CreamCheese.png", "cookies.png"].sort(),
    },
    {
        name: "StrawberryDonut",
        ingredients: ["strawberry.png", "DonutBase.png", "Cream.png"].sort(),
    },
];

function makeRecipeBook() {
    recipeBook.innerHTML = '';
    const recipeBookCloseBtn = document.createElement("span");
    recipeBookCloseBtn.classList.add("close");
    recipeBook.appendChild(recipeBookCloseBtn);
    recipeBookCloseBtn.innerHTML = "&times;";
    getCloseBtns();

    for (const [index, recipe] of recipes.entries()) {
        const recipeRow = document.createElement("div");
        recipeRow.classList.add("recipeRow");
        if (index % 2 != 0) {
            recipeRow.style.backgroundColor = "rgb(255 224 192)";
        }
        const recipeName = document.createElement("h3");
        recipeName.classList.add("recipeName");
        const recipeIngredients = document.createElement("div");
        recipeIngredients.classList.add("recipeIngredients");
        const recipePicture = document.createElement("img");
        recipePicture.classList.add("recipePicture");
        const equalitySign = document.createElement("h3");
        const plusSign1 = document.createElement("h3");
        const ingredient1 = document.createElement("img");
        ingredient1.classList.add("ingredient1");
        const ingredient2 = document.createElement("img");
        ingredient2.classList.add("ingredient2");
        recipeBook.appendChild(recipeRow);
        recipeRow.appendChild(recipeName);
        recipeRow.appendChild(recipeIngredients);
        recipeIngredients.appendChild(recipePicture);
        recipeIngredients.appendChild(equalitySign);
        recipeIngredients.appendChild(ingredient1);
        recipeIngredients.appendChild(plusSign1);
        recipeIngredients.appendChild(ingredient2);
        if (recipe.ingredients.length > 2) {
            const ingredient3 = document.createElement("img");
            ingredient3.classList.add("ingredient3");
            const plusSign2 = document.createElement("h3");
            recipeIngredients.appendChild(plusSign2);
            plusSign2.innerHTML = "+";
            recipeIngredients.appendChild(ingredient3);
            ingredient3.src = "img/food/" + recipe.ingredients[2];
        }

        recipeName.innerHTML = recipe.name.replace(/([A-Z])/g, ' $1').trim(); //this splits the string where there is a capital letter so that its split into words
        console.log("recipe name: ", recipe.name);
        recipePicture.src = "img/food/" + recipe.name + ".png";
        equalitySign.innerHTML = "=";
        plusSign1.innerHTML = "+";

        ingredient1.src = "img/food/" + recipe.ingredients[0];
        ingredient2.src = "img/food/" + recipe.ingredients[1];

    }
};

makeRecipeBook();