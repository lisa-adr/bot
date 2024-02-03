module.exports = {
    name: "chicken-game",
    description: "Get your fortune chicken game.",
    type: 1,
    options: [
        {
            name: 'bet',
            description: 'choose our price',
            type: 3,
            required: true,
        },
        {
            name: 'bones',
            description: 'choose amount of bones in grid',
            type: 3,
            required: true,
        }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (config, interaction) => {

        const bones = interaction.options.getString('bones');
        const field = generateField(5, 5, bones);
        const fieldString = field.map(row => row.join('')).join('\n')

        await interaction.reply({ content: `${fieldString}` });
    },
};

function generateField(width, height, mines) {
    const field = new Array(height).fill(0).map(() => new Array(width).fill('||🍗||'));

    for (let i = 0; i < mines; i++) {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * height);

        if (field[y][x] === '||🦴||') {
            i--;
            continue;
        }

        field[y][x] = '||🦴||';
    }

    return field;
}
