import { palette } from "./colors";
import type { Shape, Direction, Orientation } from "./types";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const ctx = canvas.getContext("2d")!;
const grid = 30;

export function drawBlock(shape: Shape, x: number, y: number, dirOrOri?: Direction | Orientation) {
  switch (shape) {
    case "O":
      ctx.fillStyle = palette.O;
      draw_o(x, y);
      break;
    case "T":
      ctx.fillStyle = palette.T;
      draw_t(x, y, dirOrOri as Direction);
      break;
    case "J":
      ctx.fillStyle = palette.J;
      draw_j(x, y, dirOrOri as Direction);
      break;
    case "L":
      ctx.fillStyle = palette.L;
      draw_l(x, y, dirOrOri as Direction);
      break;
    case "I":
      ctx.fillStyle = palette.I;
      draw_i(x, y, dirOrOri as Orientation);
      break;
    case "S":
      ctx.fillStyle = palette.S;
      draw_s(x, y, dirOrOri as Orientation);
      break;
    case "Z":
      ctx.fillStyle = palette.Z;
      draw_z(x, y, dirOrOri as Orientation);
      break;
  }
}

export function drawGhost(shape: Shape, x: number, y: number, dirOrOri?: Direction | Orientation) {
  ctx.globalAlpha = 0.3;
  drawBlock(shape, x, y, dirOrOri);
  ctx.globalAlpha = 1.0;
}

function draw_o(x: number, y: number) {
  ctx.fillRect((x - 1) * grid, (20 - y - 1) * grid, 2*grid, 2*grid);
}

function draw_t(x: number, y: number, dir: Direction) {
  switch (dir) {
    case "N":
      ctx.fillRect((x - 1) * grid, (20 - y - 1) * grid, grid * 3, grid);
      ctx.fillRect((x) * grid, (20 - y) * grid, grid, grid);
      break;
    case "E":
      ctx.fillRect((x - 1) * grid, (20 - y - 2) * grid, grid, grid * 3);
      ctx.fillRect((x) * grid, (20 - y - 1) * grid, grid, grid);
      break;
    case "S":
      ctx.fillRect((x - 1) * grid, (20 - y - 1) * grid, grid * 3, grid);
      ctx.fillRect((x) * grid, (20 - y) * grid, grid, grid);
      break;
    case "W":
      ctx.fillRect((x) * grid, (20 - y - 2) * grid, grid, grid * 3);
      ctx.fillRect((x - 1) * grid, (20 - y - 1) * grid, grid, grid);
      break;
  }
}

function draw_j(x: number, y: number, dir: Direction) {
  switch (dir) {
    case "N":
      ctx.fillRect((x - 1) * grid, (20 - y - 2) * grid, grid, grid * 3);
      ctx.fillRect((x) * grid, (20 - y) * grid, grid, grid);
      break;
    case "E":
      ctx.fillRect((x - 1) * grid, (20 - y - 1) * grid, grid * 3, grid);
      ctx.fillRect((x + 1) * grid, (20 - y) * grid, grid, grid);
      break;
    case "S":
      ctx.fillRect((x) * grid, (20 - y - 2) * grid, grid, grid * 3);
      ctx.fillRect((x - 1) * grid, (20 - y - 2) * grid, grid, grid);
      break;
    case "W":
      ctx.fillRect((x - 1) * grid, (20 - y) * grid, grid * 3, grid);
      ctx.fillRect((x - 1) * grid, (20 - y - 1) * grid, grid, grid);
      break;
  }
}

function draw_l(x: number, y: number, dir: Direction) {
  switch (dir) {
    case "N":
      ctx.fillRect((x) * grid , (20 - y - 2) * grid, grid, grid * 3);
      ctx.fillRect((x - 1) * grid, (20 - y) * grid, grid, grid);
      break;
    case "E":
      ctx.fillRect((x - 1) * grid, (20 - y) * grid, grid * 3, grid);
      ctx.fillRect((x - 1) * grid, (20 - y - 1) * grid, grid, grid);
      break;
    case "S":
      ctx.fillRect((x - 1) * grid, (20 - y - 2) * grid, grid, grid * 3);
      ctx.fillRect((x) * grid, (20 - y - 2) * grid, grid, grid);
      break;
    case "W":
      ctx.fillRect((x - 1) * grid, (20 - y - 1) * grid, grid * 3, grid);
      ctx.fillRect((x + 1) * grid, (20 - y) * grid, grid, grid);
      break;
  }
}

function draw_i(x: number, y: number, ori: Orientation) {
  switch (ori) {
    case "H":
      ctx.fillRect((x - 1) * grid, (20 - y) * grid, grid * 4, grid);
      break;
    case "V":
      ctx.fillRect((x - 1) * grid, (20 - y - 3) * grid, grid, grid * 4);
      break;
  }
}

function draw_s(x: number, y: number, ori: Orientation) {
  switch (ori) {
    case "H":
      ctx.fillRect((x - 1) * grid, (20 - y) * grid, grid * 2, grid);
      ctx.fillRect((x) * grid, (20 - y - 1) * grid, grid * 2, grid);
      break;
    case "V":
      ctx.fillRect((x - 1) * grid, (20 - y - 1) * grid, grid, grid * 2);
      ctx.fillRect((x) * grid, (20 - y - 2) * grid, grid, grid * 2);
      break;
  }
}

function draw_z(x: number, y: number, ori: Orientation) {
  switch (ori) {
    case "H":
      ctx.fillRect((x) * grid, (20 - y) * grid, grid * 2, grid);
      ctx.fillRect((x - 1) * grid, (20 - y - 1) * grid, grid * 2, grid);
      break;
    case "V":
      ctx.fillRect((x) * grid, (20 - y - 1) * grid, grid, grid * 2);
      ctx.fillRect((x - 1) * grid, (20 - y - 2) * grid, grid, grid * 2);
      break;
  }
}