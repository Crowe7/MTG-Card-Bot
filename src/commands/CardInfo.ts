import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

import { Command } from '../AllCommands';

const CardFetch = new SlashCommandBuilder()
    .setName("cardfetch")
    .setDescription("Fetches card info from Scryfall.")
    .addStringOption((option) =>
        option
            .setName("cardname")
            .setDescription("Name of the card you want to display info from.")
            .setRequired(true)
);


export const CardInfo: Command =  {
    data: CardFetch,
    run: async (interaction) => {
        await interaction.deferReply();
        const text = interaction.options.getString("cardname", true);
        // THis is where we will query the data base for the card we look up
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(text)
        await interaction.editReply({embeds: [embed]});
    }
}



