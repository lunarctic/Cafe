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

    const deliverySpotRect = { 
        top: deliverySpot.getBoundingClientRect().top,
        left: deliverySpot.getBoundingClientRect().left,
        right: deliverySpot.getBoundingClientRect().right,
        bottom: deliverySpot.getBoundingClientRect().bottom,
    };

    if(feetRect.top <= fridgeRect.bottom + 40 && feetRect.left >= fridgeRect.left - 25 && feetRect.right <= fridgeRect.right + 25 ){
        fridgeBtn.classList.add("show");
       } else if(feetRect.top <= ovenRect.bottom + 40 && feetRect.left >= ovenRect.left - 25 && feetRect.right <= ovenRect.right + 90 ){
        if (ovenIsOn === false){
            ovenBtn.classList.add("show");
            if(timer.classList.contains("show")){
                timer.classList.remove("show");
            }
        }
       } else if(deliverySpotRect.top + 15 <= feetRect.bottom && feetRect.bottom <= deliverySpotRect.top + 60 && feetRect.left >= deliverySpotRect.left - 30 && feetRect.right <= deliverySpotRect.right + 30 ){
            putOrderBtn.classList.add("show");
       }
       else{
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
    } else if(opened && !inventoryOpened){
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

const closeBtns = document.querySelectorAll(".close");
for(const closeBtn of closeBtns){
    closeBtn.onclick = () => {
        if(closeBtn.parentNode.id === "fridgeModal"){
            openFridge(false)
        }
        toggleModal(ovenModal, false, false);
        toggleModal(fridgeModal, false, false);
        toggleModal(recipeBook, false, false);
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

const recipes = [
    {
      name: "chocolate_cake",
      ingredients: ["strawberry.png", "cake_base.png", "chocolate.png"].sort(), // Always sort ingredients for consistency
    },
    {
      name: "raspberry_cheesecake_pot",
      ingredients: ["raspberry.png", "creamcheese.png", "cookies.png"].sort(),
    },
    // Add more recipes as needed
  ];


function makeRecipeBook(){
    for (const recipe of recipes) {
       const recipeRow = document.createElement("div");
       recipeRow.classList.add("recipeRow");
       const recipeName = document.createElement("h3");
       recipeName.classList.add("recipeName");
       const recipeIngredients = document.createElement("div");
       recipeIngredients.classList.add("recipeIngredients");
       const recipePicture = document.createElement("img");
       recipePicture.classList.add("recipePicture");
       const equalitySign = document.createElement("h3");
       const plusSign1 = document.createElement("h3");
       const plusSign2 = document.createElement("h3");
       const ingredient1 = document.createElement("img");
       ingredient1.classList.add("ingredient1");
       const ingredient2 = document.createElement("img");
       ingredient2.classList.add("ingredient2");
       const ingredient3 = document.createElement("img");
       ingredient3.classList.add("ingredient3");

       recipeBook.appendChild(recipeRow);
       recipeRow.appendChild(recipeName);
       recipeRow.appendChild(recipeIngredients);
       recipeIngredients.appendChild(recipePicture);
       recipeIngredients.appendChild(equalitySign);
       recipeIngredients.appendChild(ingredient1);
       recipeIngredients.appendChild(plusSign1);
       recipeIngredients.appendChild(ingredient2);
       recipeIngredients.appendChild(plusSign2);
       recipeIngredients.appendChild(ingredient3);

       recipeName.innerHTML = recipe.name;
       console.log("recipe name: ", recipe.name);
       recipePicture.src = "img/food/" + recipe.name + ".png";
       equalitySign.innerHTML = "=";
       plusSign1.innerHTML = "+";
       plusSign2.innerHTML = "+";
       ingredient1.src = "img/food/" + recipe.ingredients[0];
       ingredient2.src = "img/food/" + recipe.ingredients[1];
       ingredient3.src = "img/food/" + recipe.ingredients[2];
    }
};

makeRecipeBook();