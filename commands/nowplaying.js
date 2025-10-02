const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Muestra la canción actual'),

  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue || !queue.songs.length) {
      return interaction.reply({ content: '🚫 No hay música en reproducción.', ephemeral: true });
    }

    const song = queue.songs[0];

    const embed = new EmbedBuilder()
      .setTitle('🎧 Reproduciendo ahora')
      .setDescription(`[${song.name}](${song.url})\nDuración: \`${song.formattedDuration}\``)
      .setThumbnail(song.thumbnail)
      .setColor(0xffcc00)
      .setFooter({ text: `Solicitado por ${song.user?.username || 'Desconocido'}` });

    interaction.reply({ embeds: [embed] });
  },
};
