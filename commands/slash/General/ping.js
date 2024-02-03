const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Replies with pong!",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {

        const before = Date.now();

        await interaction.reply({ content: "Pinging...", ephemeral: false })

        const after = Date.now();
        const apiPing = after - before;

        const ping_embed = new EmbedBuilder()
        ping_embed.setTitle(`🔎 Command Ping`)
        ping_embed.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
        ping_embed.setDescription(`Here is the ping of the api and the ping of the bot.`)
        ping_embed.setTimestamp()
        ping_embed.setColor(config.Embed.COLOR)
        ping_embed.setFooter({ text: `Requested by `+ interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL({ dynamic: true })});

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(`API: ${apiPing}ms`)
                    .setStyle('Link')
                    .setURL("https://discordstatus.com")
                    .setDisabled(false),

                new ButtonBuilder()
                    .setLabel(`BOT: ${client.ws.ping}ms`)
                    .setStyle('Link')
                    .setURL("https://discord.com/musiquefr")
                    .setDisabled(false),
            )

        return interaction.editReply({ content: "", embeds: [ping_embed], ephemeral: false, components: [row] })
    },
};