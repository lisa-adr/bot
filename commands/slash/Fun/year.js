const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "year",
    description: "Displays the progress of the year.",
    type: 1,
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const currentDate = new Date();
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999);
        const diffSeconds = (currentDate - startOfYear) / 1000;
        const totalSeconds = (endOfYear - startOfYear) / 1000;
        const percentage = ((diffSeconds / totalSeconds) * 100).toFixed(2);
        const progressBar = generateProgressBar(percentage);

        const embed = new EmbedBuilder()
            .setColor(config.Embed.COLOR)
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setTitle(`Progress of the year ${currentDate.getFullYear()}`)
            .setDescription(`We are currently at ${percentage}% of the current year.\n${progressBar}`)
            .setFooter({ text: `Requested by `+ interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};

function generateProgressBar(percentage) {
    const progressChars = '█';
    const emptyChars = '░';
    const progressLength = 10;
    const emptyLength = 100 - progressLength;
    const progress = Math.floor((percentage / 100) * progressLength);
    const empty = progressLength - progress;
    const progressBar = `${progressChars.repeat(progress)}${emptyChars.repeat(empty)} ${percentage}%`;

    return progressBar;
}
