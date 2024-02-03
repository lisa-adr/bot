const Sentiment = require('sentiment');
const sentiment = new Sentiment();

module.exports = {
    name: "sentiment",
    description: "Performs sentiment analysis on a message.",
    type: 1,
    options: [
        {
            name: 'message',
            description: 'The message to analyze',
            type: 3,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const message = interaction.options.getString('message');
        const result = sentiment.analyze(message);

        let sentimentValue = '';
        if (result.score > 0) {
            sentimentValue = 'Positive';
        } else if (result.score < 0) {
            sentimentValue = 'Negative';
        } else {
            sentimentValue = 'Neutral';
        }

        await interaction.reply(`✅ Sentiment score: **${result.score}**, Sentiment: **${sentimentValue}**`);
    },
};
