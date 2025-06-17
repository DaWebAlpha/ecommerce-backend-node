import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = []; // Simple in-memory store (replace with database in real app)

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validations
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password too short" });
  }

  // Simulate user check
  const existing = users.find(user => user.username === username);
  if (existing) {
    return res.status(409).json({ error: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });

  console.log("✅ New user registered:", username);
  res.status(200).json({ message: "User registered" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
