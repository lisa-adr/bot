const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "lucky",
    description: "Get your fortune cookie.",
    type: 1,
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (config, interaction) => {
        const lovePercentage = Math.floor(Math.random() * 101);
        const healthPercentage = Math.floor(Math.random() * 101);
        const luckPercentage = Math.floor(Math.random() * 101);
        const moneyPercentage = Math.floor(Math.random() * 101);

        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle("🥠 Your fortune cookie says:")
            .setDescription(`
                You will have a day of joy and good times, enjoy them like never before.
                Your forecasts are:
                ❤️ Love: ${lovePercentage}%
                💉 Health: ${healthPercentage}%
                🍀 Luck: ${luckPercentage}%
                💸 Money: ${moneyPercentage}%
            `)
            .setTimestamp()
            .setFooter({ text: `Requested by `+ interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL({ dynamic: true })});

        await interaction.reply({ embeds: [embed] });
    },
};
