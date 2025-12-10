// src/ds/stack.js
import * as LL from "./linkedlist.js";

// Create a stack in array or linkedlist mode
export function create(data = [], mode = "array") {
  const m = (mode || "array").toLowerCase();

  if (m === "linkedlist") {
    // Linked list where HEAD = TOP of stack
    return LL.create(data, "singly");
  }

  // Array stack (TOP at the end)
  return Array.isArray(data) ? [...data] : [];
}

// Apply stack operations
// apply(state, mode, op, args)
export function apply(state, mode = "array", op = "", args = []) {
  const m = (mode || "array").toLowerCase();

  // -----------------------------
  // LINKED LIST STACK OPERATIONS
  // -----------------------------
  if (m === "linkedlist") {
    switch (op) {
      case "Push":
        return LL.apply(state, "singly", "Insert Head", [args[0]]);

      case "Pop":
        return LL.apply(state, "singly", "Delete At", [0]);

      case "Peek":
        return state;  // unchanged

      case "Clear":
        return null;

      default:
        return state;
    }
  }

  // -----------------------------
  // ARRAY STACK OPERATIONS
  // -----------------------------
  const arr = Array.isArray(state) ? [...state] : [];

  switch (op) {
    case "Push":
      arr.push(args[0]);
      return arr;

    case "Pop":
      arr.pop();
      return arr;

    case "Peek":
      return arr; // unchanged

    case "Clear":
      return [];

    default:
      return arr;
  }
}
