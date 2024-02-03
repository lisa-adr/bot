const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Get the invite link for the bot.",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const clientId = client.user.id;
        const permissions = '8';
        const inviteLink = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=${permissions}`;

        const invite_embed = new EmbedBuilder()
        invite_embed.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
        invite_embed.setTitle(`Invite ${client.user.username}`)
        invite_embed.setDescription(`Click the button below to invite me to your server!`)
        invite_embed.setTimestamp()
        invite_embed.setColor(config.Embed.COLOR)
        invite_embed.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })});

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Invite')
                    .setStyle('Link')
                    .setURL(inviteLink)
            )

        await interaction.reply({ embeds: [invite_embed], components: [row] })
    }
}
