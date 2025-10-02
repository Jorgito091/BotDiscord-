const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Salta la canción actual'),

  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.reply({ content: '🚫 No hay música en reproducción.', ephemeral: true });

    try {
      await interaction.client.distube.skip(interaction.guildId);
      interaction.reply('⏭️ Canción saltada.');
    } catch (err) {
      console.error(err);
      interaction.reply({ content: '❌ No se pudo saltar la canción.', ephemeral: true });
    }
  },
};
