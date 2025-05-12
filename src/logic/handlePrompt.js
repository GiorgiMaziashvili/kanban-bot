const { EmbedBuilder } = require('discord.js');

const emojiMap = {
  TODO: '📋',    
  TEST: '🔍',    
  DONE: '✅',    
  DELETE: '❌', 
};

const teamMap = {
  FRONT: 'front',
  BACK: 'back',
  APP: 'app',
};

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if((message.content.includes('yle') || message.content.includes('ყლე')) && message.author.id !== client.user.id){
      const promptChannel = message.guild.channels.cache.find(c =>
        c.id === message.channelId
      );
      promptChannel.send(`აქ ყლე არავინაა 🍆, \n <@${message.author.id}>`)
    }
    
    if (message.channel.id !== process.env.PROMPT_CHANNEL_ID) return;
    if (message.author.bot) return;

    const lines = message.content.split('\n');

    for (const line of lines) {
      const match = line.match(/\*\s*(\w+):\s*(.+)/);
      if (!match) continue;

      const [, teamRaw, task] = match;
      const team = teamRaw.toUpperCase();
      const teamKey = teamMap[team];
      if (!teamKey) continue;

      const toDoChannel = message.guild.channels.cache.find(c =>
        c.name === 'to-do' &&
        c.parent?.name.toLowerCase().includes(teamKey)
      );
      
      if (!toDoChannel) continue;

      const embed = new EmbedBuilder()
        .setColor(0xFDBA74) // orange for TODO
        .setTitle(`🟨 TODO`)
        // .setDescription(task)
        .addFields({ name: '\u200B', value: '\u200B' },)
        .addFields({ name: 'Description:', value: task })
        .addFields({ name: '\u200B', value: '\u200B' },)
        
        .setImage('https://your-image-url.png')
        .setTimestamp()
        .setFooter({ text: `Created by: ${message.author.globalName}`})

      const sent = await toDoChannel.send({ embeds: [embed] });

      for (const emoji of Object.values(emojiMap)) {
        if (emoji === emojiMap.TODO) continue; // don't re-add TODO
        await sent.react(emoji);
      }

      
    }
  });
};
