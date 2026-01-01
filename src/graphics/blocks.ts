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
  protected x: number; // left boundary (orientation dependent) (1 -> 10 left)
  protected y: number; // bottom boundary of block (orientation dependent) (1 -> 20 top)
  protected orientation: "N" | "E" | "S" | "W";
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.orientation = "N";
  }
  getX(): number {
    return this.x;
  }
  getDirection(): "N" | "E" | "S" | "W" {
    return this.orientation;
  }
  abstract draw(): void;
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
    super(5, 19);
  }
  draw() {
    ctx.fillStyle = palette.O;
    fillRect(this.x, this.y, 2, 2);
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
    super(4, 19);
  }
  draw() {
    ctx.fillStyle = palette.I;
    switch (this.orientation) {
      case "N":
      case "S":
        fillRect(this.x, this.y, 4, 1);
        break;
      case "E":
      case "W":
        fillRect(this.x, this.y, 1, 4);
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
  rotateCCW() {
    switch (this.orientation) {
      case "E":
        this.x -= 2;
        this.y += 2;
        this.orientation = "N";
        if (this.x > 7) this.x = 7;
        break;
      case "S":
        this.x += 2;
        this.y -= 1;
        this.orientation = "E";
        if (this.x > 10) this.x = 10;
        break;
      case "W":
        this.x -= 1;
        this.y += 1;
        this.orientation = "S";
        if (this.x > 7) this.x = 7;
        break;
      case "N":
        this.x += 1;
        this.y -= 2;
        this.orientation = "W";
        if (this.x > 10) this.x = 10;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}

class TBlock extends Block {
  constructor() {
    super(4, 19);
  }
  draw() {
    ctx.fillStyle = palette.T;
    switch (this.orientation) {
      case "N":
        fillRect(this.x, this.y, 3, 1);
        fillRect(this.x + 1, this.y + 1, 1, 1);
        break;
      case "E":
        fillRect(this.x, this.y, 1, 3);
        fillRect(this.x + 1, this.y + 1, 1, 1);
        break;
      case "S":
        fillRect(this.x, this.y + 1, 3, 1);
        fillRect(this.x + 1, this.y, 1, 1);
        break;
      case "W":
        fillRect(this.x + 1, this.y, 1, 3);
        fillRect(this.x, this.y + 1, 1, 1);
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
        if (this.x < 8) this.x += 1;
        break;
      case "E":
      case "W":
        if (this.x < 9) this.x += 1;
        break;
    }
  }
  rotateCW() {
    switch (this.orientation) {
      case "N":
        this.x += 1;
        this.y -= 1;
        this.orientation = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "E":
        this.x -= 1;
        this.orientation = "S";
        break;
      case "S":
        this.orientation = "W";
        break;
      case "W":
        this.y += 1;
        this.orientation = "N";
        if (this.x > 8) this.x = 8;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
  rotateCCW() {
    switch (this.orientation) {
      case "E":
        this.x -= 1;
        this.y += 1;
        this.orientation = "N";
        break;
      case "S":
        this.x += 1;
        this.orientation = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "W":
        this.orientation = "S";
        if (this.x > 8) this.x = 8;
        break;
      case "N":
        this.y -= 1;
        this.orientation = "W";
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}

class JBlock extends Block {
  constructor() {
    super(4, 19);
  }
  draw() {
    ctx.fillStyle = palette.J;
    switch (this.orientation) {
      case "N":
        fillRect(this.x, this.y, 3, 1);
        fillRect(this.x, this.y + 1, 1, 1);
        break;
      case "E":
        fillRect(this.x, this.y, 1, 3);
        fillRect(this.x + 1, this.y + 2, 1, 1);
        break;
      case "S":
        fillRect(this.x, this.y + 1, 3, 1);
        fillRect(this.x + 2, this.y, 1, 1);
        break;
      case "W":
        fillRect(this.x + 1, this.y, 1, 3);
        fillRect(this.x, this.y, 1, 1);
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
        if (this.x < 8) this.x += 1;
        break;
      case "E":
      case "W":
        if (this.x < 9) this.x += 1;
        break;
    }
  }
  rotateCW() {
    switch (this.orientation) {
      case "N":
        this.x += 1;
        this.y -= 1;
        this.orientation = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "E":
        this.x -= 1;
        this.orientation = "S";
        break;
      case "S":
        this.orientation = "W";
        break;
      case "W":
        this.y += 1;
        this.orientation = "N";
        if (this.x > 8) this.x = 8;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
  rotateCCW() {
    switch (this.orientation) {
      case "E":
        this.x -= 1;
        this.y += 1;
        this.orientation = "N";
        break;
      case "S":
        this.x += 1;
        this.orientation = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "W":
        this.orientation = "S";
        if (this.x > 8) this.x = 8;
        break;
      case "N":
        this.y -= 1;
        this.orientation = "W";
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}

class LBlock extends Block {
  constructor() {
    super(4, 19);
  }
  draw() {
    ctx.fillStyle = palette.L;
    switch (this.orientation) {
      case "N":
        fillRect(this.x, this.y, 3, 1);
        fillRect(this.x + 2, this.y + 1, 1, 1);
        break;
      case "E":
        fillRect(this.x, this.y, 1, 3);
        fillRect(this.x + 1, this.y, 1, 1);
        break;
      case "S":
        fillRect(this.x, this.y + 1, 3, 1);
        fillRect(this.x, this.y, 1, 1);
        break;
      case "W":
        fillRect(this.x + 1, this.y, 1, 3);
        fillRect(this.x, this.y + 2, 1, 1);
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
        if (this.x < 8) this.x += 1;
        break;
      case "E":
      case "W":
        if (this.x < 9) this.x += 1;
        break;
    }
  }
  rotateCW() {
    switch (this.orientation) {
      case "N":
        this.x += 1;
        this.y -= 1;
        this.orientation = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "E":
        this.x -= 1;
        this.orientation = "S";
        break;
      case "S":
        this.orientation = "W";
        break;
      case "W":
        this.y += 1;
        this.orientation = "N";
        if (this.x > 8) this.x = 8;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
  rotateCCW() {
    switch (this.orientation) {
      case "E":
        this.x -= 1;
        this.y += 1;
        this.orientation = "N";
        break;
      case "S":
        this.x += 1;
        this.orientation = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "W":
        this.orientation = "S";
        if (this.x > 8) this.x = 8;
        break;
      case "N":
        this.y -= 1;
        this.orientation = "W";
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}

class ZBlock extends Block {
  constructor() {
    super(4, 19);
  }
  draw() {
    ctx.fillStyle = palette.Z;
    switch (this.orientation) {
      case "N":
      case "S":
        fillRect(this.x, this.y + 1, 2, 1);
        fillRect(this.x + 1, this.y, 2, 1);
        break;
      case "E":
      case "W":
        fillRect(this.x, this.y, 1, 2);
        fillRect(this.x + 1, this.y + 1, 1, 2);
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
        if (this.x < 8) this.x += 1;
        break;
      case "E":
      case "W":
        if (this.x < 9) this.x += 1;
        break;
    }
  }
  rotateCW() {
    switch (this.orientation) {
      case "N":
        this.x += 1;
        this.y -= 1;
        this.orientation = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "E":
        this.x -= 1;
        this.orientation = "S";
        break;
      case "S":
        this.orientation = "W";
        break;
      case "W":
        this.y += 1;
        this.orientation = "N";
        if (this.x > 8) this.x = 8;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
  rotateCCW() {
    switch (this.orientation) {
      case "E":
        this.x -= 1;
        this.y += 1;
        this.orientation = "N";
        break;
      case "S":
        this.x += 1;
        this.orientation = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "W":
        this.orientation = "S";
        if (this.x > 8) this.x = 8;
        break;
      case "N":
        this.y -= 1;
        this.orientation = "W";
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}


class SBlock extends Block {
  constructor() {
    super(4, 19);
  }
  draw() {
    ctx.fillStyle = palette.S;
    switch (this.orientation) {
      case "N":
      case "S":
        fillRect(this.x + 1, this.y + 1, 2, 1);
        fillRect(this.x, this.y, 2, 1);
        break;
      case "E":
      case "W":
        fillRect(this.x + 1, this.y, 1, 2);
        fillRect(this.x, this.y + 1, 1, 2);
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
        if (this.x < 8) this.x += 1;
        break;
      case "E":
      case "W":
        if (this.x < 9) this.x += 1;
        break;
    }
  }
  rotateCW() {
    switch (this.orientation) {
      case "N":
        this.x += 1;
        this.y -= 1;
        this.orientation = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "E":
        this.x -= 1;
        this.orientation = "S";
        break;
      case "S":
        this.orientation = "W";
        break;
      case "W":
        this.y += 1;
        this.orientation = "N";
        if (this.x > 8) this.x = 8;
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
  rotateCCW() {
    switch (this.orientation) {
      case "E":
        this.x -= 1;
        this.y += 1;
        this.orientation = "N";
        break;
      case "S":
        this.x += 1;
        this.orientation = "E";
        if (this.x > 9) this.x = 9;
        break;
      case "W":
        this.orientation = "S";
        if (this.x > 8) this.x = 8;
        break;
      case "N":
        this.y -= 1;
        this.orientation = "W";
        break;
    }
    if (this.x < 1) this.x = 1;
    if (this.y < 1) this.y = 1;
  }
}

export { Block, OBlock, IBlock, TBlock, JBlock, LBlock, ZBlock, SBlock };

