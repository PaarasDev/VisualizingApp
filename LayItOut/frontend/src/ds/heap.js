//MAX HEAP
export function create(arr) {
  const a = [...arr];
  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) {
    heapify(a, i);
  }
  return a;
}

function heapify(a, i) {
  const n = a.length;
  let largest = i;

  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && a[left] > a[largest]) largest = left;
  if (right < n && a[right] > a[largest]) largest = right;

  if (largest !== i) {
    [a[i], a[largest]] = [a[largest], a[i]];
    heapify(a, largest);
  }
}

export function apply(heap, op, args) {
  const a = [...heap];

  switch (op) {
    case "Insert":
      a.push(args[0]);
      for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) {
        heapify(a, i);
      }
      return a;

    case "Delete": {
      const index = Number(args[0] ?? 0);
      a.splice(index, 1);
      for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) {
        heapify(a, i);
      }
      return a;
    }

    case "BuildHeap":
      return create(a);

    default:
      return a;
  }
}
