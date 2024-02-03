const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "support",
    description: "Get the support of the bot.",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {

        const support_embed = new EmbedBuilder()
        support_embed.setTitle(`Support Zelly`)
        support_embed.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
        support_embed.setDescription(`Click the button to join the support server!`)
        support_embed.setTimestamp()
        support_embed.setColor(config.Embed.COLOR)
        support_embed.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })});

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Support')
                    .setStyle('Link')
                    .setURL(`https://discord.gg/musiquefr`)
            )

        await interaction.reply({ embeds: [support_embed], components: [row] })
    }
}
