import './style.css'
import { drawGrid } from './grid.ts'
import { drawBlock } from './blocks.ts';

const dropInterval = 500;
let dropY = 19;
let lastTime = 0;
let accumulator = 0;

function update(delta: number) {
  accumulator += delta;

  if (accumulator > dropInterval) {
    dropY--;
    accumulator = 0;

    if (dropY < 1) {
      dropY = 19;
    }
  }
}

function loop(timestamp: number) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  update(delta);
  drawGrid();
  drawBlock("Z", 4, dropY, "H");
  drawBlock("I", 1, 17, "V");
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

