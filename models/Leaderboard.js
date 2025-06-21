const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
    game: String,
    rankings: [Object]
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
