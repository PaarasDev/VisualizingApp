// src/ds/queue.js
// Linear queue, circular queue, and simple priority queue
// create(data, mode) mode: "linear" | "circular" | "priority"
// apply(state, mode, op, args)

export function create(data = [], mode = "linear") {
  const m = (mode || "linear").toLowerCase();
  if (m === "circular") {
    // represent circular queue as array + head index (object)
    return { arr: Array.isArray(data) ? [...data] : [], head: 0, size: (data||[]).length };
  }
  if (m === "priority") {
    // priority queue: array of {priority, value}
    // if incoming data is plain values, set priority=0
    return (Array.isArray(data) ? data.map(v => ({ priority: 0, value: v })) : []);
  }
  // linear queue: simple array, front at index 0
  return Array.isArray(data) ? [...data] : [];
}

export function apply(state, mode = "linear", op = "", args = []) {
  const m = (mode || "linear").toLowerCase();

  if (m === "circular") {
    // state: {arr, head, size}
    const s = state ? {...state, arr: Array.isArray(state.arr) ? [...state.arr] : []} : {arr:[], head:0, size:0};
    switch (op) {
      case "Enqueue":
        s.arr.push(args[0]);
        s.size = s.arr.length;
        return s;
      case "Dequeue":
        if (s.size === 0) return s;
        // remove logical head element
        s.arr.splice(s.head, 1);
        s.size = s.arr.length;
        if (s.head >= s.size) s.head = 0;
        return s;
      case "Front":
        return s;
      case "Clear":
        return {arr:[], head:0, size:0};
      default:
        return s;
    }
  }

  if (m === "priority") {
    // state: array of {priority, value}
    const arr = Array.isArray(state) ? [...state] : [];
    switch (op) {
      case "Enqueue": {
        // args: [value, priority]
        const val = args[0];
        const p = Number(args[1] ?? 0);
        arr.push({ value: val, priority: p });
        // keep heap-like ordering by simple sort (small dataset)
        arr.sort((a,b) => b.priority - a.priority); // high priority first
        return arr;
      }
      case "Dequeue":
        arr.shift();
        return arr;
      case "Clear":
        return [];
      default:
        return arr;
    }
  }

  // linear
  const q = Array.isArray(state) ? [...state] : [];
  switch (op) {
    case "Enqueue":
      q.push(args[0]);
      return q;
    case "Dequeue":
      q.shift();
      return q;
    case "Clear":
      return [];
    default:
      return q;
  }
}
