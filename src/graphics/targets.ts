import { palette } from "./colors";
import type { Shape, Direction, Orientation } from "../types";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const ctx = canvas.getContext("2d")!;
const grid = 30;

export function drawTarget(shape: Shape, x: number, dirOrOri?: Direction | Orientation) {
  ctx.strokeStyle = palette.target;
  ctx.lineWidth = 1;
  switch (shape) {
    case "O":
      draw_o_target(x);
      break;
    case "T":
      draw_t_target(x, dirOrOri as Direction);
      break;
    case "J":
      draw_j_target(x, dirOrOri as Direction);
      break;
    case "L":
      draw_l_target(x, dirOrOri as Direction);
      break;
    case "I":
      draw_i_target(x, dirOrOri as Orientation);
      break;
    case "S":
      draw_s_target(x, dirOrOri as Orientation);
      break;
    case "Z":
      draw_z_target(x, dirOrOri as Orientation);
      break;
  }
}

function draw_o_target(x: number) {
  ctx.strokeRect((x - 1) * grid, 18 * grid, 2*grid, 2*grid);
}

function draw_t_target(x: number, dir: Direction) {
  ctx.beginPath();
  switch (dir) {
    case "N":
      ctx.moveTo((x - 1) * grid, 20 * grid);
      ctx.lineTo((x + 2) * grid, 20 * grid);
      ctx.lineTo((x + 2) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 18 * grid);
      ctx.lineTo((x) * grid, 18 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x - 1) * grid, 19 * grid);
      ctx.lineTo((x - 1) * grid, 20 * grid);
      break;
    case "E":
      ctx.moveTo((x - 1) * grid, 17 * grid);
      ctx.lineTo((x - 1) * grid, 20 * grid);
      ctx.lineTo((x) * grid, 20 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 18 * grid);
      ctx.lineTo((x) * grid, 18 * grid);
      ctx.lineTo((x) * grid, 17 * grid);
      ctx.lineTo((x - 1) * grid, 17 * grid);
      break;
    case "S":
      ctx.moveTo((x - 1) * grid, 18 * grid);
      ctx.lineTo((x + 2) * grid, 18 * grid);
      ctx.lineTo((x + 2) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 20 * grid);
      ctx.lineTo((x) * grid, 20 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x - 1) * grid, 19 * grid);
      ctx.lineTo((x - 1) * grid, 18 * grid);
      break;
    case "W":
      ctx.moveTo((x + 1) * grid, 20 * grid);
      ctx.lineTo((x + 1) * grid, 17 * grid);
      ctx.lineTo((x) * grid, 17 * grid);
      ctx.lineTo((x) * grid, 18 * grid);
      ctx.lineTo((x - 1) * grid, 18 * grid);
      ctx.lineTo((x - 1) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 20 * grid);
      ctx.lineTo((x + 1) * grid, 20 * grid);
      break;
  }
  ctx.stroke();
}

function draw_l_target(x: number, dir: Direction) {
  ctx.beginPath();
  switch (dir) {
    case "N":
      ctx.moveTo((x - 1) * grid, 20 * grid);
      ctx.lineTo((x - 1) * grid, 17 * grid);
      ctx.lineTo((x) * grid, 17 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 20 * grid);
      ctx.lineTo((x - 1) * grid, 20 * grid);
      break;
    case "E":
      ctx.moveTo((x - 1) * grid, 18 * grid);
      ctx.lineTo((x + 2) * grid, 18 * grid);
      ctx.lineTo((x + 2) * grid, 20 * grid);
      ctx.lineTo((x + 1) * grid, 20 * grid);
      ctx.lineTo((x + 1) * grid, 19 * grid);
      ctx.lineTo((x - 1) * grid, 19 * grid);
      ctx.lineTo((x - 1) * grid, 18 * grid);
      break;
    case "S":
      ctx.moveTo((x - 1) * grid, 17 * grid);
      ctx.lineTo((x + 1) * grid, 17 * grid);
      ctx.lineTo((x + 1) * grid, 20 * grid);
      ctx.lineTo((x) * grid, 20 * grid);
      ctx.lineTo((x) * grid, 18 * grid);
      ctx.lineTo((x - 1) * grid, 18 * grid);
      ctx.lineTo((x - 1) * grid, 17 * grid);
      break;
    case "W":
      ctx.moveTo((x - 1) * grid, 20 * grid);
      ctx.lineTo((x - 1) * grid, 18 * grid);
      ctx.lineTo((x) * grid, 18 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x + 2) * grid, 19 * grid);
      ctx.lineTo((x + 2) * grid, 20 * grid);
      ctx.lineTo((x - 1) * grid, 20 * grid);
      break;
  }
  ctx.stroke();
}

