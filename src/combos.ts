import { type NESWTarget, type Shape, type Target, type VHTarget } from "./types.js";
import { type ExtendedAction } from "./keys.js";
import { IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, ZBlock, type Block } from "./graphics/blocks.js";

export type FinesseTarget = { target: Target; moves: ExtendedAction[] };

const targets : FinesseTarget[] = [];

// O block
targets.push({ target: { shape: "O", x: 1 }, moves: ["dasLeft"] });
targets.push({ target: { shape: "O", x: 2 }, moves: ["dasLeft", "right"] });
targets.push({ target: { shape: "O", x: 3 }, moves: ["left", "left"] });
targets.push({ target: { shape: "O", x: 4 }, moves: ["left"] });
targets.push({ target: { shape: "O", x: 5 }, moves: [] });
targets.push({ target: { shape: "O", x: 6 }, moves: ["right"] });
targets.push({ target: { shape: "O", x: 7 }, moves: ["right", "right"] });
targets.push({ target: { shape: "O", x: 8 }, moves: ["dasRight", "left"] });
targets.push({ target: { shape: "O", x: 9 }, moves: ["dasRight"] });

// I block horizontal
targets.push({ target: { shape: "I", ori: "H", x: 1 }, moves: ["dasLeft"] });
targets.push({ target: { shape: "I", ori: "H", x: 2 }, moves: ["left", "left"] });
targets.push({ target: { shape: "I", ori: "H", x: 3 }, moves: ["left"] });
targets.push({ target: { shape: "I", ori: "H", x: 4 }, moves: [] });
targets.push({ target: { shape: "I", ori: "H", x: 5 }, moves: ["right"] });
targets.push({ target: { shape: "I", ori: "H", x: 6 }, moves: ["right", "right"] });
targets.push({ target: { shape: "I", ori: "H", x: 7 }, moves: ["dasRight"] });

// I block vertical
targets.push({ target: { shape: "I", ori: "V", x: 1 }, moves: ["ccw", "dasLeft"] });
targets.push({ target: { shape: "I", ori: "V", x: 2 }, moves: ["dasLeft", "ccw"] });
targets.push({ target: { shape: "I", ori: "V", x: 3 }, moves: ["dasLeft", "cw"] });
targets.push({ target: { shape: "I", ori: "V", x: 4 }, moves: ["ccw", "left"] });
targets.push({ target: { shape: "I", ori: "V", x: 5 }, moves: ["ccw"] });
targets.push({ target: { shape: "I", ori: "V", x: 6 }, moves: ["cw"] });
targets.push({ target: { shape: "I", ori: "V", x: 7 }, moves: ["cw", "right"] });
targets.push({ target: { shape: "I", ori: "V", x: 8 }, moves: ["dasRight", "ccw"] });
targets.push({ target: { shape: "I", ori: "V", x: 9 }, moves: ["dasRight", "cw"] });
targets.push({ target: { shape: "I", ori: "V", x: 10 }, moves: ["cw", "dasRight"] });

// S, Z blocks
for (const shape of ["S", "Z"] as const) {
    // vertical
    targets.push({ target: { shape, ori: "V", x: 1 }, moves: ["dasLeft", "ccw"] });
    targets.push({ target: { shape, ori: "V", x: 2 }, moves: ["dasLeft", "cw"] });
    targets.push({ target: { shape, ori: "V", x: 3 }, moves: ["ccw", "left"] });
    targets.push({ target: { shape, ori: "V", x: 4 }, moves: ["ccw"] });
    targets.push({ target: { shape, ori: "V", x: 5 }, moves: ["cw"] });
    targets.push({ target: { shape, ori: "V", x: 6 }, moves: ["cw", "right"] });
    targets.push({ target: { shape, ori: "V", x: 7 }, moves: ["cw", "right", "right"] });
    targets.push({ target: { shape, ori: "V", x: 8 }, moves: ["dasRight", "ccw"] });
    targets.push({ target: { shape, ori: "V", x: 9 }, moves: ["dasRight", "cw"] });

    // horizontal
    targets.push({ target: { shape, ori: "H", x: 1 }, moves: ["dasLeft"] });
    targets.push({ target: { shape, ori: "H", x: 2 }, moves: ["left", "left"] });
    targets.push({ target: { shape, ori: "H", x: 3 }, moves: ["left"] });
    targets.push({ target: { shape, ori: "H", x: 4 }, moves: [] });
    targets.push({ target: { shape, ori: "H", x: 5 }, moves: ["right"] });
    targets.push({ target: { shape, ori: "H", x: 6 }, moves: ["right", "right"] });
    targets.push({ target: { shape, ori: "H", x: 7 }, moves: ["dasRight", "left"] });
    targets.push({ target: { shape, ori: "H", x: 8 }, moves: ["dasRight"] });
}

// T, L, J blocks

