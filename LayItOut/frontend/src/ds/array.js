export function create(arr) {
  return [...arr];
}

export function apply(state, op, args) {
  const a = [...state];

  switch (op) {
    case "Insert": {
      const index = Number(args[0] ?? a.length);
      const value = args[1] ?? args[0];
      a.splice(index, 0, value);
      return a;
    }

    case "Delete": {
      const index = Number(args[0] ?? 0);
      a.splice(index, 1);
      return a;
    }

    case "Update": {
      const index = Number(args[0] ?? 0);
      const value = args[1];
      a[index] = value;
      return a;
    }

    case "Search": {
      alert("Index: " + a.indexOf(args[0]));
      return a;
    }

    default:
      return a;
  }
}
