module.exports = {
    name: "slowmode",
    description: "Enable or disable slowmode on a channel.",
    type: 1,
    options: [
        {
            name: 'mode',
            description: 'Choose a mode',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'On',
                    value: 'on'
                },
                {
                    name: 'Off',
                    value: 'off'
                }
            ]
        },
        {
            name: 'time',
            description: 'Enter a time in seconds',
            type: 4,
            required: false,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "ManageChannels"
    },
    run: async (interaction) => {
        const time = interaction.options.getInteger('time');
        const mode = interaction.options.getString('mode');

        if (mode === 'on') {
            if (!time) {
                return await interaction.reply({ content: '❌ Please provide a time in seconds.', ephemeral: true });
            }
            await interaction.channel.setRateLimitPerUser(time)
                .then(() => interaction.reply({ content: `✅ Slowmode has been enabled with a delay of **${time} seconds** in this channel.`, ephemeral: false }))
                .catch(error => {
                    console.error(error);
                    interaction.reply({ content: '❌ There was an error enabling slowmode.', ephemeral: true });
                });
        } else {
            await interaction.channel.setRateLimitPerUser(0)
                .then(() => interaction.reply({ content: '✅ Slowmode has been disabled in this channel.', ephemeral: false }))
                .catch(error => {
                    console.error(error);
                    interaction.reply({ content: '❌ There was an error disabling slowmode.', ephemeral: true });
                });
        }
    },
};
