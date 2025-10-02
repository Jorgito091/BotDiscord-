const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: '❌ Error al ejecutar el comando.', ephemeral: true });
  }
});

// Configuración de Distube con yt-dlp del venv y solo audio MP3
const distube = new DisTube(client, {
  plugins: [new YtDlpPlugin({
    update: false,
    youtubeDL: false,
    ytdlOptions: {
      dlPath: "C:\\Users\\PC\\mi-bot-discord\\venv\\Scripts\\yt-dlp.exe", // ruta a yt-dlp del venv
      format: "bestaudio",
      extractAudio: true,
      audioFormat: "mp3",
      audioQuality: 0,
      highWaterMark: 1024 * 1024 * 64, // para streams largos
    }
  })],
});

client.distube = distube;

client.once('ready', () => {
  console.log(`✅ Bot listo como ${client.user.tag}`);
});

// Evento para enviar embed cuando se reproduce una canción
distube.on('playSong', (queue, song) => {
  queue.textChannel.send({
    embeds: [{
      title: `🎶 Reproduciendo: ${song.name}`,
      url: song.url,
      description: `Duración: \`${song.formattedDuration}\``,
      thumbnail: { url: song.thumbnail },
      footer: { text: `Solicitado por ${song.user.tag}` },
      color: 0x1DB954,
    }]
  });
});

client.login(process.env.TOKEN);
