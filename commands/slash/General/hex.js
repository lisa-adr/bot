const { EmbedBuilder } = require("discord.js");
function hexToRgb(hex) {
    hex = hex.replace("#", "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}

module.exports = {
    name: "hex",
    description: "Convert a hexadecimal color to RGB.",
    type: 1,
    options: [
        {
            name: 'color',
            description: 'The hexadecimal color to convert.',
            type: 3,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        let color = interaction.options.getString('color');
        if (!color.startsWith("#")) color = "#" + color;
        
        const rgb = hexToRgb(color);
        const colorImageUrl = `https://via.placeholder.com/100/${color.replace("#", "")}/.png`;

        const hex_embed = new EmbedBuilder()
        hex_embed.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
        hex_embed.setTitle(`Color Conversion`)
        hex_embed.setDescription(`The RGB equivalent of ${color} is rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
        hex_embed.setImage(colorImageUrl)
        hex_embed.setTimestamp()
        hex_embed.setColor(color)
        hex_embed.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })});

        await interaction.reply({ embeds: [hex_embed] })
    }
}
