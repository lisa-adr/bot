module.exports = {
    name: "minesweeper",
    description: "Get your fortune cookie.",
    type: 1,
    options: [
        {
            name: 'mines',
            description: 'choose amount of mines in grid',
            type: 3,
            required: true,
        }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (config, interaction) => {
        const mine = interaction.options.getString('mine');
        const field = generateField(5, 5, mine);
        const fieldString = field.map(row => row.join('')).join('\n')

        await interaction.reply({ content: `${fieldString}` });
    },
};

function generateField(width, height, mines) {
    const field = new Array(height).fill(0).map(() => new Array(width).fill('||✅||'));

    for (let i = 0; i < mines; i++) {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * height);

        if (field[y][x] === '||💣||') {
            i--;
            continue;
        }

        field[y][x] = '||💣||';
    }

    return field;
}
