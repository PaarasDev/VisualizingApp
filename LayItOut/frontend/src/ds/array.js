// src/ds/array.js
// Simple array utilities: create(data) and apply(state, mode, op, args)
// mode is ignored (kept for API consistency)

export function create(data = []) {
  // copy to avoid accidental external mutation
  return Array.isArray(data) ? [...data] : [];
}

export function apply(state = [], mode = "array", op = "", args = []) {
  // state is an array
  const arr = Array.isArray(state) ? [...state] : [];
  const a0 = args[0];

  switch (op) {
    case "Insert": {
      // Insert value at index (optional). args: [index, value] or [value]
      if (args.length === 1) {
        arr.push(a0);
      } else {
        const idx = Number(args[0]);
        const val = args[1];
        const clamped = Math.max(0, Math.min(idx, arr.length));
        arr.splice(clamped, 0, val);
      }
      return arr;
    }

    case "Delete": {
      // args: [index] or empty to pop
      if (!args.length) {
        arr.pop();
      } else {
        const idx = Number(args[0]);
        if (idx >= 0 && idx < arr.length) arr.splice(idx, 1);
      }
      return arr;
    }

    case "Update": {
      // args: [index, value]
      const idx = Number(args[0]);
      if (idx >= 0 && idx < arr.length) arr[idx] = args[1];
      return arr;
    }

    case "Search": {
    const target = args[0];
    const index = arr.indexOf(target);
    return {
        result: index,   // store result
        array: arr       // new array state
    };
}


    case "Reverse": {
      return arr.reverse();
    }

    case "Clear":
      return [];

    default:
      return arr;
  }
}
