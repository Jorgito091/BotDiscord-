const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Detiene la música y limpia la cola'),

  async execute(interaction) {
    try {
      await interaction.client.distube.stop(interaction.guildId);
      interaction.reply('🛑 Música detenida.');
    } catch {
      interaction.reply({ content: '❌ No hay música para detener.', ephemeral: true });
    }
  },
};
