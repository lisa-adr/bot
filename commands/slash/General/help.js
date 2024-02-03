const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Allows to display the commands of the bot!",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}, bienvenue sur la page d'aide de **${client.user.username}**`)
      .setDescription(`Ci-dessous, vous trouverez un menu avec plusieurs catégories qui explique la totalité de **mes commandes**. ⌚\n\n> Si vous avez un problème avec le robot ou autre, n'hésitez pas à nous contacter sur notre serveur [support](${config.Link.SUPPORT})`)
      .setColor(config.Embed.COLOR)
      .setImage(config.Embed.IMAGE)
      .setFooter({ text: `Page d'accueil`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

    const embed_moderation = new EmbedBuilder()
      .setTitle(`Liste des commandes de **${client.user.username}**`)
      .setDescription(`</ban:01>, </kick:01>, </purge:01>, </slowmode:01>, </softban:01>`)
      .setColor(config.Embed.COLOR)
      .setFooter({ text: `Catégorie Modération`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

    const embed_general = new EmbedBuilder()
      .setTitle(`Liste des commandes de **${client.user.username}**`)
      .setDescription(`</help:01>, </avatar:01>, </banner:01>, </hex:01>, </invite:01>, </ping:01>, </support:01>, </poll:01>`)
      .setColor(config.Embed.COLOR)
      .setFooter({ text: `Catégorie Général`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

    const embed_fun = new EmbedBuilder()
      .setTitle(`Liste des commandes de **${client.user.username}**`)
      .setDescription(`</8ball:01>, </love-calc:01>, </marry:01>, </year:01>`)
      .setColor(config.Embed.COLOR)
      .setFooter({ text: `Commandes de Fun`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

    const componentsMenu = (state) => [
      new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("help-menu")
          .setPlaceholder("Fait un choix !")
          .setDisabled(state)
          .addOptions([
            {
              label: 'Accueil',
              description: 'Permet de retourner sur la page d\'acceuil.',
              value: 'accueil',
              emoji: '🏠',
            },
            {
              label: 'Modération',
              description: 'Permet de voir les commandes de modération.',
              value: 'moderation',
              emoji: '🛠️',
            },
            {
              label: 'Général',
              description: 'Permet de voir les commandes général.',
              value: 'general',
              emoji: '💬',
            },
            {
              label: 'Fun',
              description: 'Permet de voir les commandes fun.',
              value: 'fun',
              emoji: '😂',
            },
          ]),

      ),
      // new ActionRowBuilder().addComponents(
      //   new ButtonBuilder()
      //     .setLabel('Invite Moi')
      //     .setStyle('Link')
      //     .setURL(config.link.invite)
      //     .setEmoji('🔧'),

      //   new ButtonBuilder()
      //     .setLabel('Serveur d\'Aide')
      //     .setStyle('Link')
      //     .setURL(config.link.support)
      //     .setEmoji('⚙️'),
      // )
    ];

    const interactions = await interaction.reply({ embeds: [embed], components: componentsMenu(false), fetchReply: true });

    const collector = interactions.createMessageComponentCollector({
      filter: (u) => {
        if (u.user.id === interaction.user.id) return true;
        else {
          return false;
        }
      },
      errors: ["TIME"]
    });

    collector.on("collect", (cld) => {
      if (cld.values[0] === "accueil") {
        cld.update({ embeds: [embed], components: componentsMenu(false) })
      
      } else if (cld.values[0] === "moderation") {
        cld.update({ embeds: [embed_moderation], components: componentsMenu(false) })
      
      } else if (cld.values[0] === "general") {
        cld.update({ embeds: [embed_general], components: componentsMenu(false) })
      
      } else if (cld.values[0] === "fun") {
        cld.update({ embeds: [embed_fun], components: componentsMenu(false) })
      }
    })
    },
};
