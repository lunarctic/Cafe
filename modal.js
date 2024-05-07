// henter modal
var modal = document.getElementById("myModal");

// henter button som åpner modal
var btn = document.getElementById("myBtn");

// henter <span> elementet som lukker modal (close button)
var span = document.getElementById("close");

// åpner modal når man trykker på lenken. legger til class som gjør at den vises 
btn.onclick = function() {
  modal.classList.add("show");
}

// lukker modal når man trykker på close (x). fjerner class som gjør at den vises
span.onclick = function() {
  modal.classList.remove("show");
}

// hvis man trykker på et sted annet enn modal lukkes modal. fjerner class som gjør at den vises
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("show");
  }
}