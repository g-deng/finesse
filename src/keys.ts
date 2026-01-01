import { userSequence } from "./main";

export type Action = "left" | "right" | "cw" | "ccw" | "180" | "softDrop" | "hardDrop";
export type ExtendedAction = Action | "dasLeft" | "dasRight";

const keyMap : Record<string, Action> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowDown: "softDrop",
  Space: "hardDrop",
  KeyA: "ccw",
  KeyD: "cw",
  KeyS: "180",
};

const unprocessedSequentials : Action[] = [];
const heldActions : Set<Action> = new Set();

const DAS = 150; // Delay Auto Shift in milliseconds
const ARR = 0.01;  // Auto Repeat Rate in milliseconds

let leftStart = -1; // timestamp of unconsumed left keydown
let leftDAS = false; // true if DAS has been passed
let rightStart = -1; // timestamp of unconsumed right keydown
let rightDAS = false; // true if DAS has been passed

document.addEventListener("keydown", (e) => {
  const action = keyMap[e.code];
  if (action === undefined) return;
  if (heldActions.has(action)) return; // already processed keydown
  heldActions.add(action);
  if (action === "left") {
    leftStart = performance.now();
    rightStart = -1;
    leftDAS = false;
    rightDAS = false;
  } else if (action === "right") {
    rightStart = performance.now();
    leftStart = -1;
    rightDAS = false;
  }
  unprocessedSequentials.push(action);
  console.log("Keydown:", e.code, "mapped to action:", action);
  e.preventDefault();
});

document.addEventListener("keyup", (e) => {
  const action = keyMap[e.code];
  if (action === undefined) return;
  heldActions.delete(action);
  if (action === "left") {
    leftStart = -1;
    leftDAS = false;
  } else if (action === "right") {
    rightStart = -1;
    rightDAS = false;
  }
});

export function consumeSequentials(): Action[] {
  const actions = [...unprocessedSequentials];
  userSequence.push(...actions);
  unprocessedSequentials.length = 0;
  return actions;
}

function popMostRecentAction(action: Action): boolean {
  for (let i = userSequence.length - 1; i >= 0; i--) {
    if (userSequence[i] === action) {
      userSequence.splice(i, 1);
      return true;
    }
  }
  return false;
}

export function consumeContinuous(): { action: Action, count: number } {
  const now = performance.now();
  let action: Action | null = null;
  let count = 0;

  if (leftStart !== -1) {
    action = "left";
    if (leftDAS) {
      count = Math.floor((now - leftStart) / ARR);
      leftStart += count * ARR;
    } else if (now - leftStart >= DAS) {
      leftDAS = true;
      count = Math.floor((now - leftStart - DAS) / ARR);
      leftStart += DAS + count * ARR;
      popMostRecentAction("left");
      userSequence.push("dasLeft");
    } 
  } else if (rightStart !== -1) {
    action = "right";
    if (rightDAS) {
      count = Math.floor((now - rightStart) / ARR);
      rightStart += count * ARR;
    } else if (now - rightStart >= DAS) {
      rightDAS = true;
      count = Math.floor((now - rightStart - DAS) / ARR);
      rightStart += DAS + count * ARR;
      popMostRecentAction("right");
      userSequence.push("dasRight");
    }
  }

  return { action: action!, count };
}