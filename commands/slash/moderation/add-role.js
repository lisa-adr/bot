module.exports = {
    name: "add-role",
    description: "Add a role to a user.",
    type: 1,
    options: [
        {
            name: 'user',
            description: 'The user to add the role to.',
            type: 6,
            required: true,
        },
        {
            name: 'role',
            description: 'The role to add.',
            type: 8,
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "ManageRoles"
    },
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        
        const member = interaction.guild.members.cache.get(user.id);

        if (member.roles.cache.has(role.id)) {
            return interaction.reply({ content: `${user} already has the role **${role.name}**.` });
        }

        await member.roles.add(role.id);
        interaction.reply({ content: `✅ Successfully added role **${role.name}** to ${user}.` });
    },
};
