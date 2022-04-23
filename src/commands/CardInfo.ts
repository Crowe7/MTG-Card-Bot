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
        let text: string = interaction.options.getString("cardname", true);
        // Removes spaces
        text = text.replace(/\s+/g, '');

        const cards = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${text}`)
            .then(response => response.json());
        const firstCardMatch:string = cards.data[0];

        console.log(firstCardMatch);

        const query = new URLSearchParams(firstCardMatch);
        console.log(query);
        const card = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${query}`)
            .then(response => response.json());
        if(card.status === 404) {
            interaction.editReply(`**No card found matching ${text}**`);
        } else {
            console.log(card)

            let price: number = 0;
            if(card.prices.usd === null) {
                price = card.prices.usd_foil;
            } else {
                price = card.prices.usd;
            }
            // need to display error message if name doesnt exist.. change set title maybe to display it?
            // THis is where we will query the data base for the card we look up
            console.log(query);
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(card.name)
                .setURL(card.scryfall_uri)
                .setDescription(card.oracle_text)
                .setFields (
                    { name: 'CMC', value: `**${card.cmc}**`, inline: true},
                    { name: 'Type', value: `**${card.type_line}**`, inline: true},
                    { name: 'Rarity', value: `**${card.rarity}**`, inline: true},
                )
                .setImage(card.image_uris.border_crop)
                .setFooter({ text: `Price: $${price}`})
            await interaction.editReply({embeds: [embed]});
        }
    }
}