for (const shape of ["T", "L", "J"] as const) {
    // north
    targets.push({ target: { shape, dir: "N", x: 1 }, moves: ["dasLeft"] });
    targets.push({ target: { shape, dir: "N", x: 2 }, moves: ["left", "left"] });
    targets.push({ target: { shape, dir: "N", x: 3 }, moves: ["left"] });
    targets.push({ target: { shape, dir: "N", x: 4 }, moves: [] });
    targets.push({ target: { shape, dir: "N", x: 5 }, moves: ["right"] });
    targets.push({ target: { shape, dir: "N", x: 6 }, moves: ["right", "right"] });
    targets.push({ target: { shape, dir: "N", x: 7 }, moves: ["dasRight", "left"] });
    targets.push({ target: { shape, dir: "N", x: 8 }, moves: ["dasRight"] });

    // west
    targets.push({ target: { shape, dir: "W", x: 1 }, moves: ["dasLeft", "ccw"] });
    targets.push({ target: { shape, dir: "W", x: 2 }, moves: ["left", "left", "ccw"] });
    targets.push({ target: { shape, dir: "W", x: 3 }, moves: ["left", "ccw"] });
    targets.push({ target: { shape, dir: "W", x: 4 }, moves: ["ccw"] });
    targets.push({ target: { shape, dir: "W", x: 5 }, moves: ["right", "ccw"] });
    targets.push({ target: { shape, dir: "W", x: 6 }, moves: ["right", "right", "ccw"] });
    targets.push({ target: { shape, dir: "W", x: 7 }, moves: ["dasRight", "left", "ccw"] });
    targets.push({ target: { shape, dir: "W", x: 8 }, moves: ["dasRight", "ccw"] });
    targets.push({ target: { shape, dir: "W", x: 9 }, moves: ["ccw", "dasRight"] });

    // south
    targets.push({ target: { shape, dir: "S", x: 1 }, moves: ["dasLeft", "180"] });
    targets.push({ target: { shape, dir: "S", x: 2 }, moves: ["left", "left", "180"] });
    targets.push({ target: { shape, dir: "S", x: 3 }, moves: ["left", "180"] });
    targets.push({ target: { shape, dir: "S", x: 4 }, moves: ["180"] });
    targets.push({ target: { shape, dir: "S", x: 5 }, moves: ["right", "180"] });
    targets.push({ target: { shape, dir: "S", x: 6 }, moves: ["right", "right", "180"] });
    targets.push({ target: { shape, dir: "S", x: 7 }, moves: ["dasRight", "left", "180"] });
    targets.push({ target: { shape, dir: "S", x: 8 }, moves: ["dasRight", "180"] });

    // east
    targets.push({ target: { shape, dir: "E", x: 1 }, moves: ["cw", "dasLeft"] });
    targets.push({ target: { shape, dir: "E", x: 2 }, moves: ["dasLeft", "cw"] });
    targets.push({ target: { shape, dir: "E", x: 3 }, moves: ["left", "left", "cw"] });
    targets.push({ target: { shape, dir: "E", x: 4 }, moves: ["left", "cw"] });
    targets.push({ target: { shape, dir: "E", x: 5 }, moves: ["cw"] });
    targets.push({ target: { shape, dir: "E", x: 6 }, moves: ["right", "cw"] });
    targets.push({ target: { shape, dir: "E", x: 7 }, moves: ["right", "right", "cw"] });
    targets.push({ target: { shape, dir: "E", x: 8 }, moves: ["dasRight", "left", "cw"] });
    targets.push({ target: { shape, dir: "E", x: 9 }, moves: ["dasRight", "cw"] });

}

targets.sort((a: FinesseTarget, b: FinesseTarget) => a.target.shape.localeCompare(b.target.shape));


function isVHBlock(block: Target) {
  return block.shape === "I" || block.shape === "S" || block.shape === "Z";
}

function isNESWBlock(block: Target) {
  return block.shape === "T" || block.shape === "J" || block.shape === "L";
}

function blockAtTarget(block: Block, target: Target): boolean {
  if (isVHBlock(target)) {
    target = target as VHTarget;
    const direction = block.getDirection();
    switch (target.ori) {
      case "H":
        if (direction !== "N" && direction !== "S") return false;
        break;
      case "V":
        if (direction !== "E" && direction !== "W") return false;
        break;
    }
    if (block.getX() !== target.x) return false;
    return true;
  } else if (isNESWBlock(target)) {
    target = target as NESWTarget;
    const direction = block.getDirection();
    if (direction !== target.dir) return false;
    if (block.getX() !== target.x) return false;
    return true;
  } else {
    // O block
    if (block.getX() !== target.x) return false;
    return true;
  }
}

function createBlockFromTarget(target: Target): Block {
  switch (target.shape) {
    case "I":
      return new IBlock(target.x, 1, target.ori === "H" ? "N" : "E");
    case "O":
      return new OBlock(target.x, 1);
    case "T":
      return new TBlock(target.x, 1, target.dir);
    case "S":
      return new SBlock(target.x, 1, target.ori === "H" ? "N" : "E");
    case "Z":
      return new ZBlock(target.x, 1, target.ori === "H" ? "N" : "E");
    case "J":
      return new JBlock(target.x, 1, target.dir);
    case "L":
      return new LBlock(target.x, 1, target.dir);
    default:
      return new IBlock();
  }
}

function getSpawnBlock(shape: string): Block {
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
      return new IBlock();
  }
}

const activeTargets : FinesseTarget[] = targets.slice();

var x = -1;

function resetTargetIndex(): void {
  x = -1;
}

function filterActiveTargets(shapes: Shape[]): void {
  activeTargets.length = 0;
  for (const target of targets) {
    if (shapes.indexOf(target.target.shape) !== -1) {
      activeTargets.push(target);
    }
  }
  x = -1;
}

function getNextTarget(): FinesseTarget | null {
  if (activeTargets.length === 0) return null;
  x = (x + 1) % activeTargets.length;
  return activeTargets[x];
}

function getTargetProgress(): string {
  return `${x + 1} / ${activeTargets.length}`;
}

function getRandomTarget(): FinesseTarget | null {
  const randomIndex = Math.floor(Math.random() * activeTargets.length);
  return activeTargets[randomIndex];
}

export { targets, isVHBlock, isNESWBlock, filterActiveTargets, getNextTarget, getRandomTarget, getSpawnBlock, blockAtTarget, resetTargetIndex, getTargetProgress, createBlockFromTarget };
