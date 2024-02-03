module.exports = {
    name: "remove-role",
    description: "Remove a role from a user.",
    type: 1,
    options: [
        {
            name: 'user',
            description: 'The user to remove the role from.',
            type: 6,
            required: true,
        },
        {
            name: 'role',
            description: 'The role to remove.',
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

        if (!member.roles.cache.has(role.id)) {
            return interaction.reply({ content: `${user} does not have the role **${role.name}**.` });
        }

        await member.roles.remove(role.id);
        interaction.reply({ content: `✅ Successfully removed role **${role.name}** from ${user}.` });
    },
};
