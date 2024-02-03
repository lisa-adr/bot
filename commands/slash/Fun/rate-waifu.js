module.exports = {
    name: "rate-waifu",
    description: "✅ Because you need validation to love your Waifu, so let me rate it for you!",
    type: 1,
    options: [
        {
            name: 'name',
            description: 'The name of your Waifu',
            type: 3,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const waifuName = interaction.options.getString('name');
        const waifuRating = Math.floor(Math.random() * 11);
        let response = '';

        if (waifuRating < 5) {
            response = `Your waifu **${waifuName}** gets a rating of **${waifuRating}/10**. She might not be the best waifu material... 😔`;
        } else if (waifuRating === 5) {
            response = `Your waifu **${waifuName}** gets a rating of **${waifuRating}/10**. She's pretty average, but that doesn't mean she can't be your best girl! 😄`;
        } else if (waifuRating > 5 && waifuRating < 10) {
            response = `Your waifu **${waifuName}** gets a rating of **${waifuRating}/10**. She's definitely a great waifu! 😊`;
        } else if (waifuRating === 10) {
            response = `Your waifu **${waifuName}** gets a perfect rating of **${waifuRating}/10**. She's the absolute best waifu! 😍`;
        }

        await interaction.reply(response);
    },
};
