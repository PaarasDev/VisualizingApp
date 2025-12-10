// =============================================================
//  LINKED LIST MODULE (Singly, Doubly, Circular)
//  Clean API for all visualizers
//
//  create(arr, mode)
//  apply(head, mode, op, args)
//  applyWithFeedback(head, mode, op, args)
//
//  Modes: "singly", "doubly", "circular"
// =============================================================

// ------------------ Node Structure ------------------
function Node(val) {
  this.val = val;
  this.next = null;
  this.prev = null; // used for doubly
}

// ------------------ BUILDERS ------------------
function buildSingly(arr = []) {
  if (!arr.length) return null;
  const head = new Node(arr[0]);
  let cur = head;

  for (let i = 1; i < arr.length; i++) {
    cur.next = new Node(arr[i]);
    cur = cur.next;
  }
  return head;
}

function buildDoubly(arr = []) {
  if (!arr.length) return null;
  const head = new Node(arr[0]);
  let cur = head;

  for (let i = 1; i < arr.length; i++) {
    const n = new Node(arr[i]);
    cur.next = n;
    n.prev = cur;
    cur = n;
  }
  return head;
}

function buildCircular(arr = []) {
  if (!arr.length) return null;
  const head = new Node(arr[0]);
  let cur = head;

  for (let i = 1; i < arr.length; i++) {
    cur.next = new Node(arr[i]);
    cur = cur.next;
  }
  cur.next = head; // make loop
  return head;
}

// ------------------ PUBLIC API ------------------
export function create(arr = [], mode = "singly") {
  mode = mode.toLowerCase();
  if (mode === "doubly") return buildDoubly(arr);
  if (mode === "circular") return buildCircular(arr);
  return buildSingly(arr);
}

export function apply(head, mode = "singly", op, args = []) {
  mode = mode.toLowerCase();
  if (mode === "doubly") return applyDoubly(head, op, args);
  if (mode === "circular") return applyCircular(head, op, args);
  return applySingly(head, op, args);
}

// =============================================================
//  FEEDBACK VERSIONS (Used by your visualizers)
// =============================================================
export function applyWithFeedback(head, mode, op, args = []) {
  mode = mode.toLowerCase();
  if (mode === "doubly") return applyDoublyWithFeedback(head, op, args);
  if (mode === "circular") return applyCircularWithFeedback(head, op, args);
  return applySinglyWithFeedback(head, op, args);
}

// =============================================================
//  SINGLY IMPLEMENTATION
// =============================================================

function applySingly(head, op, args = []) {
  let updated = head;

  switch (op) {
    case "Insert Head": {
      const n = new Node(args[0]);
      n.next = updated;
      return n;
    }

    case "Insert Tail": {
      if (!updated) return new Node(args[0]);
      let cur = updated;
      while (cur.next) cur = cur.next;
      cur.next = new Node(args[0]);
      return updated;
    }

    case "Insert At": {
      const idx = Number(args[0]);
      const val = args[1];

      if (idx <= 0) return applySingly(updated, "Insert Head", [val]);

      let cur = updated, i = 0;
      while (cur && i < idx - 1) { cur = cur.next; i++; }
      if (!cur) return updated;

      const n = new Node(val);
      n.next = cur.next;
      cur.next = n;
      return updated;
    }

    case "Delete At": {
      const idx = Number(args[0]);
      if (!updated) return null;

      if (idx <= 0) return updated.next;

      let cur = updated, i = 0;
      while (cur.next && i < idx - 1) { cur = cur.next; i++; }
      if (cur.next) cur.next = cur.next.next;
      return updated;
    }

    case "Reverse": {
      let prev = null, cur = updated;
      while (cur) {
        const nxt = cur.next;
        cur.next = prev;
        prev = cur;
        cur = nxt;
      }
      return prev;
    }

    case "Search":
      return updated;

    default:
      return updated;
  }
}

// FEEDBACK version
function applySinglyWithFeedback(head, op, args = []) {
  let updated = applySingly(head, op, args);
  let foundIndex = -1;
  let message = "";

  if (op === "Search") {
    const target = args[0];
    let cur = updated, i = 0;
    while (cur) {
      if (cur.val == target) { foundIndex = i; break; }
      cur = cur.next; i++;
    }
    message = foundIndex === -1
      ? `Value ${target} not found`
      : `Value ${target} found at index ${foundIndex}`;
  }

  return { updated, foundIndex, message };
}

// =============================================================
//  DOUBLY IMPLEMENTATION
// =============================================================

function applyDoubly(head, op, args = []) {
  let updated = head;

  switch (op) {
    case "Insert Head": {
      const n = new Node(args[0]);
      if (updated) {
        n.next = updated;
        updated.prev = n;
      }
      return n;
    }

    case "Insert Tail": {
      if (!updated) return new Node(args[0]);
      let cur = updated;
      while (cur.next) cur = cur.next;
      const n = new Node(args[0]);
      cur.next = n;
      n.prev = cur;
      return updated;
    }

    case "Delete Head": {
      if (!updated) return null;
      const nxt = updated.next;
      if (nxt) nxt.prev = null;
      return nxt;
    }

    case "Delete Tail": {
      if (!updated) return null;
      let cur = updated;
      while (cur.next) cur = cur.next;
      if (!cur.prev) return null; // single node
      cur.prev.next = null;
      return updated;
    }

    case "Search":
      return updated;

    default:
      return updated;
  }
}

function applyDoublyWithFeedback(head, op, args = []) {
  const updated = applyDoubly(head, op, args);
  let foundIndex = -1;
  let message = "";

  if (op === "Search") {
    const target = args[0];
    let cur = updated, i = 0;
    while (cur) {
      if (cur.val == target) { foundIndex = i; break; }
      cur = cur.next; i++;
    }
    message = foundIndex === -1
      ? `Value ${target} not found`
      : `Value ${target} found at index ${foundIndex}`;
  }

  return { updated, foundIndex, message };
}

// =============================================================
//  CIRCULAR IMPLEMENTATION
// =============================================================

function applyCircular(head, op, args = []) {
  let updated = head;

  switch (op) {

    case "Insert": {
      const n = new Node(args[0]);
      if (!updated) { n.next = n; return n; }

      let tail = updated;
      while (tail.next !== updated) tail = tail.next;

      tail.next = n;
      n.next = updated;
      return updated;
    }

    case "Delete": {
      const target = args[0];
      if (!updated) return null;

      let cur = updated, prev = null;
      do {
        if (cur.val == target) {
          if (!prev) {
            let tail = updated;
            while (tail.next !== updated) tail = tail.next;

            if (cur.next === cur) return null;
            updated = cur.next;
            tail.next = updated;
            return updated;
          } else {
            prev.next = cur.next;
            return updated;
          }
        }
        prev = cur;
        cur = cur.next;
      } while (cur !== updated);

      return updated;
    }

    case "Search":
      return updated;

    default:
      return updated;
  }
}

function applyCircularWithFeedback(head, op, args = []) {
  const updated = applyCircular(head, op, args);
  let foundIndex = -1;
  let message = "";

  if (op === "Search") {
    const target = args[0];
    let cur = updated, i = 0;

    if (cur) {
      do {
        if (cur.val == target) { foundIndex = i; break; }
        cur = cur.next; i++;
      } while (cur !== updated);
    }

    message = foundIndex === -1
      ? `Value ${target} not found`
      : `Value ${target} found at position ${foundIndex}`;
  }

  return { updated, foundIndex, message };
}
