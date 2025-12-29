import type { Target } from "./types";
import { Block, IBlock, OBlock, TBlock, ZBlock, SBlock, JBlock, LBlock } from "./graphics/blocks";

const targets: Target[] = [];
for (let i = 1; i <= 10; i++) {
  targets.push({ shape: "I", ori: "V", x: i, limX: 10, spawnY: 17 });
}
for (let i = 1; i <= 9; i++) {
  targets.push({ shape: "O", x: i, limX: 9, spawnY: 19 });
  targets.push({ shape: "T", dir: "E", x: i, limX: 9, spawnY: 18 });
  targets.push({ shape: "T", dir: "W", x: i, limX: 9, spawnY: 18 });
  targets.push({ shape: "J", dir: "N", x: i, limX: 9, spawnY: 18 });
  targets.push({ shape: "J", dir: "S", x: i, limX: 9, spawnY: 18 });
  targets.push({ shape: "L", dir: "N", x: i, limX: 9, spawnY: 18 });
  targets.push({ shape: "L", dir: "S", x: i, limX: 9, spawnY: 18 });
  targets.push({ shape: "S", ori: "V", x: i, limX: 9, spawnY: 18 });
  targets.push({ shape: "Z", ori: "V", x: i, limX: 9, spawnY: 18 });
}
for (let i = 1; i <= 8; i++) {
  targets.push({ shape: "T", dir: "N", x: i, limX: 8, spawnY: 19 });
  targets.push({ shape: "T", dir: "S", x: i, limX: 8, spawnY: 19 });
  targets.push({ shape: "J", dir: "E", x: i, limX: 8, spawnY: 19 });
  targets.push({ shape: "J", dir: "W", x: i, limX: 8, spawnY: 19 });
  targets.push({ shape: "L", dir: "E", x: i, limX: 8, spawnY: 19 });
  targets.push({ shape: "L", dir: "W", x: i, limX: 8, spawnY: 19 });
  targets.push({ shape: "S", ori: "H", x: i, limX: 8, spawnY: 19 });
  targets.push({ shape: "Z", ori: "H", x: i, limX: 8, spawnY: 19 });
}
for (let i = 1; i <= 7; i++) {
  targets.push({ shape: "I", ori: "H", x: i, limX: 7, spawnY: 20 });
}

targets.sort((a: Target, b: Target) => a.shape.localeCompare(b.shape));

function isVHBlock(block: Target) {
  return block.shape === "I" || block.shape === "S" || block.shape === "Z";
}

function isNESWBlock(block: Target) {
  return block.shape === "T" || block.shape === "J" || block.shape === "L";
}

function getSpawnBlock(shape: string): Block | null {
  switch (shape) {
    case "I":
      return new IBlock();
    case "O":
      return new OBlock();
    case "T":
      return new TBlock();
    case "S":
      return new SBlock();
    case "Z":
      return new ZBlock();
    case "J":
      return new JBlock();
    case "L":
      return new LBlock();
    default:
      return null;
  }
}

// var x = -1;
function getNewTarget(): Target | null {
  if (targets.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * targets.length);
  // x = (x + 1) % targets.length;
  // return targets[x];
  return { ...targets[randomIndex] };
}

export { targets, isVHBlock, isNESWBlock, getNewTarget, getSpawnBlock };
