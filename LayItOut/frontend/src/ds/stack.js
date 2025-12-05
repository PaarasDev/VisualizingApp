export function create(arr) {
  return [...arr];
}

export function apply(stack, op, args) {
  const s = [...stack];

  switch (op) {
    case "Push":
      s.push(args[0]);
      break;

    case "Pop":
      s.pop();
      break;

    case "Peek":
      alert("Top: " + s[s.length - 1]);
      break;
  }

  return s;
}
