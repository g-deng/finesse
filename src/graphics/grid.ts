import { palette } from "./colors";
import { showGridLines, showGridNumbers } from "../settings";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const ctx = canvas.getContext("2d")!;
ctx.translate(2, 2); // to account for border

export function drawGrid() {
  ctx.fillStyle = palette.bg;
  ctx.fillRect(-2, -2, canvas.width + 4, canvas.height + 4);

  const cols = 10;
  const rows = 20;
  const blockSize = 30;
  ctx.strokeStyle = palette.grid;
  ctx.lineWidth = 1;

  for (let c = 0; c <= cols; c++) {
    const x = c * blockSize;
    // draw column number
    if (showGridNumbers) {
      ctx.fillStyle = palette.grid;
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText((c + 1).toString(), x + blockSize / 2, canvas.height - 5);
    }
    if (!showGridLines) continue;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height - 4);
    ctx.stroke();
  }

  for (let r = 0; r <= rows; r++) {
    const y = r * blockSize;

    // draw row number
    if (showGridNumbers) {
    ctx.fillStyle = palette.grid;
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText((rows - r).toString(), blockSize / 2, y + blockSize - 5);
    }

    if (!showGridLines) continue;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width - 4, y);
    ctx.stroke();
  }
}

// Shades over the game screen and shows "paused"
export function drawPauseScreen() {
  const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
}