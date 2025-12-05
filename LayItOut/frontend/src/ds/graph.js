function layout(nodes) {
  return nodes.map((id, i) => ({
    id,
    label: id,
    x: 80 + (i % 6) * 120,
    y: 80 + Math.floor(i / 6) * 120,
  }));
}

export function create(arr) {
  const nodes = layout(arr.map((v) => String(v)));
  return { nodes, edges: [] };
}

export function apply(graph, op, args) {
  const g = {
    nodes: [...graph.nodes],
    edges: [...graph.edges],
  };

  switch (op) {
    case "Add Node": {
      const id = String(args[0]);
      g.nodes.push({
        id,
        label: id,
        x: 50 + g.nodes.length * 50,
        y: 150,
      });
      return g;
    }

    case "Add Edge": {
      g.edges.push({
        from: String(args[0]),
        to: String(args[1]),
      });
      return g;
    }

    case "BFS": {
      const start = String(args[0]);
      const visited = [];
      const q = [start];

      while (q.length) {
        const v = q.shift();
        if (visited.includes(v)) continue;
        visited.push(v);

        g.edges
          .filter((e) => e.from === v)
          .forEach((e) => q.push(e.to));

        g.edges
          .filter((e) => e.to === v)
          .forEach((e) => q.push(e.from));
      }

      alert("BFS: " + visited.join(", "));
      return g;
    }

    case "DFS": {
      const start = String(args[0]);
      const visited = [];
      const stack = [start];

      while (stack.length) {
        const v = stack.pop();
        if (visited.includes(v)) continue;
        visited.push(v);

        g.edges
          .filter((e) => e.from === v)
          .forEach((e) => stack.push(e.to));

        g.edges
          .filter((e) => e.to === v)
          .forEach((e) => stack.push(e.from));
      }

      alert("DFS: " + visited.join(", "));
      return g;
    }

    default:
      return g;
  }
}