function draw_j_target(x: number, dir: Direction) {
  ctx.beginPath();
  switch (dir) {
    case "N":
      ctx.moveTo((x + 1) * grid, 17 * grid);
      ctx.lineTo((x + 1) * grid, 20 * grid);
      ctx.lineTo((x - 1) * grid, 20 * grid);
      ctx.lineTo((x - 1) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 17 * grid);
      ctx.lineTo((x + 1) * grid, 17 * grid);
      break;
    case "E":
      ctx.moveTo((x - 1) * grid, 18 * grid);
      ctx.lineTo((x - 1) * grid, 20 * grid);
      ctx.lineTo((x + 2) * grid, 20 * grid);
      ctx.lineTo((x + 2) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 18 * grid);
      ctx.lineTo((x - 1) * grid, 18 * grid);
      break;
    case "S":
      ctx.moveTo((x - 1) * grid, 17 * grid);
      ctx.lineTo((x - 1) * grid, 20 * grid);
      ctx.lineTo((x) * grid, 20 * grid);
      ctx.lineTo((x) * grid, 18 * grid);
      ctx.lineTo((x + 1) * grid, 18 * grid);
      ctx.lineTo((x + 1) * grid, 17 * grid);
      ctx.lineTo((x - 1) * grid, 17 * grid);
      break;
    case "W":
      ctx.moveTo((x - 1) * grid, 18 * grid);
      ctx.lineTo((x + 2) * grid, 18 * grid);
      ctx.lineTo((x + 2) * grid, 20 * grid);
      ctx.lineTo((x + 1) * grid, 20 * grid);
      ctx.lineTo((x + 1) * grid, 19 * grid);
      ctx.lineTo((x - 1) * grid, 19 * grid);
      ctx.lineTo((x - 1) * grid, 18 * grid);
      break;
  }
  ctx.stroke();
}

function draw_i_target(x: number, ori: Orientation) {
  switch (ori) {
    case "H":
      ctx.strokeRect((x - 1) * grid, 19 * grid, grid * 4, grid);
      break;
    case "V":
      ctx.strokeRect((x - 1) * grid, 16 * grid, grid, grid * 4);
      break;
  }
}

function draw_s_target(x: number, ori: Orientation) {
  ctx.beginPath();
  switch (ori) {
    case "H":
      ctx.moveTo((x - 1) * grid, 20 * grid);
      ctx.lineTo((x - 1) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 18 * grid);
      ctx.lineTo((x + 2) * grid, 18 * grid);
      ctx.lineTo((x + 2) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 20 * grid);
      ctx.lineTo((x - 1) * grid, 20 * grid);
      break;
    case "V":
      ctx.moveTo((x - 1) * grid, 18 * grid);
      ctx.lineTo((x - 1) * grid, 20 * grid);
      ctx.lineTo((x) * grid, 20 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 17 * grid);
      ctx.lineTo((x) * grid, 17 * grid);
      ctx.lineTo((x) * grid, 18 * grid);
      ctx.lineTo((x - 1) * grid, 18 * grid);
      break;
  }
  ctx.stroke();
}

function draw_z_target(x: number, ori: Orientation) {
  ctx.beginPath();
  switch (ori) {
    case "H":
      ctx.moveTo((x - 1) * grid, 18 * grid);
      ctx.lineTo((x - 1) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 20 * grid);
      ctx.lineTo((x + 2) * grid, 20 * grid);
      ctx.lineTo((x + 2) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 19 * grid);
      ctx.lineTo((x + 1) * grid, 18 * grid);
      ctx.lineTo((x - 1) * grid, 18 * grid);
      break;
    case "V":
      ctx.moveTo((x - 1) * grid, 17 * grid);
      ctx.lineTo((x - 1) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 19 * grid);
      ctx.lineTo((x) * grid, 20 * grid);
      ctx.lineTo((x + 1) * grid, 20 * grid);
      ctx.lineTo((x + 1) * grid, 18 * grid);
      ctx.lineTo((x) * grid, 18 * grid);
      ctx.lineTo((x) * grid, 17 * grid);
      ctx.lineTo((x - 1) * grid, 17 * grid);
      break;
  }
  ctx.stroke();
}