const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const friendRoutes = require("./routes/friends");
const statsRoutes = require("./routes/stats");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();
app.use(cors());
app.use(express.json());

// 📂 Serva statiska filer från "public"-mappen
app.use(express.static(path.join(__dirname, "public")));

// ✅ Test-rout för att bekräfta att API körs
app.get("/api", (req, res) => {
  res.send("✅ Mimir API is running!");
});

// 🧩 API-routes
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// 🛑 Fallback-route: hanterar 404 för övriga vägar
app.use((req, res) => {
  res.status(404).send("❌ Route not found");
});

// 🚀 Starta server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on port ${PORT}`);
});
