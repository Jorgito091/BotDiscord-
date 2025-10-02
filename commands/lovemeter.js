const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('icon')
    .setDescription('Muestra tu avatar con estilo'),

  async execute(interaction) {
    const avatarUrl = interaction.user.displayAvatarURL({ extension: 'png', size: 1024, dynamic: true });

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}, Hyakkano`)
      .setDescription(`Invocado por ${interaction.user}`)
      .setImage(avatarUrl)
      .setColor(0x00ffcc)
      .setFooter({ text: 'Bomboclat' });

    await interaction.reply({ embeds: [embed] });
  },
};
