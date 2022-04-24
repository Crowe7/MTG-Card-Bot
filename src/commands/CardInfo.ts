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
        let textDespaced = text.replace(/\s+/g, '');

        const cards = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${textDespaced}`)
            .then(response => response.json());
        const firstCardMatch:string = cards.data[0];

        const query = new URLSearchParams(firstCardMatch);
        const card = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${query}`)
            .then(response => response.json());
        if(card.status === 404 || card.status === 400) {
            interaction.deleteReply()
            setTimeout(() => {
                interaction.followUp({ content: `**No card found matching ${text}**`, ephemeral: true});
            }, 100)
        } else {
            //This is for price displaying null if card is printed in foil only
            let price: number = 0;
            if(card.prices.usd === null) {
                price = card.prices.usd_foil;
            } else {
                price = card.prices.usd;
            };
            // sends 2 messages if card has multiple parts 
            if('card_faces' in card) {
                for(let i = 0; i < card.card_faces.length; i++) {
                    // Changes image if the back of the card is diffrent
                    let cardImage:string = ''
                    if(`image_uris` in card.card_faces[i]) {
                        cardImage = card.card_faces[i].image_uris.border_crop
                    } else {
                        cardImage = card.image_uris.border_crop;
                    }

                    const embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(card.card_faces[i].name)
                        .setURL(card.scryfall_uri)
                        .setDescription(card.card_faces[i].oracle_text)
                        .setFields (
                            { name: 'CMC', value: `**${card.cmc}**`, inline: true},
                            { name: 'Type', value: `**${card.type_line}**`, inline: true},
                            { name: 'Rarity', value: `**${card.rarity}**`, inline: true},
                        )
                        .setImage(cardImage)
                        .setFooter({ text: `Price: $${price}`})
                    if(i === 0) {
                        await interaction.editReply({embeds: [embed]});
                    } else {
                        await interaction.followUp({embeds: [embed]});
                    }
                }
            } else {
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
}
