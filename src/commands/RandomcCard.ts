import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { response } from 'express';
import fetch from 'node-fetch';
import { URLSearchParams } from 'node:url';
import { Command } from '../AllCommands';

const RandomCardFetch = new SlashCommandBuilder()
    .setName("random")
    .setDescription("Fetches random card info from Scryfall.");

export const RandomCard: Command = {
    data: RandomCardFetch,
    run: async (interaction) => {
        await interaction.deferReply();
        
        const card = await fetch(`https://api.scryfall.com/cards/random`)
            .then(response => response.json());

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
