// Importar dependencias
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Crear cliente de Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

// Inicializar DisTube (sin leaveOnEmpty ni opciones obsoletas)
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new YtDlpPlugin()],
});

// Eventos de DisTube
client.distube
  .on("playSong", (queue, song) => {
    queue.textChannel?.send(`🎶 Reproduciendo: **${song.name}**`);
  })
  .on("addSong", (queue, song) => {
    queue.textChannel?.send(`✅ Añadida: **${song.name}**`);
  })
  .on("empty", queue => {
    queue.voice?.leave();
    queue.textChannel?.send("💨 El canal está vacío, salgo automáticamente.");
  })
  .on("error", (channel, error) => {
    console.error(error);
    if (channel) channel.send("❌ Ocurrió un error al reproducir la canción.");
  });

// Cargar comandos automáticamente
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Manejar interacción de comandos
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "❌ Ocurrió un error al ejecutar el comando.", ephemeral: true });
  }
});

// Iniciar sesión
client.once("ready", () => {
  console.log(`✅ Conectado como ${client.user.tag}`);
});

client.login(process.env.TOKEN);
