export type Action = "left" | "right" | "cw" | "ccw" | "180" | "softDrop" | "hardDrop";

const keyMap: Record<string, Action> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowDown: "softDrop",
  Space: "hardDrop",
  KeyA: "ccw",
  KeyD: "cw",
  KeyS: "180",
};

export const pressed = new Set<Action>();

document.addEventListener("keydown", (e) => {
  const action = keyMap[e.code];
  if (action) {
    pressed.add(action);
    e.preventDefault();
  }
});

document.addEventListener("keyup", (e) => {
  const action = keyMap[e.code];
  if (action) {
    pressed.delete(action);
    e.preventDefault();
  }
});