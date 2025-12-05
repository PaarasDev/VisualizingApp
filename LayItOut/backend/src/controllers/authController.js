import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// In-memory user store
let users = [];   // { id, name, email, passwordHash }
let userId = 1;

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // check if exists
  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.json({ success: false, message: "Email already registered" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    id: userId++,
    name,
    email,
    passwordHash,
  };

  users.push(user);

  res.json({
    success: true,
    message: "User registered",
    user: { id: user.id, name: user.name, email: user.email },
    token: generateToken(user.id),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  res.json({
    success: true,
    message: "Login success",
    user: { id: user.id, name: user.name, email: user.email },
    token: generateToken(user.id),
  });
};

export const me = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email },
  });
};
