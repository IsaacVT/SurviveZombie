import { wordLists } from "./data.js";

let wordTemp = "";
const palabras = wordLists;

const selectWord = (container) => {
    // Obtener un índice aleatorio de la lista de palabras
    var indice = Math.floor(Math.random() * palabras.length);

    // Obtener la palabra aleatoria
    var palabraAleatoria = palabras[indice];

    if (wordTemp !== palabraAleatoria) {
        wordTemp === palabraAleatoria;
        const palabraSeleccionada = palabraAleatoria.toUpperCase();

        // Crear elementos <span> para cada letra de la palabra
        for (var i = 0; i < palabraSeleccionada.length; i++) {
            var letra = palabraSeleccionada[i];
            var span = document.createElement("span");
            span.textContent = letra;
            span.classList.add("secret__letter");
            span.classList.add("shh");
            container.appendChild(span);
        }
    } else {
        selectWord();
    }
};

const showWords = () => {
    const container = document.getElementById("word__list");

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Crea un elemento table
    const table = document.createElement("table");
    table.setAttribute("id", "table__words");

    palabras.map((word) => {
        // Crea un elemento tr (fila) para cada palabra
        const row = document.createElement("tr");

        // Crea un elemento td (celda) para mostrar la palabra
        const cell = document.createElement("td");
        cell.textContent = word;

        // Agrega la celda a la fila
        row.appendChild(cell);

        // Agrega la fila a la tabla
        table.appendChild(row);
    });

    // Retorna la tabla
    container.appendChild(table);
};

const addWord = () => {
    const insertNewWord = document.getElementById("word__new");
    const insertBtn = document.getElementById("word__insert");
    const change = document.getElementById("change__screen");

    insertBtn.disabled = true;
    insertNewWord.addEventListener("input", (e) => {
        const word = e.target.value;
        e.target.value = onlyLetters(word);
        const finalWord = e.target.value;

        if (finalWord.length >= 5) {
            insertBtn.disabled = false;
        } else {
            const msg = "Palabras de 5 a 15 caracteres";
            insertNewWord.setCustomValidity(msg);
            insertNewWord.reportValidity();
            insertBtn.disabled = true;
        }
    });

    insertBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const newWord = insertNewWord.value;

        if (!palabras.includes(newWord)) {
            change.classList.add("active");

            setTimeout(() => {
                palabras.push(newWord);
                insertNewWord.value = "";
                showWords();
            }, 500);

            setTimeout(() => {
                change.classList.remove("active");
            }, 1000);
        } else {
            const msg = "La palabra *" + newWord + "* ya existe";
            insertNewWord.setCustomValidity(msg);
            insertNewWord.reportValidity();
        }
    });
};

const onlyLetters = (caracter) => {
    return caracter.replace(/[^a-zA-Z]/g, "");
};

export { showWords, selectWord, addWord, onlyLetters };
