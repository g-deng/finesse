import "./graphics/style.css";
import { drawGrid } from "./graphics/grid.ts";
import { consumeSequentials, consumeContinuous, type Action } from "./keys.ts";
import type { Target, NESWTarget, VHTarget } from "./types.ts";
import { Block } from "./graphics/blocks.ts";
import { getNewTarget, getSpawnBlock, isNESWBlock, isVHBlock } from "./combos.ts";
import { drawTarget } from "./graphics/targets.ts";

const dropInterval = 300;
let currentBlock: Block | null = null;
let currentTarget: Target | null = null;
let lastTime = 0;
let accumulator = 0;

function processAction(block: Block, action: Action) {
  switch (action) {
    case "left":
      block.moveLeft();
      break;
    case "right":
      block.moveRight();
      break;
    case "softDrop":
      block.setY(1);
      break;
    case "hardDrop":
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
    currentTarget = getNewTarget();
    currentBlock = getSpawnBlock(currentTarget!.shape);
    console.log("target set:", currentTarget);
    console.log("block set:", currentBlock);
  }
  
  accumulator += delta;

  if (accumulator > dropInterval) {
    const drop = Math.floor(accumulator / dropInterval);
    accumulator = 0;
    if (currentBlock.getY() - drop < 1) {
      currentBlock = null;
      currentTarget = null;
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

function render() {
  const blocktext = document.getElementById("block-text")!;
  if (currentTarget) {
    if (isVHBlock(currentTarget)) {
      currentTarget = currentTarget as VHTarget;
      blocktext.textContent = `target: ${currentTarget.shape} ${currentTarget.ori} @ x=${currentTarget.x}`;
    } else if (isNESWBlock(currentTarget)) {
      currentTarget = currentTarget as NESWTarget;
      blocktext.textContent = `target: ${currentTarget.shape} ${currentTarget.dir} @ x=${currentTarget.x}`;
    } else {
      blocktext.textContent = `target: ${currentTarget.shape} @ x=${currentTarget.x}`;
    }
  } else {
    blocktext.textContent = "target: none";
  }
  drawGrid();
  if (currentBlock) currentBlock.draw();
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