const restricted = [
    'to-do',
    'test',
    'done',
  ];
  
  module.exports = (client) => {
    client.on('messageCreate', async (message) => {
      if (message.author.id !== client.user.id && restricted.includes(message.channel.name)) {
        await message.delete();
  
        const warning = await message.channel.send({
          content: `⚠️ Only the Kanban bot can post here. Use #kanban-prompt instead.`,
        });
  
        setTimeout(() => warning.delete().catch(() => {}), 5000);
      }
    });
  };