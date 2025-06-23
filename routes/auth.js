const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const users = []; // 🧠 RAM-lagring istället för Mongo

// === REGISTER ===
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Användarnamn och lösenord krävs" });

  const userExists = users.find((u) => u.username === username);
  if (userExists)
    return res.status(409).json({ error: "Användarnamnet finns redan" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "Registrering lyckades", username });
});

// === LOGIN ===
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user)
    return res.status(401).json({ error: "Fel användarnamn eller lösenord" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ error: "Fel användarnamn eller lösenord" });

  res.json({ message: "Inloggning lyckades", username });
});

module.exports = router;
