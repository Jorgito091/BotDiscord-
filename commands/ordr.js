const { InteractionResponseFlags } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
  data: {
    name: 'ordr',
    description: 'Envía un replay de osu! al render de Ordr',
  },
  async execute(interaction) {
    try {
      const osrFile = path.join(__dirname, 'temp', 'mi-replay.osr');

      // Checamos que el archivo exista
      if (!fs.existsSync(osrFile)) {
        return interaction.reply({
          content: 'No se encontró el archivo .osr.',
          flags: InteractionResponseFlags.Ephemeral
        });
      }

      await interaction.reply({
        content: 'Subiendo replay a Ordr...',
        flags: InteractionResponseFlags.Ephemeral
      });

      // Aquí va la lógica de Puppeteer para subir el OSR a Ordr y obtener el link
      const renderLink = 'https://ordr.issou.best/render/abc123'; // ejemplo

      // Mandamos el archivo y el link al usuario
      await interaction.followUp({
        content: `Tu replay ha sido procesado: ${renderLink}`,
        files: [osrFile]
      });

      // Opcional: borrar el archivo temporal
      fs.unlinkSync(osrFile);

    } catch (error) {
      console.error(error);
      if (!interaction.replied) {
        await interaction.reply({
          content: 'Ocurrió un error al procesar tu replay.',
          flags: InteractionResponseFlags.Ephemeral
        });
      }
    }
  }
};
