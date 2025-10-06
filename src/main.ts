import "./graphics/style.css";
import { drawGrid } from "./graphics/grid.ts";
import { drawBlock } from "./graphics/blocks.ts";
import { consumePressedActions, type Action } from "./keys.ts";
import type { Block, NESWBlock, VHBlock } from "./types.ts";
import { getNewTarget, getSpawnBlock, isNESWBlock, isVHBlock } from "./combos.ts";
import { drawTarget } from "./graphics/targets.ts";

const dropInterval = 500;
let currentBlock: Block | null = null;
let currentTarget: Block | null = null;
let dropY = 19;
let lastTime = 0;
let accumulator = 0;

function processAction(block: Block, action: Action) {
  switch (action) {
    case "left":
      if (block.x > 1) block.x--;
      break;
    case "right":
      if (block.x < block.limX!) block.x++;
      break;
    case "softDrop":
      if (dropY > 1) dropY--;
      break;
    case "hardDrop":
      dropY = 1;
      break;
    case "cw":
      if (block.shape === "O") return;
      if (isVHBlock(block)) {
        block = block as VHBlock;
        block.ori = block.ori === "H" ? "V" : "H";
      } else {
        block = block as NESWBlock;
        const dirOrder: ("N" | "E" | "S" | "W")[] = ["N", "E", "S", "W"];
        const idx = dirOrder.indexOf(block.dir!);
        block.dir = dirOrder[(idx + 1) % 4];
      }
      break;
    case "ccw":
      if (block.shape === "O") return;
      if (isVHBlock(block)) {
        block = block as VHBlock;
        block.ori = block.ori === "H" ? "V" : "H";
      } else {
        block = block as NESWBlock;
        const dirOrder: ("N" | "E" | "S" | "W")[] = ["N", "E", "S", "W"];
        const idx = dirOrder.indexOf(block.dir!);
        block.dir = dirOrder[(idx - 1 + 4) % 4];
      }
      break;
    case "180":
      if (block.shape === "O") return;
      if (isNESWBlock(block)) {
        block = block as NESWBlock;
        const dirOrder: ("N" | "E" | "S" | "W")[] = ["N", "E", "S", "W"];
        const idx = dirOrder.indexOf(block.dir!);
        block.dir = dirOrder[(idx + 2) % 4];
      }
      break;
  }
}

function update(delta: number) {
  accumulator += delta;

  if (accumulator > dropInterval) {
    dropY--;
    accumulator = 0;

    if (dropY < 1) {
      dropY = 19;
      currentBlock = null;
      currentTarget = null;
    }
  }

  for (const action of consumePressedActions()) {
    if (currentBlock) {
      processAction(currentBlock, action);
    }
  }

  if (!currentTarget) {
    currentTarget = getNewTarget();
    currentBlock = getSpawnBlock(currentTarget!.shape);
    dropY = currentBlock!.spawnY!;
    console.log("target set:", currentTarget);
    console.log("block set:", currentBlock);
  }
}

function render() {
  const blocktext = document.getElementById("block-text")!;
  if (currentTarget) {
    if (isVHBlock(currentTarget)) {
      currentTarget = currentTarget as VHBlock;
      blocktext.textContent = `target: ${currentTarget.shape} ${currentTarget.ori} @ x=${currentTarget.x}`;
    } else if (isNESWBlock(currentTarget)) {
      currentTarget = currentTarget as NESWBlock;
      blocktext.textContent = `target: ${currentTarget.shape} ${currentTarget.dir} @ x=${currentTarget.x}`;
    }
  } else {
    blocktext.textContent = "target: none";
  }
  drawGrid();
  if (currentBlock) {
    if (isVHBlock(currentBlock)) {
      currentBlock = currentBlock as VHBlock;
      drawBlock(currentBlock.shape, currentBlock.x, dropY, currentBlock.ori);
    } else if (isNESWBlock(currentBlock)) {
      currentBlock = currentBlock as NESWBlock;
      drawBlock(currentBlock.shape, currentBlock.x, dropY, currentBlock.dir);
    } else {
      drawBlock(currentBlock.shape, currentBlock.x, dropY);
    }
  }
  if (currentTarget) {
    if (isVHBlock(currentTarget)) {
      currentTarget = currentTarget as VHBlock;
      drawTarget(currentTarget.shape, currentTarget.x, currentTarget.ori);
    } else if (isNESWBlock(currentTarget)) {
      currentTarget = currentTarget as NESWBlock;
      drawTarget(currentTarget.shape, currentTarget.x, currentTarget.dir);
    } else {
      drawTarget(currentTarget.shape, currentTarget.x);
    }
  }
}

function loop(timestamp: number) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  update(delta);
  render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
