const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "purge",
    description: "Deletes a number of messages from a channel.",
    type: 1,
    options: [
        {
            name: 'amount',
            description: 'The number of messages to delete.',
            type: 4,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "ManageMessages"
    },
    run: async (client, interaction) => {
        const amount = interaction.options.getInteger('amount');
        if (amount <= 0 || amount > 100) {
            return interaction.reply('❌ You need to input a number between 1 and 100.', { ephemeral: true });
        }

        try {
            await interaction.channel.bulkDelete(amount, true);
            const purge_embed = new EmbedBuilder()
            purge_embed.setTitle(`Purge Completed`)
            purge_embed.setDescription(`✅ Successfully deleted ${amount} messages.`)
            purge_embed.setTimestamp()
            purge_embed.setColor('#2b2d31')
            purge_embed.setFooter({ text: `Command invoked by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })});

            await interaction.reply({ embeds: [purge_embed] });
        } catch (error) {
            console.error(error);
            interaction.reply(`❌ An error occurred while trying to delete messages: ${error.message}`, { ephemeral: true });
        }
    }
}
