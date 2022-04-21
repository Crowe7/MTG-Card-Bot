import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

import { Command } from '../AllCommands';

export const CardInfo: Command =  {
    data: new SlashCommandBuilder()
        .setName("Card Fetch")
        .setDescription("Displays card information of the card name entered.")
        .addStringOption((option) => 
            option
                .setName("Card Name")
                .setDescription("Name of the card you want to look up")
                .setRequired(true)
        ),
    run: async (interaction) => {
        await interaction.deferReply();
        const { user } = interaction;
        const text = interaction.options.getString("Card Name", true);
        // THis is where we will query the data base for the card we look up
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(text)
        await interaction.editReply({ embeds: [embed]});
    }
}




