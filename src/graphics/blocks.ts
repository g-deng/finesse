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
  drawBlock(): void {
    ctx.fillStyle = palette[this.shape];
    ctx.globalAlpha = 1;
    this.draw(this.x, this.y, this.direction);
  }
  drawGhost(): void {
    ctx.fillStyle = palette[this.shape];
    ctx.globalAlpha = 0.5;
    this.draw(this.x, 1, this.direction);
    ctx.globalAlpha = 1;
  }
  protected abstract draw(x: number, y: number, direction: Direction): void;
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
  constructor() {
    super(5, 19, "O");
  }
  draw(x: number, y: number, direction: Direction) {
    fillRect(x, y, 2, 2);
  }
  moveLeft() {
    if (this.x > 1) this.x -= 1;
  }
  moveRight() {
    if (this.x < 9) this.x += 1;
  }
  rotateCW() {}
  rotateCCW() {}
}

class IBlock extends Block {
  constructor() {
    super(4, 19, "I");
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
  constructor() {
    super(4, 19, "T");
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
  constructor() {
    super(4, 19, "J");
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
  constructor() {
    super(4, 19, "L");
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
  constructor() {
    super(4, 19, "Z");
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
  constructor() {
    super(4, 19, "S");
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

