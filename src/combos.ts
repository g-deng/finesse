import type { Block } from "./types";

const targets: Block[] = [];
for (let i = 1; i <= 10; i++) {
  targets.push({shape: "I", ori: "V", x: i, spawnY: 17});
}
for (let i = 1; i <= 9; i++) {
  targets.push({shape: "O", x: i, spawnY: 19});
  targets.push({shape: "T", dir: "E", x: i, spawnY: 18});
  targets.push({shape: "T", dir: "W", x: i, spawnY: 18});
  targets.push({shape: "J", dir: "N", x: i, spawnY: 18});
  targets.push({shape: "J", dir: "S", x: i, spawnY: 18});
  targets.push({shape: "L", dir: "N", x: i, spawnY: 18});
  targets.push({shape: "L", dir: "S", x: i, spawnY: 18});
  targets.push({shape: "S", ori: "V", x: i, spawnY: 18});
  targets.push({shape: "Z", ori: "V", x: i, spawnY: 18});
}
for (let i = 1; i <= 8; i++) {
  targets.push({shape: "T", dir: "N", x: i, spawnY: 19});
  targets.push({shape: "T", dir: "S", x: i, spawnY: 19});
  targets.push({shape: "J", dir: "E", x: i, spawnY: 19});
  targets.push({shape: "J", dir: "W", x: i, spawnY: 19});
  targets.push({shape: "L", dir: "E", x: i, spawnY: 19});
  targets.push({shape: "L", dir: "W", x: i, spawnY: 19});
  targets.push({shape: "S", ori: "H", x: i, spawnY: 19});
  targets.push({shape: "Z", ori: "H", x: i, spawnY: 19});
}
for (let i = 1; i <= 7; i++) {
  targets.push({shape: "I", ori: "H", x: i, spawnY: 20});
}

export { targets };