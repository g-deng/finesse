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

export const held = new Set<string>();
const pressedActions: Action[] = [];

document.addEventListener("keydown", (e) => {
  const action = keyMap[e.code];
  if (action && !held.has(e.code)) {
    held.add(e.code);
    pressedActions.push(action);
    e.preventDefault();
  }
});

document.addEventListener("keyup", (e) => {
  const action = keyMap[e.code];
  if (action) {
    held.delete(e.code);
    e.preventDefault();
  }
});

export function consumePressedActions(): Action[] {
  const actions = [...pressedActions];
  pressedActions.length = 0;
  return actions;
}