function Node(val) {
  this.val = val;
  this.next = null;
}

export function create(arr) {
  let head = null;
  let tail = null;

  arr.forEach((v) => {
    const n = new Node(v);
    if (!head) {
      head = tail = n;
    } else {
      tail.next = n;
      tail = n;
    }
  });

  return head;
}

export function apply(head, op, args) {
  switch (op) {
    case "Insert Head": {
      const n = new Node(args[0]);
      n.next = head;
      return n;
    }

    case "Insert Tail": {
      const n = new Node(args[0]);
      if (!head) return n;
      let cur = head;
      while (cur.next) cur = cur.next;
      cur.next = n;
      return head;
    }

    case "Insert At": {
      const index = Number(args[0]);
      const value = args[1];
      const n = new Node(value);

      if (index === 0) {
        n.next = head;
        return n;
      }

      let cur = head;
      let i = 0;
      while (cur && i < index - 1) {
        cur = cur.next;
        i++;
      }

      if (!cur) return head;

      n.next = cur.next;
      cur.next = n;
      return head;
    }

    case "Delete At": {
      const index = Number(args[0]);
      if (index === 0 && head) return head.next;

      let cur = head;
      let i = 0;

      while (cur && i < index - 1) {
        cur = cur.next;
        i++;
      }

      if (cur && cur.next) cur.next = cur.next.next;
      return head;
    }

    case "Search": {
      let i = 0;
      let cur = head;
      while (cur) {
        if (String(cur.val) === String(args[0])) {
          alert("Found at index " + i);
          return head;
        }
        cur = cur.next;
        i++;
      }
      alert("Not found");
      return head;
    }

    case "Reverse": {
      let prev = null;
      let cur = head;
      while (cur) {
        let nxt = cur.next;
        cur.next = prev;
        prev = cur;
        cur = nxt;
      }
      return prev;
    }

    default:
      return head;
  }
}
