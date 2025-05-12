// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('✅ Discord Kanban Bot is running!');
});

app.listen(PORT, () => {
  console.log(`🌐 Server listening on port ${PORT}`);
});

// Start the bot
require('./src/index');
