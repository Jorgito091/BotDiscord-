const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Reproduce una canción o playlist')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Nombre o URL de la canción')
        .setRequired(true)
    ),

  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({ content: '❌ Entra a un canal de voz primero.', ephemeral: true });
    }

    let query = interaction.options.getString('query');

   
    try {
      const url = new URL(query);
      const v = url.searchParams.get('v');
      if (url.hostname.includes('youtube.com') && url.searchParams.get('list')?.startsWith('RD') && v) {
        query = `https://www.youtube.com/watch?v=${v}`;
      }
    } catch {}

    await interaction.reply(`🔎 Buscando: \`${query}\``);

    try {
      await interaction.client.distube.play(voiceChannel, query, {
        member: interaction.member,
        textChannel: interaction.channel,
      });
    } catch (err) {
      console.error(err);
      interaction.followUp({ content: '❌ Error al reproducir la canción.', ephemeral: true });
    }
  },
};
