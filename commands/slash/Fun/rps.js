const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "rps",
    description: "Play a game of rock, paper, scissors.",
    type: 1,
    options: [
        {
            name: 'member',
            description: 'The member to play against. Leave blank to play against the bot.',
            type: 6,
            required: false,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const member = interaction.options.getMember('member');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('rock')
                    .setLabel('🪨')
                    .setStyle('Primary'),
                new ButtonBuilder()
                    .setCustomId('paper')
                    .setLabel('📄')
                    .setStyle('Primary'),
                new ButtonBuilder()
                    .setCustomId('scissors')
                    .setLabel('✂️')
                    .setStyle('Primary'),
            );

        const embed = new EmbedBuilder()
            .setTitle('🪨, 📄, ✂️')
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setDescription(`${interaction.user.username}, choose your move!`)
            .setColor(config.Embed.COLOR)
            .setTimestamp();

        await interaction.reply({ embeds: [embed], components: [row] });

        const filter = i => i.user.id === interaction.user.id && ['rock', 'paper', 'scissors'].includes(i.customId);

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            let botChoice;
            if (!member) {
                botChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
            }

            const userChoice = i.customId;
            const result = determineWinner(userChoice, botChoice || member.user.username);

            const resultEmbed = new EmbedBuilder()
                .setTitle('🪨, 📄, ✂️')
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setDescription(result)
                .setColor(config.Embed.COLOR)
                .setTimestamp();

            await i.update({ embeds: [resultEmbed], components: [] });

            collector.stop();
        });

        collector.on('end', () => {
            if (!collector.collected.size) {
                const timeOutEmbed = new EmbedBuilder()
                    .setTitle('🪨, 📄, ✂️')
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                    .setDescription('The game ended due to inactivity.')
                    .setColor(config.Embed.COLOR)
                    .setTimestamp();

                interaction.editReply({ embeds: [timeOutEmbed], components: [] });
            }
        });
    },
};

function determineWinner(userChoice, botChoice) {
    if (userChoice === botChoice) {
        return `It's a tie! You both chose ${emoji(userChoice)}.`;
    }

    if (
        (userChoice === 'rock' && botChoice === 'scissors') ||
        (userChoice === 'paper' && botChoice === 'rock') ||
        (userChoice === 'scissors' && botChoice === 'paper')
    ) {
        return `✅ You win! ${emoji(userChoice)} beats ${emoji(botChoice)}.`;
    } else {
        return `❌ You lose! ${emoji(botChoice)} beats ${emoji(userChoice)}.`;
    }
}

function emoji(choice) {
    switch (choice) {
        case 'rock':
            return '🪨';
        case 'paper':
            return '📄';
        case 'scissors':
            return '✂️';
    }
}
