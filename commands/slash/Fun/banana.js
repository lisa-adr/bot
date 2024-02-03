const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "banana",
    description: "Get a random banana size.",
    type: 1,
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const bananaSize = Math.floor(Math.random() * 42);

        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setTitle("🍌 Banana Size")
            .setDescription(`Your banana is **${bananaSize} cm** long!`)
            .setImage('https://cdn.discordapp.com/attachments/1109624015770878002/1109624037740646400/banana-png.png')
            .setTimestamp()
            .setFooter({ text: `Requested by `+ interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})

        await interaction.reply({ embeds: [embed] });
    },
};
