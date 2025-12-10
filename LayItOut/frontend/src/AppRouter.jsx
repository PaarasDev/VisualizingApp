// src/AppRouter.jsx
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

/* MAIN PAGES */
import SelectDS from "./pages/SelectDS";
import BuildDS from "./pages/BuildDS";
// import VisualizeDS from "./pages/VisualizeDS";

// ARRAY PAGE
import Array from "./pages/array/Array";

/* LINKED LIST PAGES */
import LinkedListTypes from "./pages/linkedlist/LinkedListTypes";
import SinglyLinkedList from "./pages/linkedlist/SinglyLinkedList";
import DoublyLinkedList from "./pages/linkedlist/DoublyLinkedList";
import CircularLinkedList from "./pages/linkedlist/CircularLinkedList";

/* TREE PAGES */
import TreeTypes from "./pages/tree/TreeTypes";
import BinaryTree from "./pages/tree/BinaryTree";
import BST from "./pages/tree/BST";
import AVLTree from "./pages/tree/AVLTree";
import RedBlackTree from "./pages/tree/RedBlackTree";

/* STACK PAGES */
import StackTypes from "./pages/stack/StackTypes";
import BasicStack from "./pages/stack/BasicStack";
import MinStack from "./pages/stack/MinStack";

/* QUEUE PAGES */
import QueueTypes from "./pages/queue/QueueTypes";
import LinearQueue from "./pages/queue/LinearQueue";
import CircularQueue from "./pages/queue/CircularQueue";
import PriorityQueue from "./pages/queue/PriorityQueue";

/* HEAP PAGES */
import HeapTypes from "./pages/heap/HeapTypes";
import MinHeap from "./pages/heap/MinHeap";
import MaxHeap from "./pages/heap/MaxHeap";

/* GRAPH PAGES */
import GraphTypes from "./pages/graph/GraphTypes";
import DirectedGraph from "./pages/graph/DirectedGraph";
import UndirectedGraph from "./pages/graph/UndirectedGraph";
import WeightedGraph from "./pages/graph/WeightedGraph";

export default function AppRouter() {
  return (
    <>
      <NavBar />

      <Routes>
        {/* HOME ROUTES */}
        <Route path="/" element={<SelectDS />} />
        <Route path="/build" element={<BuildDS />} />


        {/* ARRAY ROUTE */}
        <Route path="/array" element={<Array />} />

        {/* LINKED LIST ROUTES */}
        <Route path="/linkedlist" element={<LinkedListTypes />} />
        <Route path="/linkedlist/singly" element={<SinglyLinkedList />} />
        <Route path="/linkedlist/doubly" element={<DoublyLinkedList />} />
        <Route path="/linkedlist/circular" element={<CircularLinkedList />} />

        {/* TREE ROUTES */}
        <Route path="/tree" element={<TreeTypes />} />
        <Route path="/tree/binary" element={<BinaryTree />} />
        <Route path="/tree/bst" element={<BST />} />
        <Route path="/tree/avl" element={<AVLTree />} />
        <Route path="/tree/redblack" element={<RedBlackTree />} />

        {/* STACK ROUTES */}
        <Route path="/stack" element={<StackTypes />} />
        <Route path="/stack/basic" element={<BasicStack />} />
        <Route path="/stack/min" element={<MinStack />} />

        {/* QUEUE ROUTES */}
        <Route path="/queue" element={<QueueTypes />} />
        <Route path="/queue/linear" element={<LinearQueue />} />
        <Route path="/queue/circular" element={<CircularQueue />} />
        <Route path="/queue/priority" element={<PriorityQueue />} />

        {/* HEAP ROUTES */}
        <Route path="/heap" element={<HeapTypes />} />
        <Route path="/heap/min" element={<MinHeap />} />
        <Route path="/heap/max" element={<MaxHeap />} />

        {/* GRAPH ROUTES */}
        <Route path="/graph" element={<GraphTypes />} />
        <Route path="/graph/directed" element={<DirectedGraph />} />
        <Route path="/graph/undirected" element={<UndirectedGraph />} />
        <Route path="/graph/weighted" element={<WeightedGraph />} />
      </Routes>
    </>
  );
}
