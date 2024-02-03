module.exports = {
    name: "reverse",
    description: "Reverses the given text.",
    type: 1,
    options: [
        {
            name: 'text',
            description: 'The text to reverse',
            type: 3,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const text = interaction.options.getString('text');

        const reversed = text.split('').reverse().join('');

        await interaction.reply(reversed);
    },
};
