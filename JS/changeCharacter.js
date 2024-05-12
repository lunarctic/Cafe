const characters = document.querySelectorAll("#charCustomisationModal img");

for (const character of characters){
    character.addEventListener("click", updateCharacter);
};

function updateCharacter(event){
    const character = event.target;
    const characterSrc = getFilename(character.src);
    console.log("characterSrc: ", characterSrc);
    characterSpritesheet.removeAttribute("src");
    characterSpritesheet.src = "img/spritesheets/" + characterSrc;
};
