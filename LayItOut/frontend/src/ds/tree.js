function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

export function create(arr) {
  if (!arr.length) return null;

  const nodes = arr.map((v) => (v === null ? null : new Node(v)));

  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i]) continue;

    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < nodes.length) nodes[i].left = nodes[l];
    if (r < nodes.length) nodes[i].right = nodes[r];
  }

  return nodes[0];
}

export function apply(root, op, args) {
  if (!root && op === "Insert") {
    return new Node(args[0]);
  }

  switch (op) {
    case "Insert": {
      const q = [root];
      while (q.length) {
        const n = q.shift();
        if (!n.left) {
          n.left = new Node(args[0]);
          break;
        }
        if (!n.right) {
          n.right = new Node(args[0]);
          break;
        }
        q.push(n.left);
        q.push(n.right);
      }
      return root;
    }

    case "Search": {
      const q = [root];
      while (q.length) {
        const n = q.shift();
        if (String(n.val) === String(args[0])) {
          alert("Found");
          return root;
        }
        if (n.left) q.push(n.left);
        if (n.right) q.push(n.right);
      }
      alert("Not found");
      return root;
    }

    case "Inorder": {
      const res = [];
      function dfs(n) {
        if (!n) return;
        dfs(n.left);
        res.push(n.val);
        dfs(n.right);
      }
      dfs(root);
      alert(res.join(", "));
      return root;
    }

    case "Preorder": {
      const res = [];
      function dfs(n) {
        if (!n) return;
        res.push(n.val);
        dfs(n.left);
        dfs(n.right);
      }
      dfs(root);
      alert(res.join(", "));
      return root;
    }

    case "Postorder": {
      const res = [];
      function dfs(n) {
        if (!n) return;
        dfs(n.left);
        dfs(n.right);
        res.push(n.val);
      }
      dfs(root);
      alert(res.join(", "));
      return root;
    }

    case "LevelOrder": {
      const res = [];
      const q = [root];
      while (q.length) {
        const n = q.shift();
        res.push(n.val);
        if (n.left) q.push(n.left);
        if (n.right) q.push(n.right);
      }
      alert(res.join(", "));
      return root;
    }

    default:
      return root;
  }
}
