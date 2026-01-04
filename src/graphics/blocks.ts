import type { Direction, Shape } from "../types";
import { palette } from "./colors";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const ctx = canvas.getContext("2d")!;
const grid = 30;

/**
 * Draw a filled rectangle given grid coordinates (1-indexed, bottom-left origin)
 */
function fillRect(x: number, y: number, w: number, h: number) {
  ctx.fillRect((x - 1) * grid, (20 - y - h + 1) * grid, w * grid, h * grid);
}

/**
 * Draw a stroked rectangle given grid coordinates (1-indexed, bottom-left origin)
 */
function strokeRect(x: number, y: number, w: number, h: number) {
  ctx.strokeRect((x - 1) * grid, (20 - y - h + 1) * grid, w * grid, h * grid);
}

/**
 * Take in a list of x,y grid coordinates (1-indexed, bottom-left) and stroke a line through them. 
 * Coords refer to the bottom left corner of each grid cell.
 */
function strokeLine(points: [number, number][]) {
  // if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo((points[0][0] - 1) * grid, (20 - points[0][1] + 1) * grid);
  for (let i = 0; i < points.length; i++) {
    ctx.lineTo((points[i][0] - 1) * grid, (20 - points[i][1] + 1) * grid);
  }
  ctx.stroke();
}

abstract class Block {
  protected shape: Shape;
  protected x: number; // left boundary (direction dependent) (1 -> 10 left)
  protected y: number; // bottom boundary of block (direction dependent) (1 -> 20 top)
  protected direction: Direction;
  constructor(x: number, y: number, shape: Shape) {
    this.x = x;
    this.y = y;
    this.direction = "N";
    this.shape = shape;
  }
  getX(): number {
    return this.x;
  }
  getDirection(): Direction {
    return this.direction;
  }
  drawBlock(alpha: number = 1, color?: string): void {
    ctx.fillStyle = color ?? palette[this.shape];
    ctx.globalAlpha = alpha;
    this.draw(this.x, this.y, this.direction);
  }
  drawOutline(alpha: number = 1, color?: string): void {
    ctx.strokeStyle = color ?? palette[this.shape];
    ctx.lineWidth = 4;
    ctx.globalAlpha = alpha;
    this.outline(this.x, this.y, this.direction);
  }
  drawGhost(): void {
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    this.outline(this.x, 1, this.direction);
    ctx.fillStyle = palette.ghost;
    ctx.globalAlpha = 0.3;
    this.draw(this.x, 1, this.direction);
    ctx.globalAlpha = 1;
  }
  protected abstract draw(x: number, y: number, direction: Direction): void;
  protected abstract outline(x: number, y: number, direction: Direction): void;
  abstract moveLeft(): void;
  abstract moveRight(): void;
  setY(y: number): void {
    this.y = y;
  }
  getY(): number {
    return this.y;
  }
  abstract rotateCW(): void;
  abstract rotateCCW(): void;
  rotate180() {
    this.rotateCW();
    this.rotateCW();
  }
}

class OBlock extends Block {
  constructor(x?: number, y?: number) {
    super(x ?? 5, y ?? 19, "O");
  }
  draw(x: number, y: number) {
    fillRect(x, y, 2, 2);
  }
  outline(x: number, y: number) {
    strokeRect(x, y, 2, 2);
  }
  moveLeft() {
    if (this.x > 1) this.x -= 1;
  }
  moveRight() {
    if (this.x < 9) this.x += 1;
  }
  rotateCW() { }
  rotateCCW() { }
}

