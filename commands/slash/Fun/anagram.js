module.exports = {
    name: "anagram",
    description: "Create an anagram from a text! Perfect if you want to be mysterious with your messages.",
    type: 1,
    options: [
        {
            name: 'text',
            description: 'The text to create an anagram',
            type: 3,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const text = interaction.options.getString('text');
        const anagram = text.split('').sort(() => 0.5 - Math.random()).join('');
        const count = factorial(text.length);

        await interaction.reply(`Anagram: \`${anagram}\`\nThere are potentially **${count}** anagrams for this word.`);
    },
};

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
