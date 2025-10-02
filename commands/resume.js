const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Reanuda la música pausada'),

  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.reply({ content: '🚫 No hay música pausada.', ephemeral: true });

    try {
      await queue.resume();
      interaction.reply('▶️ Música reanudada.');
    } catch (err) {
      console.error(err);
      interaction.reply({ content: '❌ No se pudo reanudar.', ephemeral: true });
    }
  },
};
