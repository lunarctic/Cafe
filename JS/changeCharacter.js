const characters = document.querySelectorAll("#charCustomisationModal img");

for (const character of characters) {
    character.addEventListener("click", updateCharacter);
};

function updateCharacter(event) {
    const character = event.target;
    const characterSrc = getFilename(character.src);
    console.log("characterSrc: ", characterSrc);
    setCharacter(characterSrc);
    localStorage.setItem("characterSkin", characterSrc);
    toggleModal(charCustomisationModal, false, false);
};

function setCharacter(characterSrc) {
    characterSpritesheet.removeAttribute("src");
    characterSpritesheet.src = "img/spritesheets/" + characterSrc;
};

const characterSrc = localStorage.getItem("characterSkin");

if (characterSrc) {
    setCharacter(characterSrc);
};
