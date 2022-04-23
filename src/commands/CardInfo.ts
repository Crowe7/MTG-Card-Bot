import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { response } from 'express';
import fetch from 'node-fetch';
import { URLSearchParams } from 'node:url';
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
        const query = new URLSearchParams({ text });
        const card = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${query}`)
            .then(response => response.json());
        console.log(card);
        // THis is where we will query the data base for the card we look up
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(card.name);
        await interaction.editReply({embeds: [embed]});
    }
}
