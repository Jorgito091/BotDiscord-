const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skipto')
    .setDescription('Salta a una canción específica en la cola')
    .addIntegerOption(option =>
      option.setName('position').setDescription('Posición de la canción').setRequired(true)
    ),
  async execute(interaction) {
    const position = interaction.options.getInteger('position');
    const queue = interaction.client.distube.getQueue(interaction.guildId);

    if (!queue || !queue.songs.length) {
      return interaction.reply({ content: '❌ No hay ninguna cola activa.', ephemeral: true });
    }

    if (position < 1 || position > queue.songs.length) {
      return interaction.reply({
        content: `❌ Pon un número entre 1 y ${queue.songs.length}.`,
        ephemeral: true,
      });
    }

    try {
      await queue.jump(position - 1);
      interaction.reply(`⏩ Saltando a la canción #${position}: \`${queue.songs[position - 1].name}\``);
    } catch {
      interaction.reply({ content: '❌ No se pudo saltar a esa posición.', ephemeral: true });
    }
  },
};
