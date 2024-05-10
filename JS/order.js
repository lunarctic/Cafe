const deliverBtn = document.getElementById("deliverBtn");
deliverBtn.addEventListener("click", deliver);
const order = document.getElementById("order");
let newOrder = "";

function getNewOrder(){
    newOrder = (recipes[Math.floor(Math.random() * recipes.length)].name) + ".png";
    console.log("new order: " + newOrder);
    order.src = "img/food/" + newOrder;
}

getNewOrder();

function deliver(){
    putOrderBtn.classList.remove("show");
    myModal.classList.remove("show");
    const deliveredFood = getFilename(deliverySlot.src);
    if(deliveredFood === newOrder){
        window.alert("You got it right!")
    } else{
        window.alert("You got it wrong!")
    }
    deliverySlot.removeAttribute("src");
    getNewOrder();
}