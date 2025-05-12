const { EmbedBuilder } = require('discord.js');

const emojiToChannel = {
  '📋': 'to-do',
  '🔍': 'test',
  '✅': 'done',
};

const statusColors = {
  TODO: 0xFDBA74,
  INPROGRESS: 0x93C5FD,
  DONE: 0x86EFAC,
  TEST: 0xA5B4FC,
  FIXED: 0xFCD34D,
};

module.exports = (client) => {
  client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    const emoji = reaction.emoji.name;
    const targetChannelName = emojiToChannel[emoji];

    if (!targetChannelName) {
      if (emoji === '🗑️') {
        await reaction.message.delete();
      }
      return;
    }

    const currentChannel = reaction.message.channel;
    if (currentChannel.name === targetChannelName) return;

    const parent = currentChannel.parent;
    const targetChannel = currentChannel.guild.channels.cache.find(
      c => c.name === targetChannelName && c.parentId === parent.id
    );

    if (!targetChannel) return;

    const embed = reaction.message.embeds[0];
    if (!embed) return;

    const newStatus = targetChannelName.toUpperCase(); // e.g. INPROGRESS
    const newEmbed = EmbedBuilder.from(embed)
      .setTitle(`${emoji} ${newStatus}`)
      .setColor(statusColors[newStatus] || 0xffffff)
      .setTimestamp();

    const newMessage = await targetChannel.send({ embeds: [newEmbed] });
    await reaction.message.delete();

    for (const [e, chName] of Object.entries(emojiToChannel)) {
      if (chName !== targetChannel.name) {
        await newMessage.react(e);
      }
    }

    await newMessage.react('🗑️');
  });
};
