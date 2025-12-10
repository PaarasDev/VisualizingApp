// src/ds/tree.js
// Unified tree implementation for Binary Tree, BST, AVL, and a correct Red-Black Tree.
// Exports: create(arr, mode), apply(root, mode, op, args)
// Modes: "Tree" (complete binary), "BST", "AVL", "RBT"

function TNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
  this.parent = null;    // used by RBT
  this.color = "black";  // red or black (RBT)
  this.height = 1;       // AVL
}

/* -------------------- COMPLETE BINARY TREE (level-order build) -------------------- */
function buildBinary(arr = []) {
  if (!arr.length) return null;
  const nodes = arr.map(v => (v === null ? null : new TNode(v)));
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (!n) continue;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < nodes.length) {
      nodes[l] && (nodes[l].parent = n);
      n.left = nodes[l];
    }
    if (r < nodes.length) {
      nodes[r] && (nodes[r].parent = n);
      n.right = nodes[r];
    }
  }
  return nodes[0];
}

/* -------------------- BST helpers -------------------- */
function bstInsert(root, val) {
  if (!root) return new TNode(val);
  if (val < root.val) root.left = bstInsert(root.left, val);
  else root.right = bstInsert(root.right, val);
  return root;
}

function bstSearch(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  return val < root.val ? bstSearch(root.left, val) : bstSearch(root.right, val);
}

function bstDelete(root, val) {
  if (!root) return null;
  if (val < root.val) root.left = bstDelete(root.left, val);
  else if (val > root.val) root.right = bstDelete(root.right, val);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let succ = root.right;
    while (succ.left) succ = succ.left;
    root.val = succ.val;
    root.right = bstDelete(root.right, succ.val);
  }
  return root;
}

/* -------------------- AVL helpers -------------------- */
function height(n) { return n ? n.height || 1 : 0; }
function updateHeight(n) { if (n) n.height = 1 + Math.max(height(n.left), height(n.right)); }

function rotateRight(y) {
  const x = y.left;
  const t2 = x.right;
  x.right = y;
  y.left = t2;
  updateHeight(y);
  updateHeight(x);
  return x;
}

function rotateLeft(x) {
  const y = x.right;
  const t2 = y.left;
  y.left = x;
  x.right = t2;
  updateHeight(x);
  updateHeight(y);
  return y;
}

function getBalance(n) {
  return n ? height(n.left) - height(n.right) : 0;
}

function avlInsert(root, val) {
  if (!root) return new TNode(val);
  if (val < root.val) root.left = avlInsert(root.left, val);
  else root.right = avlInsert(root.right, val);
  updateHeight(root);
  const bal = getBalance(root);
  if (bal > 1 && val < root.left.val) return rotateRight(root);
  if (bal < -1 && val > root.right.val) return rotateLeft(root);
  if (bal > 1 && val > root.left.val) {
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }
  if (bal < -1 && val < root.right.val) {
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }
  return root;
}

/* -------------------- RED-BLACK TREE (correct insertion) -------------------- */

// helpers
function isRed(n) { return !!n && n.color === "red"; }
function isBlack(n) { return !n || n.color === "black"; }
function setBlack(n) { if (n) n.color = "black"; }
function setRed(n) { if (n) n.color = "red"; }

// rotate left around x, return new root
function rbtRotateLeft(root, x) {
  const y = x.right;
  if (!y) return root;
  x.right = y.left;
  if (y.left) y.left.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;
  y.left = x;
  x.parent = y;
  return root;
}

// rotate right around x, return new root
function rbtRotateRight(root, x) {
  const y = x.left;
  if (!y) return root;
  x.left = y.right;
  if (y.right) y.right.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.right) x.parent.right = y;
  else x.parent.left = y;
  y.right = x;
  x.parent = y;
  return root;
}

// fixup after insert
function rbtFix(root, n) {
  while (n && n.parent && n.parent.color === "red") {
    const parent = n.parent;
    const grand = parent.parent;
    if (!grand) break;

    if (parent === grand.left) {
      const uncle = grand.right;
      if (isRed(uncle)) {
        // case 1: recolor
        setBlack(parent);
        setBlack(uncle);
        setRed(grand);
        n = grand;
      } else {
        // case 2: left-right
        if (n === parent.right) {
          n = parent;
          root = rbtRotateLeft(root, n);
        }
        // case 3: left-left
        setBlack(parent);
        setRed(grand);
        root = rbtRotateRight(root, grand);
      }
    } else {
      // parent is right child
      const uncle = grand.left;
      if (isRed(uncle)) {
        // case 1 mirror
        setBlack(parent);
        setBlack(uncle);
        setRed(grand);
        n = grand;
      } else {
        // case 2: right-left
        if (n === parent.left) {
          n = parent;
          root = rbtRotateRight(root, n);
        }
        // case 3: right-right
        setBlack(parent);
        setRed(grand);
        root = rbtRotateLeft(root, grand);
      }
    }
  }
  setBlack(root);
  return root;
}

