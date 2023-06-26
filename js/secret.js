import { selectWord, onlyLetters } from "./words.js";

let oportunities = 4;
const wordContainer = document.getElementById("secret");

const showLifes = () => {
    const lifesContainer = document.getElementById("lifes__container");
    const lifes = 5;
    oportunities = 4;

    for (var i = 0; i < lifes; i++) {
        var span = document.createElement("span");
        span.classList.add("life");
        lifesContainer.appendChild(span);
    }
};

const removeLifes = () => {
    const lifesContainer = document.getElementById("lifes__container");

    if (lifesContainer.lastElementChild.tagName === "SPAN") {
        lifesContainer.removeChild(lifesContainer.lastElementChild);
    }
};

const playGame = () => {
    const btnLetter = document.getElementById("try__letter");
    const lettersTry = document.getElementById("letters__try");
    const letter = document.getElementById("letter__secret");

    let correct = 0;
    let secretLetter = 0;
    counterLetter();
    letter.focus();

    // Limitar la entrada de texto
    letter.addEventListener("input", (event) => {
        const inputValue = event.target.value;
        const oneLetter = inputValue.slice(0, 1);
        event.target.value = onlyLetters(oneLetter);
    });

    // Comparar letra ingresada
    btnLetter.addEventListener("click", (e) => {
        e.preventDefault();

        // Historial de letras ingresadas
        const listLetters = lettersTry.textContent.toLocaleLowerCase();
        // Letra para comparar
        const tryLetter = letter.value.toLowerCase();

        // Verificar que exista  algún caracter y que no se haya registrado en el historial
        if (tryLetter !== "" && !listLetters.includes(tryLetter)) {
            // Obtener los elemetos con las letras
            const letters = wordContainer.querySelectorAll("span");
            // Verificar y mostrar la letra encontrada
            letters.forEach((item) => {
                if (item.classList.contains("shh")) {
                    const val = item.textContent.toLowerCase();

                    if (val === tryLetter) {
                        item.classList.remove("shh");
                        correct = correct + 1;
                    }
                }
            });

            //  Si no hubo letras encontradas cuenta como error se descuentan las oportunidades
            if (correct === 0) {
                removePartOfZombie(oportunities);
                oportunities = oportunities - 1;
                removeLifes();

                //  Si se acaban las oportunidades se muestra la palabra secreta
                if (oportunities < 0) {
                    letters.forEach((item) => {
                        item.classList.remove("shh");
                    });
                }
            } else {
                secretLetter = counterLetter();

                //  Si ya no quedan letras, se gana el juego
                if (secretLetter === 0) {
                    cartelFinish("win");
                }
            }

            //  Se actualiza el historial de letras
            lettersTry.textContent =
                lettersTry.textContent + " " + tryLetter.toUpperCase();

            //  Se resetean las variables para validar nuevamente
            correct = 0;
            secretLetter = 0;
            letter.value = "";
            letter.focus();
        }
    });
};

// Contador de cuantas letras ocultas quedan
const counterLetter = () => {
    const restantLetters = document.getElementById("secret__letters");
    const letters = wordContainer.querySelectorAll("span");

    let secretLetter = 0;

    //  Se verifica cuantas letras quedan
    letters.forEach((item) => {
        if (item.classList.contains("shh")) {
            secretLetter = secretLetter + 1;
        }
    });

    // Se imprime y retorna el resultado
    restantLetters.textContent = "Letras secretas: " + secretLetter;
    return secretLetter;
};

// Eliminamos las extremidades del zombie
function removePartOfZombie(countErrors) {
    // Partes que componen al zombie
    // El orden en que se caerán va de abajo hacia arriba
    const partsZombieMap = {
        0: "out",
        1: "z_head",
        2: "leg_right",
        3: "arm_right",
        4: "arm_left",
    };

    const zombie = document.getElementById("zombie");
    const zombieElementImg = zombie.querySelectorAll("img");

    // Se selecciona la parte del zombie dependiendo del contador
    const zombiePartClass = partsZombieMap[countErrors];

    // Se busca la clase y se elimina
    if (zombiePartClass) {
        for (const part of zombieElementImg) {
            if (part.classList.contains(zombiePartClass)) {
                part.classList.add("out");
            }
        }
    }

    // Si ya no tiene extremidades, desaparece el zombie
    if (countErrors === 0) {
        zombie.classList.add("out");
        cartelFinish("fail");
    }
}

// Pantalla de finalización
const cartelFinish = (type) => {
    const input = document.getElementById("letter__input");
    const finish = document.getElementById("game__finish");
    const lifes = document.getElementById("lifes__container");
    const counter = document.getElementById("secret__letters");
    const cartel = document.getElementById("finish__msg");

    // Se muestra el mensaje
    if (type === "win") {
        cartel.textContent = "GANASTE";
    } else {
        cartel.textContent = "PERDISTE";
    }

    cartel.classList.add("active");

    // Se ocultan y muestran elementos
    input.style.display = "none";
    lifes.style.display = "none";
    counter.style.display = "none";
    finish.style.display = "flex";
};

// Se resetea la palabra secreta y el historial de letras
const resetElementsSpan = () => {
    const lettersTry = document.getElementById("letters__try");

    while (wordContainer.firstChild) {
        if (wordContainer.firstChild.tagName === "SPAN") {
            wordContainer.removeChild(wordContainer.firstChild);
        }
    }

    lettersTry.textContent = "";
};

// Se resetea el cuerpo del zombie
const restoreZombie = () => {
    const zombie = document.getElementById("zombie");
    const zombieElementImg = zombie.querySelectorAll("img");

    for (const part of zombieElementImg) {
        part.classList.remove("out");
    }

    zombie.classList.remove("out");
};

// Se resetan los contenedores
const resetContainers = () => {
    const input = document.getElementById("letter__input");
    const finish = document.getElementById("game__finish");
    const lifes = document.getElementById("lifes__container");
    const counter = document.getElementById("secret__letters");
    const cartel = document.getElementById("finish__msg");

    cartel.classList.remove("active");

    // Se ocultan y muestran algunos elementos
    input.style.display = "flex";
    lifes.style.display = "flex";
    counter.style.display = "flex";
    finish.style.display = "none";
};

// Ciclo de inicio del juego
const startGame = () => {
    showLifes();
    selectWord(wordContainer);
    playGame();
};

// Ciclo de reseteo del juego
const resetGame = () => {
    resetElementsSpan();
    restoreZombie();
    resetContainers();
};

export { startGame, resetGame };
