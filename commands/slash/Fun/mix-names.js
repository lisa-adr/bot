module.exports = {
    name: "mix-names",
    description: "Mixes the names of two users.",
    type: 1,
    options: [
        {
            name: 'user_1',
            description: 'First user',
            type: 6,
            required: true,
        },
        {
            name: 'user_2',
            description: 'Second user',
            type: 6,
            required: true,
        }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {

        const user1 = interaction.options.getUser('user_1');
        const user2 = interaction.options.getUser('user_2');

        const splitUser1 = user1.username.substring(0, user1.username.length / 2);
        const splitUser2 = user2.username.substring(user2.username.length / 2);

        const mixedName = splitUser1 + splitUser2;

        await interaction.reply(`${user1} + ${user2} = **${mixedName}**`);
    },
};
