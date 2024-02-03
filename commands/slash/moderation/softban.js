const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "softban",
    description: "Ban a user and unban him to the second after he has been banned",
    type: 1,
    options: [
        {
            name: 'target',
            description: 'The user to softban',
            type: 6,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the softban',
            type: 3,
            required: false,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
        REQUIRED_PERMISSIONS: ["BAN_MEMBERS"]
    },
    run: async (client, interaction, config, db) => {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || "No reason provided";

        try {
            await interaction.guild.members.ban(target, { reason: reason });
            await interaction.guild.members.unban(target, 'Softban completed');

            for (const channel of interaction.guild.channels.cache.values()) {
                if (channel.type === 'text' || channel.type === 'news' || channel.type === 'dm') {
                    const messages = await channel.messages.fetch({ limit: 100 });
                    const userMessages = messages.filter(m => m.author.id === target.id && Date.now() - m.createdTimestamp < 7 * 24 * 60 * 60 * 1000);
                    if (userMessages.size > 0) {
                        await channel.bulkDelete(userMessages);
                    }
                }
            }

            const softban_embed = new EmbedBuilder()
                softban_embed.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                softban_embed.setColor(config.Embed.COLOR)
                softban_embed.setTitle('Softban')
                softban_embed.setDescription(`✅ **${target.tag}** has been softbanned.`)
                softban_embed.setTimestamp();
                // softban_embed.setFooter(`Softbanned by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
            
            await interaction.reply({ embeds: [softban_embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ An error occurred while trying to softban this user.', ephemeral: true });
        }
    },
};
