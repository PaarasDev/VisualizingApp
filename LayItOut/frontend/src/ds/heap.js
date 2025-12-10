function swap(arr, i, j) {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}

function heapifyUp(arr, idx, cmp) {
  while (idx > 0) {
    const p = Math.floor((idx - 1) / 2);
    if (cmp(arr[idx], arr[p])) {
      swap(arr, idx, p);
      idx = p;
    } else break;
  }
}

function heapifyDown(arr, idx, cmp) {
  const n = arr.length;
  while (true) {
    let best = idx;
    const l = 2 * idx + 1;
    const r = 2 * idx + 2;

    if (l < n && cmp(arr[l], arr[best])) best = l;
    if (r < n && cmp(arr[r], arr[best])) best = r;

    if (best === idx) break;

    swap(arr, idx, best);
    idx = best;
  }
}

function normalize(list) {
  if (!Array.isArray(list)) return [];
  return list
    .map((x) => Number(x))
    .filter((n) => Number.isFinite(n));
}

export function create(data = [], mode = "max") {
  const arr = normalize(data);
  const cmp = mode === "min" ? (a, b) => a < b : (a, b) => a > b;

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapifyDown(arr, i, cmp);
  }
  return arr;
}

export function apply(state = [], mode = "max", op = "", args = []) {
  const arr = [...state];
  const cmp = mode === "min" ? (a, b) => a < b : (a, b) => a > b;

  switch (op) {
    case "Insert": {
      if (!args.length) return arr;
      const value = Number(args[0]);
      if (!Number.isFinite(value)) return arr;
      arr.push(value);
      heapifyUp(arr, arr.length - 1, cmp);
      return arr;
    }

    case "Delete": {
      if (!arr.length) return arr;
      let idx = Number(args[0]);
      if (!Number.isFinite(idx)) idx = 0;

      idx = Math.max(0, Math.min(idx, arr.length - 1));

      swap(arr, idx, arr.length - 1);
      arr.pop();

      if (idx < arr.length) heapifyDown(arr, idx, cmp);

      return arr;
    }

    case "Clear":
      return [];

    case "Peek":
      return arr;

    default:
      return arr;
  }
}

export const createMax = (d) => create(d, "max");
export const applyMax = (s, o, a) => apply(s, "max", o, a);

// ✅ REQUIRED FOR MIN HEAP
export const createMin = (d) => create(d, "min");
export const applyMin = (s, o, a) => apply(s, "min", o, a);
