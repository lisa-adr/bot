const { WebhookClient, EmbedBuilder } = require('discord.js');
const client = require("../../index");
const config = require('../../config/config');
const Discord = require('djs-fetchers-v14');
module.exports = {
  name: 'ready.js',
};

client.once('ready', async () => {
  console.log(`\n[READY] ${client.user.tag} is up and ready to go.`.brightGreen);
  Discord.fetcher();
  const webhook = new WebhookClient({ id: '1201981122788216932', token: 'dH1rbmV9MZUrviJs55s7tRcTqVafRA3bITkv-ZDRrutsKW6Md8GjeXLjusyRB423aE-7' });
  const embed = new EmbedBuilder()
  embed.setTitle(`Bot ${client.user.tag} is up and ready to go.`)
  embed.setColor(config.Embed.COLOR)
  embed.setTimestamp()
  try {
    await webhook.send({ embeds: [embed]});
    console.log('Webhook message sent successfully.');
  } catch (error) {
    console.error(`Error sending webhook message: ${error.message}`);
  }
});
