const morse = require("morse");

module.exports = {
    name: "morse",
    description: "🥷🏼 Encodes text to Morse code.",
    type: 1,
    options: [
        {
            name: 'text',
            description: 'The text to encode',
            type: 3,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const text = interaction.options.getString('text');

        const morseCode = morse.encode(text);

        await interaction.reply(morseCode);
    },
};
