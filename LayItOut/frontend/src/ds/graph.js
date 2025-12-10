function randCoord(w = 700, h = 450) {
  return {
    x: Math.floor(Math.random() * (w - 100)) + 50,
    y: Math.floor(Math.random() * (h - 100)) + 50,
  };
}

export function create(data = [], mode = "directed") {
  const labels = Array.isArray(data) ? data : [];

  const nodes = labels.map((lab, i) => {
    const c = randCoord();
    return { id: String(i), label: String(lab), x: c.x, y: c.y };
  });

  return { nodes, edges: [], traversal: [] };
}

export function apply(state, mode, op, rawArgs = "") {
  // --- Fix: ensure args is always an array ---
  const args = typeof rawArgs === "string"
    ? rawArgs.split(",").map(s => s.trim()).filter(Boolean)
    : rawArgs;

  const s = {
    nodes: state.nodes.map(n => ({ ...n })),
    edges: state.edges.map(e => ({ ...e })),
    traversal: []
  };

  const m = mode.toLowerCase();

  // ------------------ ADD NODE ------------------
  if (op === "Add Node") {
    const id = String(s.nodes.length);
    const label = args[0] ?? id;
    const c = randCoord();
    s.nodes.push({ id, label, x: c.x, y: c.y });
    return s;
  }

  // ------------------ REMOVE NODE ------------------
  if (op === "Remove Node") {
    const id = String(args[0]);
    s.nodes = s.nodes.filter(n => n.id !== id);
    s.edges = s.edges.filter(e => e.from !== id && e.to !== id);
    return s;
  }

  // ------------------ ADD EDGE ------------------
  if (op === "Add Edge") {
    const from = String(args[0]);
    const to = String(args[1]);

    let weight = undefined;
    if (m === "weighted") weight = Number(args[2] ?? 1);

    const directed = m !== "undirected";

    const exists = s.edges.some(e =>
      (e.from === from && e.to === to) ||
      (!directed && (e.from === to && e.to === from))
    );

    if (!exists) s.edges.push({ from, to, weight });

    return s;
  }

  // ------------------ REMOVE EDGE ------------------
  if (op === "Remove Edge") {
    const from = String(args[0]);
    const to = String(args[1]);

    if (m === "undirected") {
      s.edges = s.edges.filter(
        e => !(
          (e.from === from && e.to === to) ||
          (e.from === to && e.to === from)
        )
      );
    } else {
      s.edges = s.edges.filter(e => !(e.from === from && e.to === to));
    }
    return s;
  }

  // ------------------ RANDOMIZE POSITIONS ------------------
  if (op === "Randomize") {
    s.nodes = s.nodes.map(n => ({ ...n, ...randCoord() }));
    return s;
  }

  // ------------------ BFS ------------------
  if (op === "BFS") {
    const start = String(args[0]);
    const queue = [start];
    const visited = new Set();
    const order = [];

    while (queue.length) {
      const curr = queue.shift();
      if (visited.has(curr)) continue;

      visited.add(curr);
      order.push(curr);

      // Neighbors depend on directed vs undirected
      let neighbors = s.edges
        .filter(e => e.from === curr)
        .map(e => e.to);

      if (m === "undirected") {
        const reverse = s.edges
          .filter(e => e.to === curr)
          .map(e => e.from);
        neighbors.push(...reverse);
      }

      neighbors.forEach(n => {
        if (!visited.has(n)) queue.push(n);
      });
    }

    s.traversal = order;
    return s;
  }

  // ------------------ DFS ------------------
  if (op === "DFS") {
    const start = String(args[0]);
    const visited = new Set();
    const order = [];

    function dfs(v) {
      if (visited.has(v)) return;
      visited.add(v);
      order.push(v);

      let neighbors = s.edges
        .filter(e => e.from === v)
        .map(e => e.to);

      if (m === "undirected") {
        const reverse = s.edges
          .filter(e => e.to === v)
          .map(e => e.from);
        neighbors.push(...reverse);
      }

      neighbors.forEach((n) => dfs(n));
    }

    dfs(start);
    s.traversal = order;
    return s;
  }

  // ------------------ CLEAR ------------------
  if (op === "Clear") {
    return { nodes: [], edges: [], traversal: [] };
  }

  return s;
}
