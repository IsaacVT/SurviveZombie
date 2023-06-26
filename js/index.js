import { startGame, resetGame } from "./secret.js";
import { addWord, showWords } from "./words.js";

const title = document.getElementById("title");
const beforeGame = document.getElementById("game__before__start");
const playGameScreen = document.getElementById("game__play");

const newGame = document.getElementById("new__game");
const showWord = document.getElementById("show_words");

const wordListsView = document.getElementById("view__words");
const returnHome = document.getElementById("cancel__insert");

const again = document.getElementById("try__again");
const home = document.getElementById("return__home");

const change = document.getElementById("change__screen");

const handleReturn = () => {
    change.classList.add("active");
    setTimeout(() => {
        resetGame();
        title.style.visibility = "visible";
        beforeGame.style.display = "flex";
        playGameScreen.style.display = "none";
        wordListsView.style.display = "none";
    }, 500);

    setTimeout(() => {
        change.classList.remove("active");
    }, 1000);
};

const hanldeChange = () => {
    title.style.visibility = "hidden";
    beforeGame.style.display = "none";
};

newGame.addEventListener("click", () => {
    change.classList.add("active");

    setTimeout(() => {
        hanldeChange();
        playGameScreen.style.display = "flex";
        startGame();
    }, 500);

    setTimeout(() => {
        change.classList.remove("active");
    }, 1000);
});

showWord.addEventListener("click", () => {
    change.classList.add("active");

    setTimeout(() => {
        hanldeChange();
        wordListsView.style.display = "flex";
        showWords();
        addWord();
    }, 500);

    setTimeout(() => {
        change.classList.remove("active");
    }, 1000);
});

again.addEventListener("click", () => {
    change.classList.add("active");

    setTimeout(() => {
        resetGame();
        startGame();
    }, 500);

    setTimeout(() => {
        change.classList.remove("active");
    }, 1000);
});

home.addEventListener("click", () => handleReturn());
returnHome.addEventListener("click", () => handleReturn());
