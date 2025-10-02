const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hyakkano')
    .setDescription('Muestra un gif aleatorio de Hyakkano'),

  async execute(interaction) {
    const gifs = [
      'https://media.tenor.com/XMHxgnC4G3kAAAAd/shizuka-yoshimoto.gif',
      'https://media.tenor.com/YZS6mMckxEkAAAAd/100-girlfriends-shizuka-yoshimoto.gif',
      'https://media.tenor.com/U0mLOVmt3HUAAAAd/kurumi-haraga.gif',
      'https://media.tenor.com/ybaNZ3mBaYAAAAAd/100-girlfriends-shizuka-kusuri.gif',
      'https://media.tenor.com/ox0n19l4mm0AAAAd/eiai-nano-%D9%83%D9%88%D8%AC%D9%8A.gif',
      'https://media.tenor.com/hECydhO1kO4AAAAd/100-girlfriends-iku-sutou.gif',
      'https://media.tenor.com/qBf6Jnhq6RMAAAAd/hyakkano-100-girlfriends.gif',
      'https://media.tenor.com/obBBHvCCQi4AAAAd/utsukushisugi-mimimi.gif',
      'https://media.tenor.com/6XnCDvUrsl0AAAAd/hakari-100-girlfriends.gif',
      'https://media.tenor.com/AQJatnGRvIoAAAAd/100-kanojo-hyakkano.gif',
      'https://media.tenor.com/63gAA9iR9qgAAAAd/hyakkano-100-girlfriends.gif',
      'https://media.tenor.com/sE5VdabQeJcAAAAd/karane-anime.gif',
    ];
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setTitle('🎴 The Goat of all time')
      .setDescription(`Bombocalt ${interaction.user}`)
      .setImage(randomGif)
      .setColor(0xff66cc)
      .setFooter({ text: 'Hyakkano supremacy 💖' });

    await interaction.reply({ embeds: [embed] });
  },
};
