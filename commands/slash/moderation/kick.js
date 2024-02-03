const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick a user.",
    type: 1,
    options: [
        {
            name: 'target',
            description: 'The user you want to kick.',
            type: 6,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the kick.',
            type: 3,
            required: false,
        }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "KickMembers"
    },
    run: async (client, interaction, config, db) => {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        try {
            const member = interaction.guild.members.cache.get(target.id);
            await member.kick(reason);

            const kick_embed = new EmbedBuilder()
            kick_embed.setTitle(`Kick Action`)
            kick_embed.setDescription(`✅ Successfully kicked ${target.tag}.\nReason: ${reason}`)
            kick_embed.setTimestamp()
            kick_embed.setColor('#2b2d31')
            kick_embed.setFooter({ text: `Command invoked by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })});

            await interaction.reply({ embeds: [kick_embed] });
        } catch (error) {
            console.error(error);
            interaction.reply(`❌ An error occurred while trying to ban ${target.tag}: ${error.message}`, { ephemeral: true });
        }
    }
}
