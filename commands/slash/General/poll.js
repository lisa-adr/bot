const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "poll",
    description: "Create a poll.",
    type: 1,
    options: [
        {
            name: 'question',
            description: 'The poll question.',
            type: 3,
            required: true,
        },
        {
            name: 'choice_a',
            description: 'Choice A.',
            type: 3,
            required: true,
        },
        {
            name: 'choice_b',
            description: 'Choice B.',
            type: 3,
            required: false,
        },
        {
            name: 'choice_c',
            description: 'Choice C.',
            type: 3,
            required: false,
        },
        {
            name: 'choice_d',
            description: 'Choice D.',
            type: 3,
            required: false,
        },
        {
            name: 'choice_e',
            description: 'Choice E.',
            type: 3,
            required: false,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "ManageMessages"
    },
    run: async (client, interaction) => {
        const question = interaction.options.getString('question');
        const choices = [
            interaction.options.getString('choice_a'),
            interaction.options.getString('choice_b'),
            interaction.options.getString('choice_c'),
            interaction.options.getString('choice_d'),
            interaction.options.getString('choice_e')
        ].filter(Boolean);

        const poll_embed = new EmbedBuilder()
            poll_embed.setColor('#2b2d31')
            poll_embed.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
            poll_embed.setTitle('📊 ' + question)
            poll_embed.setDescription(choices.map((choice, i) => `${i+1}. ${choice}`).join('\n'))
            poll_embed.setColor('#2b2d31')
            poll_embed.setTimestamp();

        const message = await interaction.reply({ embeds: [poll_embed], fetchReply: true });

        for (let i = 0; i < choices.length; i++) {
            await message.react(i+1+'️⃣');
        }
    },
};
