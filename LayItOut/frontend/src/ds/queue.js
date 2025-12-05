export function create(arr) {
  return [...arr];
}

export function apply(q, op, args) {
  const a = [...q];

  switch (op) {
    case "Enqueue":
      a.push(args[0]);
      break;

    case "Dequeue":
      a.shift();
      break;

    case "Peek":
      alert("Front: " + a[0]);
      break;
  }

  return a;
}
