const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Todo lo que hay '),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📜 Comandos disponibles')
      .setDescription('Aquí tienes una lista de comandos que puedes usar:')
      .addFields(
        {
          name: '🎶 Música',
          value:
            '`/play <canción o URL>` — Reproduce música.\n' +
            '`/skip` — Salta a la siguiente canción.\n' +
            '`/stop` — Detiene la música.\n' +
            '`/pause` — Pausa la música.\n' +
            '`/resume` — Reanuda la música.\n' +
            '`/queue` — Muestra la cola actual.\n' +
            '`/nowplaying` — Muestra la canción actual.\n' +
            '`/repeat [song|queue|off]` — Cambia el modo de repetición.',
        },
        {
          name: '💖 Bomboclat',
          value:
            '`/hyakkano` — Muestra un gif aleatorio de Hyakkano.\n' +
            '`/icon` — Muestra tu avatar con estilo.\n' +
            '`/lovemeter [@usuario]` — Mide tu amor con alguien.',
        },
        
      )
      .setColor(0x0099ff)
      .setFooter({ text: 'Hyakkano the goat of all time' });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
