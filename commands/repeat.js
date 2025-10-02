const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('repeat')
    .setDescription('Cambia el modo de repetición')
    .addStringOption(option =>
      option
        .setName('mode')
        .setDescription('song / queue / off')
        .setRequired(true)
        .addChoices(
          { name: 'song', value: 'song' },
          { name: 'queue', value: 'queue' },
          { name: 'off', value: 'off' },
        )
    ),

  async execute(interaction) {
    const modeArg = interaction.options.getString('mode');
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.reply({ content: '🚫 No hay música.', ephemeral: true });

    let mode = 0;
    if (modeArg === 'song') mode = 1;
    else if (modeArg === 'queue') mode = 2;

    interaction.client.distube.setRepeatMode(queue, mode);

    const modeText = mode === 0 ? '🔁 Repetición desactivada'
                  : mode === 1 ? '🔂 Repetir **una canción**'
                  : '🔁 Repetir **toda la cola**';

    interaction.reply(modeText);
  },
};
