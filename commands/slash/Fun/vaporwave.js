module.exports = {
    name: "vaporwave",
    description: "✨ Transforms your message to be ａｅｓｔｈｅｔｉｃ.",
    type: 1,
    options: [
        {
            name: 'text',
            description: 'The text to transform',
            type: 3,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const text = interaction.options.getString('text');

        const vaporwaveText = text.split('').map(char => {
            const code = char.charCodeAt(0);
            return code >= 33 && code <= 126 ? String.fromCharCode((code - 33) + 65281) : char;
        }).join('');

        await interaction.reply(vaporwaveText);
    },
};
