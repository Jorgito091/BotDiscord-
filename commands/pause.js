const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pausa la música actual'),

  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '🚫 No hay música reproduciéndose.', ephemeral: true });
    }

    try {
      await queue.pause();
      interaction.reply('⏸ Música pausada.');
    } catch (err) {
      console.error(err);
      interaction.reply({ content: '❌ No se pudo pausar.', ephemeral: true });
    }
  },
};
