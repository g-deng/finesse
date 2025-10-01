import { palette } from "./colors";

export function drawGrid() {
  const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cols = 10;
  const rows = 20;
  const blockSize = 30;
  ctx.strokeStyle = palette.grid;
  ctx.lineWidth = 1;

  for (let c = 0; c <= cols; c++) {
    const x = c * blockSize;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let r = 0; r <= rows; r++) {
    const y = r * blockSize;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}
