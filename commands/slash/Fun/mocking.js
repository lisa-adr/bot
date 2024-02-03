module.exports = {
    name: "mocking",
    description: "text to mocking.",
    type: 1,
    options: [
        {
            name: 'text',
            description: 'text to mocking',
            type: 3,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const text = interaction.options.getString('text');
        let mockText = "";
        for (let i = 0; i < text.length; i++) {
            mockText += i % 2 === 0 ? text[i].toUpperCase() : text[i].toLowerCase();
        }
        interaction.reply({ content: mockText })
    },
};
