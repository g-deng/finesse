import { palette } from "./colors";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const ctx = canvas.getContext("2d")!;
const grid = 30;


abstract class Block {
  protected x: number;
  protected y: number;
  protected orientation: "N" | "E" | "S" | "W";
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.orientation = "N";
  }
  abstract draw(): void;
  abstract moveLeft(): void;
  abstract moveRight(): void;
  setY(y: number): void {
    this.y = y;
  }
  abstract rotateCW(): void;
  rotateCCW() {
    this.rotateCW();
    this.rotateCW();
    this.rotateCW();
  }
  rotate180() {
    this.rotateCW();
    this.rotateCW();
  }
}

class OBlock extends Block {
  constructor() {
    super(5, 19);
  }
  draw() {
    ctx.fillStyle = palette.O;
    ctx.fillRect((this.x - 1) * grid, (20 - this.y - 1) * grid, 2 * grid, 2 * grid);
  }
  moveLeft() {
    if (this.x > 1) this.x -= 1;
  }
  moveRight() {
    if (this.x < 9) this.x += 1;
  }
  rotateCW() {}
  rotateCCW() {}
  rotate180() {}
}

class IBlock extends Block {
  constructor() {
    super(4, 17);
  }
  draw() {
    ctx.fillStyle = palette.I;
    switch (this.orientation) {
      case "N":
      case "S":
        ctx.fillRect((this.x - 1) * grid, (20 - this.y) * grid, grid * 4, grid);
        break;
      case "E":
      case "W":
        ctx.fillRect((this.x - 1) * grid, (20 - this.y - 3) * grid, grid, grid * 4);
        break;
    }
  }
  moveLeft() {
    if (this.x > 1) this.x -= 1;
  }
  moveRight() {
    switch (this.orientation) {
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
    switch (this.orientation) {
      case "N":
        this.x += 2;
        this.y -= 2;
        this.orientation = "E";
        if (this.x > 10) this.x = 10;
        break;
      case "E":
        this.x -= 2;
        this.y += 1;
        this.orientation = "S";
        if (this.x > 7) this.x = 7;
        break;
      case "S":
        this.x += 1;
        this.y -= 1;
        this.orientation = "W";
        if (this.x > 10) this.x = 10;
        break;
      case "W":
        this.x -= 1;
        this.y += 2;
        this.orientation = "N";
        if (this.x > 7) this.x = 7;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}

