const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "marry",
    description: "Propose to a user to marry you.",
    type: 1,
    options: [
        {
            name: 'user',
            description: 'The user to propose to',
            type: 6,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const user = interaction.options.getUser('user');

        const embed = new EmbedBuilder()
            .setColor(config.Embed.COLOR)
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setTitle('Marriage Proposal')
            .setDescription(`**${user.username}**, will you marry **${interaction.user.username}**?`)
            .setFooter({ text: `Requested by `+ interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setTimestamp();

        const acceptButton = new ButtonBuilder()
            .setCustomId('accept')
            .setLabel('Accept')
            .setStyle('Success');

        const rejectButton = new ButtonBuilder()
            .setCustomId('reject')
            .setLabel('Reject')
            .setStyle('Danger');

        const actionRow = new ActionRowBuilder().addComponents(acceptButton, rejectButton);

        const filter = i => i.user.id === user.id && ['accept', 'reject'].includes(i.customId);

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        let married = false;

        collector.on('collect', async i => {
            if (i.customId === 'accept') {
                married = true;
                const replyEmbed = new EmbedBuilder()
                    .setColor(config.Embed.COLOR)
                    .setDescription(`**${interaction.user.username}** and **${user.username}** are now married! Congratulations! 💍`)
                    .setFooter({ text: `Accepted by ${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true })})
                    .setImage('https://cdn.discordapp.com/attachments/1107097090808623245/1108025484463321230/anime-wedding.gif')
                    .setTimestamp();
                await i.update({ embeds: [replyEmbed], components: [] });
            } else if (i.customId === 'reject') {
                const replyEmbed = new EmbedBuilder()
                    .setColor(config.Embed.COLOR)
                    .setDescription(`**${user.username}** has rejected your marriage proposal, sorry... 💔`)
                    .setFooter({ text: `Rejected by ${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true })})
                    .setTimestamp();
                await i.update({ embeds: [replyEmbed], components: [] });
            }
            collector.stop();
        });

        await interaction.reply({ embeds: [embed], components: [actionRow] });

        collector.on('end', () => {
            if (!married) {
                const replyEmbed = new EmbedBuilder()
                    .setColor(config.Embed.COLOR)
                    .setDescription(`**${user.username}** did not respond to your marriage proposal, sorry... 💔`)
                    .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                interaction.followUp({ embeds: [replyEmbed] });
            }
        });
    },
};
