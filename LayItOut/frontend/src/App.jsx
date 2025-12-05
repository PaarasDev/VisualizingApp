import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectDS from "./pages/SelectDS";
import BuildDS from "./pages/BuildDS";
import VisualizeDS from "./pages/VisualizeDS";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectDS />} />
        <Route path="/build/:dsType" element={<BuildDS />} />
        <Route path="/visualize/:dsType" element={<VisualizeDS />} />
      </Routes>
    </BrowserRouter>
  );
}
