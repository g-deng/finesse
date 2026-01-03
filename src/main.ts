import "./graphics/style.css";
import { drawGrid } from "./graphics/grid.ts";
import { consumeSequentials, consumeContinuous, type Action, type ExtendedAction } from "./keys.ts";
import type { Target, NESWTarget, VHTarget } from "./types.ts";
import { Block } from "./graphics/blocks.ts";
import { getNextTarget, getRandomTarget, getSpawnBlock, isNESWBlock, isVHBlock, blockAtTarget, type FinesseTarget } from "./combos.ts";
import { drawTarget } from "./graphics/targets.ts";
import { createIcons, icons } from "lucide";
import { randomizeMode, showFinesseHint, showGhost } from "./settings.ts";

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


const dropInterval = 300;
let currentBlock: Block | null = null;
let currentTarget: Target | null = null;
let finesseSequence: ExtendedAction[] | null = null;
let lastTime = 0;
let accumulator = 0;
let currentStreak = 0;
let bestStreak = 0;
export const userSequence: ExtendedAction[] = [];


function processAction(block: Block, action: Action) {
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

function update(delta: number) {
  if (!currentBlock) {
    let result: FinesseTarget | null = null;
    if (randomizeMode) {
      result = getRandomTarget();
    } else {
      result = getNextTarget();
    }
    currentTarget = result?.target || null;
    finesseSequence = result?.moves || null;
    currentBlock = getSpawnBlock(currentTarget!.shape);
  }

  accumulator += delta;

  if (accumulator > dropInterval) {
    const drop = Math.floor(accumulator / dropInterval);
    accumulator = 0;
    if (currentBlock.getY() - drop < 1) {
      // drop
      // check if finesse was achieved
      if (blockAtTarget(currentBlock, currentTarget!) && userSequence.length === finesseSequence!.length + 1) {
        currentBlock = null;
        currentTarget = null;
        finesseSequence = null;
        currentStreak += 1;
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
        }
      } else {
        currentBlock = getSpawnBlock(currentTarget!.shape);
        currentStreak = 0;
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

  if (showFinesseHint) {
    const hintMarkup = currentBlock && currentTarget
      ? toIconHtml([...(finesseSequence ?? []), "harddrop"])
      : "";
    setIcons(document.getElementById("finesse-hint")!, "finesse hint: ", hintMarkup, { v: lastHintMarkup });
  } else {
    setIcons(document.getElementById("finesse-hint")!, "finesse hint: ", `<i data-lucide="book-heart" class="action-icon"></i>`, { v: lastHintMarkup });
  }

  const userMarkup =
    userSequence.length > 5
      ? `${toIconHtml(userSequence.slice(0, 2))}<span class="action-ellipsis"> … </span>${toIconHtml(userSequence.slice(-3))}`
      : userSequence.length > 0
        ? toIconHtml(userSequence)
        : "";
  setIcons(document.getElementById("user-sequence")!, "your sequence: ", userMarkup, { v: lastUserMarkup });


  const streakElem = document.getElementById("streak")!;
  streakElem.textContent = `current streak: ${currentStreak}`;

  const bestStreakElem = document.getElementById("best-streak")!;
  bestStreakElem.textContent = `best streak: ${bestStreak}`;


  drawGrid();
  if (currentBlock) {
    currentBlock.drawBlock();
    if (showGhost) {
      currentBlock.drawGhost();
    }
  }

  if (currentTarget) {
    if (isVHBlock(currentTarget)) {
      currentTarget = currentTarget as VHTarget;
      drawTarget(currentTarget.shape, currentTarget.x, currentTarget.ori);
    } else if (isNESWBlock(currentTarget)) {
      currentTarget = currentTarget as NESWTarget;
      drawTarget(currentTarget.shape, currentTarget.x, currentTarget.dir);
    } else {
      drawTarget(currentTarget.shape, currentTarget.x);
    }
  }
}

function loop(timestamp: number) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;
  // console.log(delta);
  update(delta);
  render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);