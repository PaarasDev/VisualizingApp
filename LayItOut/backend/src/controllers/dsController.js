// In-memory store
let memoryStore = {};
let autoId = 1;

// Simple test API
export const testAPI = (req, res) => {
  res.json({ success: true, message: "DS API working ✔ (No DB)" });
};

// Save DS state (in-memory)
export const saveState = (req, res) => {
  const { dsType, input, output } = req.body;

  const id = autoId++;
  memoryStore[id] = { id, dsType, input, output };

  res.json({ success: true, id });
};

// Load saved DS state
export const loadState = (req, res) => {
  const { id } = req.params;

  const data = memoryStore[id];
  if (!data)
    return res.json({ success: false, message: "No saved state found" });

  res.json({ success: true, data });
};
