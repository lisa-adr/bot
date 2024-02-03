const cowsay = require('cowsay');
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "cowsay",
    description: "The bot returns your message with a cow that speaks your word.",
    type: 1,
    options: [
        {
            name: 'message',
            description: 'cowsay',
            type: 3,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {

        const message = interaction.options.getString('message');
        
        let cowSaid = cowsay.say({ text: message });
        interaction.reply({ content: `\`\`\`${cowSaid}\`\`\``})

    },
};
