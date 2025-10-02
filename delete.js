const { REST, Routes } = require('discord.js');
require('dotenv').config();

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    const data = await rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID));
    console.log(`Comandos guild actuales: ${data.length}`);

    for (const command of data) {
      console.log(`Eliminando comando ${command.name} (${command.id})`);
      await rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, command.id));
    }

    console.log('✅ Comandos guild eliminados.');
  } catch (error) {
    console.error(error);
  }
})();