class IBlock extends Block {
  constructor(x?: number, y?: number, direction?: Direction) {
    super(x ?? 4, y ?? 19, "I");
    this.direction = direction ?? "N";
  }
  draw(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "N":
      case "S":
        fillRect(x, y, 4, 1);
        break;
      case "E":
      case "W":
        fillRect(x, y, 1, 4);
        break;
    }
  }
  outline(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "N":
      case "S":
        strokeRect(x, y, 4, 1);
        break;
      case "E":
      case "W":
        strokeRect(x, y, 1, 4);
        break;
    }
  }
  moveLeft() {
    if (this.x > 1) this.x -= 1;
  }
  moveRight() {
    switch (this.direction) {
      case "N":
      case "S":
        if (this.x < 7) this.x += 1;
        break;
      case "E":
      case "W":
        if (this.x < 10) this.x += 1;
        break;
    }
  }
  rotateCW() {
    switch (this.direction) {
      case "N":
        this.x += 2;
        this.y -= 2;
        this.direction = "E";
        if (this.x > 10) this.x = 10;
        break;
      case "E":
        this.x -= 2;
        this.y += 1;
        this.direction = "S";
        if (this.x > 7) this.x = 7;
        break;
      case "S":
        this.x += 1;
        this.y -= 1;
        this.direction = "W";
        if (this.x > 10) this.x = 10;
        break;
      case "W":
        this.x -= 1;
        this.y += 2;
        this.direction = "N";
        if (this.x > 7) this.x = 7;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
  rotateCCW() {
    switch (this.direction) {
      case "E":
        this.x -= 2;
        this.y += 2;
        this.direction = "N";
        if (this.x > 7) this.x = 7;
        break;
      case "S":
        this.x += 2;
        this.y -= 1;
        this.direction = "E";
        if (this.x > 10) this.x = 10;
        break;
      case "W":
        this.x -= 1;
        this.y += 1;
        this.direction = "S";
        if (this.x > 7) this.x = 7;
        break;
      case "N":
        this.x += 1;
        this.y -= 2;
        this.direction = "W";
        if (this.x > 10) this.x = 10;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}

class TBlock extends Block {
  constructor(x?: number, y?: number, direction?: Direction) {
    super(x ?? 4, y ?? 19, "T");
    this.direction = direction ?? "N";
  }
  draw(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "N":
        fillRect(x, y, 3, 1);
        fillRect(x + 1, y + 1, 1, 1);
        break;
      case "E":
        fillRect(x, y, 1, 3);
        fillRect(x + 1, y + 1, 1, 1);
        break;
      case "S":
        fillRect(x, y + 1, 3, 1);
        fillRect(x + 1, y, 1, 1);
        break;
      case "W":
        fillRect(x + 1, y, 1, 3);
        fillRect(x, y + 1, 1, 1);
        break;
    }
  }
  outline(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "N":
        strokeLine([[x, y], [x + 3, y], [x + 3, y + 1], [x + 2, y + 1], [x + 2, y + 2], [x + 1, y + 2], [x + 1, y + 1], [x, y + 1], [x, y]]);
        break;
      case "E":
        strokeLine([[x, y + 3], [x, y], [x + 1, y], [x + 1, y + 1], [x + 2, y + 1], [x + 2, y + 2], [x + 1, y + 2], [x + 1, y + 3], [x, y + 3]]);
        break;
      case "S":
        strokeLine([[x, y + 2], [x + 3, y + 2], [x + 3, y + 1], [x + 2, y + 1], [x + 2, y], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x, y + 2]]);
        break;
      case "W":
        strokeLine([[x + 2, y], [x + 2, y + 3], [x + 1, y + 3], [x + 1, y + 2], [x, y + 2], [x, y + 1], [x + 1, y + 1], [x + 1, y], [x + 2, y]]);
        break;
    }
  }
  moveLeft() {
    if (this.x > 1) this.x -= 1;
  }
  moveRight() {
    switch (this.direction) {
      case "N":
      case "S":
        if (this.x < 8) this.x += 1;
        break;
      case "E":
      case "W":
        if (this.x < 9) this.x += 1;
        break;
    }
  }
  rotateCW() {
    switch (this.direction) {
      case "N":
        this.x += 1;
        this.y -= 1;
        this.direction = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "E":
        this.x -= 1;
        this.direction = "S";
        break;
      case "S":
        this.direction = "W";
        break;
      case "W":
        this.y += 1;
        this.direction = "N";
        if (this.x > 8) this.x = 8;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
  rotateCCW() {
    switch (this.direction) {
      case "E":
        this.x -= 1;
        this.y += 1;
        this.direction = "N";
        break;
      case "S":
        this.x += 1;
        this.direction = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "W":
        this.direction = "S";
        if (this.x > 8) this.x = 8;
        break;
      case "N":
        this.y -= 1;
        this.direction = "W";
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}

class JBlock extends Block {
  constructor(x?: number, y?: number, direction?: Direction) {
    super(x ?? 4, y ?? 19, "J");
    this.direction = direction ?? "N";
  }
  draw(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "N":
        fillRect(x, y, 3, 1);
        fillRect(x, y + 1, 1, 1);
        break;
      case "E":
        fillRect(x, y, 1, 3);
        fillRect(x + 1, y + 2, 1, 1);
        break;
      case "S":
        fillRect(x, y + 1, 3, 1);
        fillRect(x + 2, y, 1, 1);
        break;
      case "W":
        fillRect(x + 1, y, 1, 3);
        fillRect(x, y, 1, 1);
        break;
    }
  }
  outline(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "N":
        strokeLine([[x, y + 2], [x, y], [x + 3, y], [x + 3, y + 1], [x + 1, y + 1], [x + 1, y + 2], [x, y + 2]]);
        break;
      case "E":
        strokeLine([[x, y + 3], [x, y], [x + 1, y], [x + 1, y + 2], [x + 2, y + 2], [x + 2, y + 3], [x, y + 3]]);
        break;
      case "S":
        strokeLine([[x, y + 2], [x + 3, y + 2], [x + 3, y], [x + 2, y], [x + 2, y + 1], [x, y + 1], [x, y + 2]]);
        break;
      case "W":
        strokeLine([[x + 2, y], [x + 2, y + 3], [x + 1, y + 3], [x + 1, y + 1], [x, y + 1], [x, y], [x + 2, y]]);
        break;
    }
  }
  moveLeft() {
    if (this.x > 1) this.x -= 1;
  }
  moveRight() {
    switch (this.direction) {
      case "N":
      case "S":
        if (this.x < 8) this.x += 1;
        break;
      case "E":
      case "W":
        if (this.x < 9) this.x += 1;
        break;
    }
  }
  rotateCW() {
    switch (this.direction) {
      case "N":
        this.x += 1;
        this.y -= 1;
        this.direction = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "E":
        this.x -= 1;
        this.direction = "S";
        break;
      case "S":
        this.direction = "W";
        break;
      case "W":
        this.y += 1;
        this.direction = "N";
        if (this.x > 8) this.x = 8;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
  rotateCCW() {
    switch (this.direction) {
      case "E":
        this.x -= 1;
        this.y += 1;
        this.direction = "N";
        break;
      case "S":
        this.x += 1;
        this.direction = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "W":
        this.direction = "S";
        if (this.x > 8) this.x = 8;
        break;
      case "N":
        this.y -= 1;
        this.direction = "W";
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}

class LBlock extends Block {
  constructor(x?: number, y?: number, direction?: Direction) {
    super(x ?? 4, y ?? 19, "L");
    this.direction = direction ?? "N";
  }
  draw(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "N":
        fillRect(x, y, 3, 1);
        fillRect(x + 2, y + 1, 1, 1);
        break;
      case "E":
        fillRect(x, y, 1, 3);
        fillRect(x + 1, y, 1, 1);
        break;
      case "S":
        fillRect(x, y + 1, 3, 1);
        fillRect(x, y, 1, 1);
        break;
      case "W":
        fillRect(x + 1, y, 1, 3);
        fillRect(x, y + 2, 1, 1);
        break;
    }
  }
  outline(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "N":
        strokeLine([[x, y], [x, y + 1], [x + 2, y + 1], [x + 2, y + 2], [x + 3, y + 2], [x + 3, y], [x, y]]);
        break;
      case "E":
        strokeLine([[x, y], [x, y + 3], [x + 1, y + 3], [x + 1, y + 1], [x + 2, y + 1], [x + 2, y], [x, y]]);
        break;
      case "S":
        strokeLine([[x, y + 2], [x + 3, y + 2], [x + 3, y + 1], [x + 1, y + 1], [x + 1, y], [x, y], [x, y + 2]]);
        break;
      case "W":
        strokeLine([[x, y + 3], [x + 2, y + 3], [x + 2, y], [x + 1, y], [x + 1, y + 2], [x, y + 2], [x, y + 3]]);
        break;
    }
  }
  moveLeft() {
    if (this.x > 1) this.x -= 1;
  }
  moveRight() {
    switch (this.direction) {
      case "N":
      case "S":
        if (this.x < 8) this.x += 1;
        break;
      case "E":
      case "W":
        if (this.x < 9) this.x += 1;
        break;
    }
  }
  rotateCW() {
    switch (this.direction) {
      case "N":
        this.x += 1;
        this.y -= 1;
        this.direction = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "E":
        this.x -= 1;
        this.direction = "S";
        break;
      case "S":
        this.direction = "W";
        break;
      case "W":
        this.y += 1;
        this.direction = "N";
        if (this.x > 8) this.x = 8;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
  rotateCCW() {
    switch (this.direction) {
      case "E":
        this.x -= 1;
        this.y += 1;
        this.direction = "N";
        break;
      case "S":
        this.x += 1;
        this.direction = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "W":
        this.direction = "S";
        if (this.x > 8) this.x = 8;
        break;
      case "N":
        this.y -= 1;
        this.direction = "W";
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}

class ZBlock extends Block {
  constructor(x?: number, y?: number, direction?: Direction) {
    super(x ?? 4, y ?? 19, "Z");
    this.direction = direction ?? "N";
  }
  draw(x: number, y: number, direction: Direction) {
    ctx.fillStyle = palette.Z;
    switch (direction) {
      case "N":
      case "S":
        fillRect(x, y + 1, 2, 1);
        fillRect(x + 1, y, 2, 1);
        break;
      case "E":
      case "W":
        fillRect(x, y, 1, 2);
        fillRect(x + 1, y + 1, 1, 2);
        break;
    }
  }
  outline(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "N":
      case "S":
        strokeLine([[x, y + 2], [x, y + 1], [x + 1, y + 1], [x + 1, y], [x + 3, y], [x + 3, y + 1], [x + 2, y + 1], [x + 2, y + 2], [x, y + 2]]);
        break;
      case "E":
      case "W":
        strokeLine([[x + 2, y + 3], [x + 2, y + 1], [x + 1, y + 1], [x + 1, y], [x, y], [x, y + 2], [x + 1, y + 2], [x + 1, y + 3], [x + 2, y + 3]]);
        break;
    }
  }
  moveLeft() {
    if (this.x > 1) this.x -= 1;
  }
  moveRight() {
    switch (this.direction) {
      case "N":
      case "S":
        if (this.x < 8) this.x += 1;
        break;
      case "E":
      case "W":
        if (this.x < 9) this.x += 1;
        break;
    }
  }
  rotateCW() {
    switch (this.direction) {
      case "N":
        this.x += 1;
        this.y -= 1;
        this.direction = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "E":
        this.x -= 1;
        this.direction = "S";
        break;
      case "S":
        this.direction = "W";
        break;
      case "W":
        this.y += 1;
        this.direction = "N";
        if (this.x > 8) this.x = 8;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
  rotateCCW() {
    switch (this.direction) {
      case "E":
        this.x -= 1;
        this.y += 1;
        this.direction = "N";
        break;
      case "S":
        this.x += 1;
        this.direction = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "W":
        this.direction = "S";
        if (this.x > 8) this.x = 8;
        break;
      case "N":
        this.y -= 1;
        this.direction = "W";
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}


class SBlock extends Block {
  constructor(x?: number, y?: number, direction?: Direction) {
    super(x ?? 4, y ?? 19, "S");
    this.direction = direction ?? "N";
  }
  draw(x: number, y: number, direction: Direction) {
    ctx.fillStyle = palette.S;
    switch (direction) {
      case "N":
      case "S":
        fillRect(x + 1, y + 1, 2, 1);
        fillRect(x, y, 2, 1);
        break;
      case "E":
      case "W":
        fillRect(x + 1, y, 1, 2);
        fillRect(x, y + 1, 1, 2);
        break;
    }
  }
  outline(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "N":
      case "S":
        strokeLine([[x, y], [x, y + 1], [x + 1, y + 1], [x + 1, y + 2], [x + 3, y + 2], [x + 3, y + 1], [x + 2, y + 1], [x + 2, y], [x, y]]);
        break;
      case "E":
      case "W":
        strokeLine([[x, y + 3], [x, y + 1], [x + 1, y + 1], [x + 1, y], [x + 2, y], [x + 2, y + 2], [x + 1, y + 2], [x + 1, y + 3], [x, y + 3]]);
        break;
    }
  }
  moveLeft() {
    if (this.x > 1) this.x -= 1;
  }
  moveRight() {
    switch (this.direction) {
      case "N":
      case "S":
        if (this.x < 8) this.x += 1;
        break;
      case "E":
      case "W":
        if (this.x < 9) this.x += 1;
        break;
    }
  }
  rotateCW() {
    switch (this.direction) {
      case "N":
        this.x += 1;
        this.y -= 1;
        this.direction = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "E":
        this.x -= 1;
        this.direction = "S";
        break;
      case "S":
        this.direction = "W";
        break;
      case "W":
        this.y += 1;
        this.direction = "N";
        if (this.x > 8) this.x = 8;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
  rotateCCW() {
    switch (this.direction) {
      case "E":
        this.x -= 1;
        this.y += 1;
        this.direction = "N";
        break;
      case "S":
        this.x += 1;
        this.direction = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "W":
        this.direction = "S";
        if (this.x > 8) this.x = 8;
        break;
      case "N":
        this.y -= 1;
        this.direction = "W";
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}

export { Block, OBlock, IBlock, TBlock, JBlock, LBlock, ZBlock, SBlock };

