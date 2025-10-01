type Direction = "N" | "E" | "S" | "W";
type Orientation = "H" | "V";
type Shape = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

type VHBlock = {
  shape: "I" | "S" | "Z";
  ori: "H" | "V";
  x: number;
  y?: number;
  spawnY?: number;
}

type NESWBlock = {
  shape: "T" | "J" | "L";
  dir: "N" | "E" | "S" | "W";
  x: number;
  y?: number;
  spawnY?: number;
}

type OBlock = {
  shape: "O";
  x: number;
  y?: number;
  spawnY?: number;
}

type Block = VHBlock | NESWBlock | OBlock;

export type { Shape, Direction, Orientation, VHBlock, NESWBlock, OBlock, Block };