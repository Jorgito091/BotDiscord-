const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Muestra la cola actual'),

  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue || !queue.songs.length) {
      return interaction.reply({ content: '🚫 No hay canciones en la cola.', ephemeral: true });
    }

    const q = queue.songs
      .map((song, i) => `${i + 1}. ${song.name} (${song.formattedDuration})`)
      .join('\n');

    const embed = new EmbedBuilder()
      .setTitle('🎶 Cola actual')
      .setDescription(q)
      .setColor(0x00ccff);

    interaction.reply({ embeds: [embed] });
  },
};
