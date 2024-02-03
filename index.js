const { Client, Partials, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config/config');

const client = new Client({ intents: [ 32767 ], partials: [ Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction ], });

require('http').createServer((req, res) => res.end('Ready.')).listen(3000);

const AuthenticationToken = process.env.TOKEN || config.Client.TOKEN;
if (!AuthenticationToken) {
  console.warn("[CRASH] Authentication Token for Discord bot is required! Use Envrionment Secrets or config.js.".red)
  return process.exit();
};

client.slash_commands = new Collection();
client.events = new Collection();

module.exports = client;

["application_commands", "events"].forEach((file) => {
  require(`./handlers/${file}`)(client, config);
});


client.login(AuthenticationToken)
  .catch((err) => {
    console.error("[CRASH] Something went wrong while connecting to your bot...");
    console.error("[CRASH] Error from Discord API:" + err);
    return process.exit();
  });

process.on('unhandledRejection', async (err, promise) => {
  console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
  console.error(promise);
});