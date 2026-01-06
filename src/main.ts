import "./graphics/style.css";
import { drawGrid, drawPauseScreen } from "./graphics/grid.ts";
import { consumeSequentials, consumeContinuous, setupKeyListeners, removeKeyListeners, type Action, type ExtendedAction } from "./keys.ts";
import type { Target, NESWTarget, VHTarget } from "./types.ts";
import { Block } from "./graphics/blocks.ts";
import { getNextTarget, getRandomTarget, getSpawnBlock, isNESWBlock, isVHBlock, blockAtTarget, type FinesseTarget, resetTargetIndex, getTargetProgress, createBlockFromTarget } from "./combos.ts";
import { createIcons, icons } from "lucide";
import { randomizeMode, showFinesseHint, showGhost, shadeTarget, dropInterval } from "./settings.ts";

const actionIcon: Record<ExtendedAction, string> = {
  left: "arrow-left",
  right: "arrow-right",
  harddrop: "arrow-down-to-line",
  cw: "rotate-cw",
  ccw: "rotate-ccw",
  "180": "circle",
  dasLeft: "chevrons-left",
  dasRight: "chevrons-right",
};

const toIconHtml = (actions: ExtendedAction[]) =>
  actions
    .map((a) => `<i data-lucide="${actionIcon[a]}" class="action-icon" aria-label="${a}"></i>`)
    .join(" ");


let currentBlock: Block | null = null;
let currentTargetBlock: Block | null = null;
let currentTarget: Target | null = null;
let isRedo = false;
let finesseSequence: ExtendedAction[] | null = null;
let lastTime = 0;
let accumulator = 0;
let currentStreak = 0;
let bestStreak = 0;
export const userSequence: ExtendedAction[] = [];


function processAction(block: Block, action: Action) {
  if (!block) return;
  switch (action) {
    case "left":
      block.moveLeft();
      break;
    case "right":
      block.moveRight();
      break;
    case "harddrop":
      block.setY(1);
      break;
    case "cw":
      block.rotateCW();
      break;
    case "ccw":
      block.rotateCCW();
      break;
    case "180":
      block.rotate180();
      break;
  }
}

export function nextBlock() {
  currentBlock = null;
  currentTarget = null;
  finesseSequence = null;
  accumulator = 0;
}

function update(delta: number) {
  if (!currentBlock) {
    let result: FinesseTarget | null = null;
    if (randomizeMode) {
      result = getRandomTarget();
    } else {
      result = getNextTarget();
    }
    currentTarget = result?.target || null;
    currentTargetBlock = createBlockFromTarget(currentTarget!);
    finesseSequence = result?.moves || null;
    currentBlock = getSpawnBlock(currentTarget!.shape);
  }

  accumulator += delta;
  const drop = dropInterval > 1000 ? 0 : Math.floor(accumulator / dropInterval);

  if (dropInterval > 1000 || accumulator > dropInterval) {
    accumulator -= drop * dropInterval;
    if (currentBlock.getY() - drop <= 1) {
      // drop
      // check if finesse was achieved
      if (blockAtTarget(currentBlock, currentTarget!) && userSequence.length === finesseSequence!.length + 1) {
        nextBlock();
        currentStreak += 1;
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
        }
        isRedo = false;
      } else {
        currentBlock = getSpawnBlock(currentTarget!.shape);
        currentStreak = 0;
        isRedo = true;
      }
      userSequence.length = 0;
    } else {
      currentBlock!.setY(currentBlock!.getY() - drop);
    }
  }

  for (const action of consumeSequentials()) {
    processAction(currentBlock!, action);
  }

  const { action, count } = consumeContinuous();
  for (let i = 0; i < count; i++) {
    processAction(currentBlock!, action);
  }
}

let lastUserMarkup = "";
let lastHintMarkup = "";

function setIcons(elem: HTMLElement, label: string, markup: string, last: { v: string }) {
  if (markup === last.v) return;
  last.v = markup;
  elem.innerHTML = label + (markup || "none");
  createIcons({ icons, nameAttr: "data-lucide" });
}