// insert preserving RBT invariants (returns new root)
function rbtInsert(root, val) {
  // BST insert with parent pointer
  const node = new TNode(val);
  node.color = "red";

  if (!root) {
    node.color = "black";
    return node;
  }

  let curr = root;
  let parent = null;
  while (curr) {
    parent = curr;
    if (val < curr.val) curr = curr.left;
    else curr = curr.right;
  }

  node.parent = parent;
  if (val < parent.val) parent.left = node;
  else parent.right = node;

  // fix violations
  root = rbtFix(root, node);
  return root;
}

// RBT search (same as BST search)
function rbtSearch(root, val) {
  return bstSearch(root, val);
}

/* -------------------- TRAVERSALS -------------------- */
function inorderCollect(root, out) {
  if (!root) return out;
  inorderCollect(root.left, out);
  out.push(root.val);
  inorderCollect(root.right, out);
  return out;
}

function preorderCollect(root, out) {
  if (!root) return out;
  out.push(root.val);
  preorderCollect(root.left, out);
  preorderCollect(root.right, out);
  return out;
}

function postorderCollect(root, out) {
  if (!root) return out;
  postorderCollect(root.left, out);
  postorderCollect(root.right, out);
  out.push(root.val);
  return out;
}

/* -------------------- PUBLIC API: create() -------------------- */
export function create(arr = [], mode = "Tree") {
  const m = (mode || "Tree").toUpperCase();
  if (!Array.isArray(arr)) arr = [];

  if (m === "TREE") return buildBinary(arr);
  if (m === "BST") {
    let root = null;
    for (const v of arr) root = bstInsert(root, v);
    return root;
  }
  if (m === "AVL") {
    let root = null;
    for (const v of arr) root = avlInsert(root, v);
    return root;
  }
  if (m === "RBT") {
    let root = null;
    for (const v of arr) root = rbtInsert(root, v);
    return root;
  }
  return buildBinary(arr);
}

/* -------------------- PUBLIC API: apply() -------------------- */
export function apply(root, mode = "Tree", op = "", args = []) {
  const m = (mode || "Tree").toUpperCase();
  const val = args && args.length ? args[0] : undefined;

  switch (m) {
    case "TREE":
      if (op === "Insert") {
        if (!root) return new TNode(val);
        const q = [root];
        while (q.length) {
          const n = q.shift();
          if (!n.left) { n.left = new TNode(val); n.left.parent = n; break; }
          if (!n.right) { n.right = new TNode(val); n.right.parent = n; break; }
          q.push(n.left); q.push(n.right);
        }
        return root;
      }
      if (op === "Search") {
        if (!root) return null;
        const q = [root];
        while (q.length) {
          const n = q.shift();
          if (n.val === val) return n;
          if (n.left) q.push(n.left);
          if (n.right) q.push(n.right);
        }
        return null;
      }
      return root;

    case "BST":
      if (op === "Insert") return bstInsert(root, val);
      if (op === "Delete") return bstDelete(root, val);
      if (op === "Search") return bstSearch(root, val);
      if (op === "Inorder") return inorderCollect(root, []);
      if (op === "Preorder") return preorderCollect(root, []);
      if (op === "Postorder") return postorderCollect(root, []);
      return root;

    case "AVL":
      if (op === "Insert") return avlInsert(root, val);
      if (op === "Delete") {
        root = bstDelete(root, val);
        const vals = [];
        (function inorder(n) { if (!n) return; inorder(n.left); vals.push(n.val); inorder(n.right); })(root);
        let nr = null; for (const v of vals) nr = avlInsert(nr, v);
        return nr;
      }
      if (op === "Search") return bstSearch(root, val);
      if (op === "Inorder") return inorderCollect(root, []);
      if (op === "Preorder") return preorderCollect(root, []);
      if (op === "Postorder") return postorderCollect(root, []);
      return root;

    case "RBT":
      if (op === "Insert") return rbtInsert(root, val);
      if (op === "Search") return rbtSearch(root, val);
      if (op === "Inorder") return inorderCollect(root, []);
      if (op === "Preorder") return preorderCollect(root, []);
      if (op === "Postorder") return postorderCollect(root, []);
      if (op === "Clear") return null;
      return root;

    default:
      return root;
  }
}
