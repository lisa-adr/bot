const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "love-calc",
    description: "Calculate the love percentage between you and another user",
    type: 1,
    options: [
        {
            name: 'user',
            description: 'The user to calculate the love percentage with',
            type: 6,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const user = interaction.options.getUser('user');

        const lovePercent = Math.floor(Math.random() * 101);
        const result = lovePercent > 50 ? '🥰' : '💔';
        const gifUrl = lovePercent > 50 ? 'https://cdn.discordapp.com/attachments/1107097090808623245/1108024443936178296/kiss-gif6.gif' : 'https://cdn.discordapp.com/attachments/1107097090808623245/1108024533270671451/tumblr_24d3bc168cc17eb427ad174bc1675911_04bccbc7_540.gif';

        const embed = new EmbedBuilder()
            .setColor(config.Embed.COLOR)
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setTitle(`Love percentage between ${interaction.user.username} and ${user.username}`)
            .setDescription(`${interaction.user.username} ❤️ ${user.username}: **${lovePercent}%** ${result}`)
            .setImage(gifUrl)
            .setFooter({ text: `Requested by `+ interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