function render() {
  const blockTextElem = document.getElementById("block-text")!;
  if (currentTarget) {
    if (isVHBlock(currentTarget)) {
      currentTarget = currentTarget as VHTarget;
      blockTextElem.textContent = `target: ${currentTarget.shape} ${currentTarget.ori} @ x=${currentTarget.x}`;
    } else if (isNESWBlock(currentTarget)) {
      currentTarget = currentTarget as NESWTarget;
      blockTextElem.textContent = `target: ${currentTarget.shape} ${currentTarget.dir} @ x=${currentTarget.x}`;
    } else {
      blockTextElem.textContent = `target: ${currentTarget.shape} @ x=${currentTarget.x}`;
    }
  } else {
    blockTextElem.textContent = "target: none";
  }

  if (isRedo) {
    blockTextElem.textContent += " (redo)";
    blockTextElem.style.color = "light-dark(lightcoral, lightpink)";
  } else {
    blockTextElem.style.color = "inherit";
  }

  const targetProgressElem = document.getElementById("target-progress")!;
  targetProgressElem.textContent = "progress: ";

  if (randomizeMode) {
    targetProgressElem.textContent += " [random]";
  } else {
    targetProgressElem.textContent += getTargetProgress();
  }

  if (finesseSequence) {
    if (showFinesseHint) {
      const hintMarkup = currentBlock && currentTarget
        ? toIconHtml([...(finesseSequence ?? []), "harddrop"])
        : "";
      setIcons(document.getElementById("finesse-hint")!, "finesse hint: ", hintMarkup, { v: lastHintMarkup });
    } else {
      setIcons(document.getElementById("finesse-hint")!, "finesse hint: ", `<i data-lucide="book-heart" class="action-icon"></i>`, { v: lastHintMarkup });
    }
  } else {
    document.getElementById("finesse-hint")!.textContent = "finesse hint: none";
  }

  if (userSequence && userSequence.length > 0) {
    const userMarkup =
      userSequence.length > 5
        ? `${toIconHtml(userSequence.slice(0, 2))}<span class="action-ellipsis"> … </span>${toIconHtml(userSequence.slice(-3))}`
        : userSequence.length > 0
          ? toIconHtml(userSequence)
          : "";
    setIcons(document.getElementById("user-sequence")!, "your sequence: ", userMarkup, { v: lastUserMarkup });
  } else {
    document.getElementById("user-sequence")!.textContent = "your sequence: none";
  }


  const streakElem = document.getElementById("streak")!;
  streakElem.textContent = `current streak: ${currentStreak}`;

  const bestStreakElem = document.getElementById("best-streak")!;
  bestStreakElem.textContent = `best streak: ${bestStreak}`;


  drawGrid();
  if (currentBlock) {
    if (showGhost) {
      currentBlock.drawGhost();
    }
    currentBlock.drawBlock();
  }

  if (currentTarget) {
    if (shadeTarget) currentTargetBlock!.drawBlock(0.5);
    currentTargetBlock!.drawOutline();
  }
}

function loop(timestamp: number) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;
  // console.log(delta);
  update(delta);
  render();
  if (!isPaused) {
    requestAnimationFrame(loop);
  } else {
    drawPauseScreen();
  }
}

const startButton = document.getElementById("start-button")!;
const pauseButton = document.getElementById("pause-button")!;
const restartButton = document.getElementById("restart-button")!;

let isPaused = true;

export function pauseGame() {
  if (isPaused) return;
  isPaused = true;
  removeKeyListeners();
  drawPauseScreen();
}

function startGame() {
  if (!isPaused) return;
  isPaused = false;
  setupKeyListeners();
  lastTime = performance.now();
  requestAnimationFrame(loop);
}

startButton.addEventListener("click", startGame);

pauseButton.addEventListener("click", pauseGame);

restartButton.addEventListener("click", () => {
  currentBlock = null;
  currentTarget = null;
  finesseSequence = null;
  userSequence.length = 0;
  currentStreak = 0;
  accumulator = 0;
  resetTargetIndex();
  if (isPaused) {
    isPaused = false;
    setupKeyListeners();
    lastTime = performance.now();
    requestAnimationFrame(loop);
  }
});

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
canvas.addEventListener("click", () => {
  if (isPaused) {
    startGame();
  } else {
    pauseGame();
  }
});


requestAnimationFrame(loop);