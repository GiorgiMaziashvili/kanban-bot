const { ChannelType, PermissionsBitField } = require('discord.js');

const teams = [
  { emoji: '💻', name: 'Front' },
  { emoji: '🔧', name: 'Back' },
  { emoji: '📱', name: 'App' },
];

const subChannels = [
  'to-do',
  'in-progress',
  'done',
  'test',
  'fixed',
];

async function createKanbanStructure(guild) {
  for (const { emoji, name } of teams) {
    const categoryName = `${emoji} | ${name}`;
    let category = guild.channels.cache.find(
      c => c.name === categoryName && c.type === ChannelType.GuildCategory
    );
    if (!category) {
      category = await guild.channels.create({
        name: categoryName,
        type: ChannelType.GuildCategory,
      });
    }

    for (const sub of subChannels) {
      const channelName = sub;
      const exists = guild.channels.cache.find(
        c => c.name === channelName && c.parentId === category.id
      );

      if (!exists) {
        await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: category,
          permissionOverwrites: [
            {
                id: guild.roles.everyone,
                deny: [PermissionsBitField.Flags.SendMessages],
              },
              {
                id: guild.members.me.id,
                allow: [
                  PermissionsBitField.Flags.SendMessages,
                  PermissionsBitField.Flags.AddReactions,
                ],
              },
            
          ],
        });
      }
    }
  }
}

module.exports = { createKanbanStructure };
