const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "8ball",
    description: "Ask a question to the magic 8 ball",
    type: 1,
    options: [
        {
            name: 'question',
            description: 'The question you want to ask the 8 ball.',
            type: 3,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const answers = [
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes, definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful"
        ];

        const question = interaction.options.getString('question');
        const answer = answers[Math.floor(Math.random() * answers.length)];

        const embed = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setTitle("🎱 The Magic 8 Ball 🎱")
            .setDescription(`Question: ${question}\nAnswer: ${answer}`)
            .setColor(config.Embed.COLOR)
            .setFooter({ text: `Requested by `+ interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
