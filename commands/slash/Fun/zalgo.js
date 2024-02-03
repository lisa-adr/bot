const zalgolize = require('zalgolize');

module.exports = {
    name: "zalgo",
    description: "Transforms the given text into zalgo text.",
    type: 1,
    options: [
        {
            name: 'text',
            description: 'The text to zalgolize',
            type: 3,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const text = interaction.options.getString('text');

        const zalgoText = zalgolize(text);

        await interaction.reply(zalgoText);
    },
};
