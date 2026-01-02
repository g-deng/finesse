import { type Shape } from "./types.js";
import { filterActiveTargets } from "./combos.js";

const randomizeElement = document.querySelector("#randomize-toggle") as HTMLInputElement;

export let randomizeMode = false;

randomizeElement.addEventListener("input", () => {
    randomizeMode = randomizeElement.checked;
});

const targetSelectElement = document.getElementById("target-select") as HTMLDivElement;

export const selectedShapes: Shape[] = [];
const shapes: Shape[] = ["I", "O", "T", "S", "Z", "J", "L"];
function getSelectedShapes(): Shape[] {
    const selectedShapes: Shape[] = [];
    const checkboxes = targetSelectElement.querySelectorAll("input[type=checkbox]") as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        if (checkbox.checked) {
            selectedShapes.push(shapes[i]);
        }
    }
    return selectedShapes;
}

targetSelectElement.addEventListener("click", () => {
    selectedShapes.length = 0;
    selectedShapes.push(...getSelectedShapes());
    filterActiveTargets(selectedShapes);
});

export let DAS = 170;
export let ARR = 30;

const dasInput = document.getElementById("das-input") as HTMLInputElement;
dasInput.addEventListener("input", () => {
    DAS = parseInt(dasInput.value, 10);
});

const arrInput = document.getElementById("arr-input") as HTMLInputElement;
arrInput.addEventListener("input", () => {
    ARR = parseInt(arrInput.value, 10);
    if (ARR <= 0) {
        ARR = 0.001;
    }
});

export let showGhost = true;
export let showGridLines = true;
export let showGridNumbers = true;
export let showFinesseHint = true;
const showGhostInput = document.getElementById("show-ghost") as HTMLInputElement;
showGhostInput.addEventListener("input", () => {
    showGhost = showGhostInput.checked;
});

const showGridLinesInput = document.getElementById("show-grid-lines") as HTMLInputElement;
showGridLinesInput.addEventListener("input", () => {
    showGridLines = showGridLinesInput.checked;
});

const showGridNumbersInput = document.getElementById("show-grid-numbers") as HTMLInputElement;
showGridNumbersInput.addEventListener("input", () => {
    showGridNumbers = showGridNumbersInput.checked;
});

const showFinesseHintInput = document.getElementById("show-finesse-hint") as HTMLInputElement;
showFinesseHintInput.addEventListener("input", () => {
    showFinesseHint = showFinesseHintInput.checked;
});



