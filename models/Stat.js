const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
    username: String,
    game: String,
    data: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Stat', StatSchema);
