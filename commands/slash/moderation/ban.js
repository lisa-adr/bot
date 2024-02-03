const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Ban a user.",
    type: 1,
    options: [
        {
            name: 'target',
            description: 'The user you want to ban.',
            type: 6,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the ban.',
            type: 3,
            required: false,
        }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "BanMembers"
    },
    run: async (client, interaction, config, db) => {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        
        try {
            await interaction.guild.members.ban(target, { reason });

            const ban_embed = new EmbedBuilder()
            ban_embed.setTitle(`Ban Action`)
            ban_embed.setDescription(`✅ Successfully banned ${target.tag}.\nReason: ${reason}`)
            ban_embed.setTimestamp()
            ban_embed.setColor('#2b2d31')
            ban_embed.setFooter({ text: `Command invoked by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })});

            await interaction.reply({ embeds: [ban_embed] });
        } catch (error) {
            console.error(error);
            interaction.reply(`❌ An error occurred while trying to ban ${target.tag}: ${error.message}`, { ephemeral: true });
        }
    }
}
