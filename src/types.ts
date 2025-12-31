type Direction = "N" | "E" | "S" | "W";
type Orientation = "H" | "V";
type Shape = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

type VHTarget = {
  shape: "I" | "S" | "Z";
  ori: "H" | "V";
  x: number;
}

type NESWTarget = {
  shape: "T" | "J" | "L";
  dir: "N" | "E" | "S" | "W";
  x: number;
}

type OTarget = {
  shape: "O";
  x: number;
}

type Target = VHTarget | NESWTarget | OTarget;

export type { Shape, Direction, Orientation, VHTarget, NESWTarget, OTarget, Target };