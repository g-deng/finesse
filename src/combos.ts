import type { Block } from "./types";

const targets: Block[] = [];
for (let i = 1; i <= 10; i++) {
  targets.push({ shape: "I", ori: "V", x: i, limX: 10, spawnY: 17 });
}
for (let i = 1; i <= 9; i++) {
  targets.push({ shape: "O", x: i, spawnY: 19 });
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

targets.sort((a: Block, b: Block) => a.shape.localeCompare(b.shape));

function isVHBlock(block: Block) {
  return block.shape === "I" || block.shape === "S" || block.shape === "Z";
}

function isNESWBlock(block: Block) {
  return block.shape === "T" || block.shape === "J" || block.shape === "L";
}

function getSpawnBlock(shape: string): Block | null {
  switch (shape) {
    case "I":
      return { shape: "I", ori: "H", x: 4, limX: 10, spawnY: 17 } as Block;
    case "O":
      return { shape: "O", x: 5, spawnY: 19 } as Block;
    case "T":
      return { shape: "T", dir: "N", x: 4, limX: 9, spawnY: 18 } as Block;
    case "S":
      return { shape: "S", ori: "H", x: 4, limX: 9, spawnY: 18 } as Block;
    case "Z":
      return { shape: "Z", ori: "H", x: 4, limX: 9, spawnY: 18 } as Block;
    case "J":
      return { shape: "J", dir: "E", x: 4, limX: 9, spawnY: 18 } as Block;
    case "L":
      return { shape: "L", dir: "W", x: 4, limX: 9, spawnY: 18 } as Block;
    default:
      return null;
  }
}

var x = -1;
function getNewTarget(): Block | null {
  if (targets.length === 0) return null;
  // const randomIndex = Math.floor(Math.random() * targets.length);
  x = (x + 1) % targets.length;
  return targets[x];
  // return { ...targets[randomIndex] };
}

export { targets, isVHBlock, isNESWBlock, getNewTarget, getSpawnBlock };
