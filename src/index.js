// src/index.js
require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.once('ready', async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);

  const { createKanbanStructure } = require('./setup/createStructure');
  const guild = await client.guilds.fetch(process.env.GUILD_ID);
  await createKanbanStructure(guild);
});

// Register logic modules
require('./logic/handlePrompt')(client);
require('./logic/handleReactions')(client);
require('./logic/restrictChannels')(client);

client.login(process.env.DISCORD_TOKEN);