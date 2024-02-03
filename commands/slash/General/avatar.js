const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const config = require('./../../../config/config.js');
module.exports = {
    name: "avatar",
    description: "Get a user's avatar",
    type: 1,
    options: [
        {
            name: 'user',
            description: 'The user you want to get the avatar of.',
            type: 6,
            required: true,
        },
    ],
    permissions: {
        DFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

        const avatar_embed = new EmbedBuilder()
        avatar_embed.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
        avatar_embed.setTitle(`${user.tag}'s Avatar`)
        avatar_embed.setImage(avatarURL)
        avatar_embed.setTimestamp()
        avatar_embed.setColor(config.Embed.COLOR)
        avatar_embed.setFooter({ text: `Requested by `+ interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL({ dynamic: true })});

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Download')
                    .setStyle('Link')
                    .setURL(avatarURL)
            )

        await interaction.reply({ embeds: [avatar_embed], components: [row] })
    }
}