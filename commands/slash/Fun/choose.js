module.exports = {
    name: "choose",
    description: "Randomly selects an option from the given choices.",
    type: 1,
    options: [
        {
            name: 'option1',
            description: 'Option 1',
            type: 3,
            required: true,
        },
        {
            name: 'option2',
            description: 'Option 2',
            type: 3,
            required: true,
        },
        {
            name: 'option3',
            description: 'Option 3',
            type: 3,
            required: false,
        },
        {
            name: 'option4',
            description: 'Option 4',
            type: 3,
            required: false,
        },
        {
            name: 'option5',
            description: 'Option 5',
            type: 3,
            required: false,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (interaction) => {
        const options = interaction.options.data.map(option => option.value);

        const choice = options[Math.floor(Math.random() * options.length)];

        await interaction.reply(choice);
    },
};
