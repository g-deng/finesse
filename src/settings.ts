import { type Shape } from "./types.js";
import { filterActiveTargets } from "./combos.js";
import type { Action } from "./keys.js";

/* Setup */

const randomizeElement = document.querySelector("#randomize-toggle") as HTMLInputElement;

export let randomizeMode = false;

randomizeElement.addEventListener("input", () => {
    randomizeMode = randomizeElement.checked;
});

const targetSelectElement = document.getElementById("target-select") as HTMLDivElement;

export const selectedShapes: Shape[] = ["I", "O", "T", "S", "Z", "J", "L"];
const shapes: Shape[] = ["I", "O", "T", "S", "Z", "J", "L"];
function getSelectedShapes(): Shape[] {
    const newShapes: Shape[] = [];
    const checkboxes = targetSelectElement.querySelectorAll("input[type=checkbox]") as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        if (checkbox.checked) {
            newShapes.push(shapes[i]);
        }
    }
    return newShapes;
}

targetSelectElement.addEventListener("click", () => {
    selectedShapes.length = 0;
    selectedShapes.push(...getSelectedShapes());
    filterActiveTargets(selectedShapes);
});

/* Settings */

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

const resetHandlingDefaultButton = document.getElementById("reset-handling-default-button") as HTMLButtonElement;
resetHandlingDefaultButton.addEventListener("click", () => {
    console.log("Resetting handling settings to default");
    dasInput.value = "170";
    (dasInput.nextElementSibling as HTMLOutputElement).value = "170";
    DAS = 170;
    arrInput.value = "30";
    (arrInput.nextElementSibling as HTMLOutputElement).value = "30";
    ARR = 30;
});
const resetHandlingGraceButton = document.getElementById("reset-handling-grace-button") as HTMLButtonElement;
resetHandlingGraceButton.addEventListener("click", () => {
    console.log("Resetting handling settings to grace's");
    dasInput.value = "100";
    (dasInput.nextElementSibling as HTMLOutputElement).value = "100";
    DAS = 100;
    arrInput.value = "0";
    (arrInput.nextElementSibling as HTMLOutputElement).value = "0";
    ARR = 0.001;
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


/* Keypresses */

// user clicks on keybind button, then presses a key to set keybind

export const keybinds: { [action: string]: string } = {
    left: "ArrowLeft",
    right: "ArrowRight",
    cw: "ArrowUp",
    ccw: "KeyZ",
    "180": "KeyA",
    harddrop: "Space",
};

export const keyMap : Record<string, Action> = {
    [keybinds.left]: "left",
    [keybinds.right]: "right",
    [keybinds.harddrop]: "harddrop",
    [keybinds.cw]: "cw",
    [keybinds.ccw]: "ccw",
    [keybinds["180"]]: "180",
};

const keybindButtons = document.querySelectorAll(".keybind-button") as NodeListOf<HTMLButtonElement>;

keybindButtons.forEach((button) => {
    console.log("Setting up keybind button:", button.id);
    button.addEventListener("click", () => {
        console.log("Clicked keybind button:", button.id);
        const action = button.id.replace("keybind-", "");
        console.log("Setting keybind for action:", action);
        const output = button.previousElementSibling as HTMLOutputElement;
        output.value = "Press a key...";
        const onKeydown = (e: KeyboardEvent) => {
            e.preventDefault();
            console.log("Key pressed for action", action, ":", e.code);
            keybinds[action] = e.code;
            output.value = e.code;
            document.removeEventListener("keydown", onKeydown);
        };
        document.addEventListener("keydown", onKeydown);
    });
});

const resetKeybindDefaultButton = document.getElementById("reset-keybind-default-button") as HTMLButtonElement;
resetKeybindDefaultButton.addEventListener("click", () => {
    console.log("Resetting keybinds to default");
    keybinds.left = "ArrowLeft";
    keybinds.right = "ArrowRight";
    keybinds.cw = "ArrowUp";
    keybinds.ccw = "KeyZ";
    keybinds["180"] = "KeyA";
    keybinds.harddrop = "Space";
    // update outputs
    keybindButtons.forEach((button) => {
        const action = button.id.replace("keybind-", "");
        const output = button.previousElementSibling as HTMLOutputElement;
        output.value = keybinds[action];
    });
});

const resetKeybindGraceButton = document.getElementById("reset-keybind-grace-button") as HTMLButtonElement;
resetKeybindGraceButton.addEventListener("click", () => {
    console.log("Resetting keybinds to grace's");
    keybinds.left = "ArrowLeft";
    keybinds.right = "ArrowRight";
    keybinds.cw = "KeyD";
    keybinds.ccw = "KeyA";
    keybinds["180"] = "KeyS";
    keybinds.harddrop = "Space";
    // update outputs
    keybindButtons.forEach((button) => {
        const action = button.id.replace("keybind-", "");
        const output = button.previousElementSibling as HTMLOutputElement;
        output.value = keybinds[action];
    });

    // update keyMap
    keyMap[keybinds.left] = "left";
    keyMap[keybinds.right] = "right";
    keyMap[keybinds.harddrop] = "harddrop";
    keyMap[keybinds.cw] = "cw";
    keyMap[keybinds.ccw] = "ccw";
    keyMap[keybinds["180"]] = "180";
});


/* Export / Import Config */

const exportButton = document.getElementById("export-button") as HTMLButtonElement;
exportButton.addEventListener("click", () => {
    const config = {
        DAS,
        ARR,
        keybinds,
        showGhost,
        showGridLines,
        showGridNumbers,
        showFinesseHint,
        selectedShapes,
        randomizeMode,
    };
    const configString = JSON.stringify(config, null, 2);
    const blob = new Blob([configString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "finesse-config.json";
    a.click();
    URL.revokeObjectURL(url);
});

const importButton = document.getElementById("import-button") as HTMLButtonElement;
const importFileInput = document.getElementById("import-file-input") as HTMLInputElement;
importButton.addEventListener("click", () => {
    importFileInput.click();
});

importFileInput.addEventListener("change", () => {
    const file = importFileInput.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const config = JSON.parse(reader.result as string);
            console.log(config);
            // apply config
            DAS = config.DAS;
            ARR = config.ARR;
            Object.assign(keybinds, config.keybinds);
            showGhost = config.showGhost;
            showGridLines = config.showGridLines;
            showGridNumbers = config.showGridNumbers;
            showFinesseHint = config.showFinesseHint;
            selectedShapes.length = 0;
            selectedShapes.push(...config.selectedShapes);
            randomizeMode = config.randomizeMode;

            // update UI elements
            dasInput.value = DAS.toString();
            arrInput.value = ARR.toString();
            dasInput.nextElementSibling!.textContent = DAS.toString();
            arrInput.nextElementSibling!.textContent = Math.floor(ARR).toString();
            showGhostInput.checked = showGhost;
            showGridLinesInput.checked = showGridLines;
            showGridNumbersInput.checked = showGridNumbers;
            showFinesseHintInput.checked = showFinesseHint;
            const checkboxes = targetSelectElement.querySelectorAll("input[type=checkbox]") as NodeListOf<HTMLInputElement>;
            checkboxes.forEach((checkbox, index) => {
                checkbox.checked = selectedShapes.includes(shapes[index]);
            });
            randomizeElement.checked = randomizeMode;

            // update keybind outputs
            keybindButtons.forEach((button) => {
                const action = button.id.replace("keybind-", "");
                const output = button.previousElementSibling as HTMLOutputElement;
                output.value = keybinds[action];
            });

            console.log("Config imported successfully");
        } catch (e) {
            console.error("Failed to import config:", e);
        }
    };
    reader.readAsText(file);
});