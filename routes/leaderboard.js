const express = require("express");
const router = express.Router();
const db = require("../db.js");

// GET – Kontrollruta
// Gå till: https://5b64a943-af57-4396-befe-b9b5d36d484f-00-2akqxpp85lu04.spock.replit.dev/api/leaderboard
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("stats");

    // Hämta de 10 bästa resultaten för spelet "memirquiz"
    const topScores = await collection
      .find({ game: "memirquiz" })
      .sort({ score: -1, timestamp: -1 })
      .limit(10)
      .toArray();

    res.json(topScores);
  } catch (err) {
    console.error("Fel vid hämtning av leaderboard:", err);
    res.status(500).send("Kunde inte hämta leaderboard");
  }
});

// POST – Lägg till dummydata
// Gå till: https://5b64a943-af57-4396-befe-b9b5d36d484f-00-2akqxpp85lu04.spock.replit.dev/api/leaderboard/dummy
router.post("/dummy", async (req, res) => {
  try {
    const collection = db.collection("stats");

    const dummyEntry = {
      username: "TestUser",
      game: "memirquiz",
      score: 7,
      total: 8,
      timestamp: new Date(),
    };

    await collection.insertOne(dummyEntry);
    res.send("✅ Dummydata tillagd!");
  } catch (err) {
    console.error("Fel vid dummyinsert:", err);
    res.status(500).send("Något gick fel!");
  }
});

module.exports = router;
