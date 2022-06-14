import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { response } from 'express';
import fetch from 'node-fetch';
import { URLSearchParams } from 'node:url';
import { Command } from '../AllCommands';
import { stripAndForceLowerCase } from '../data/convertText';
import { CheckMissingDB } from '../database/data/checkMissingDB';
import { fetchCardAPI } from '../database/data/fetchCard';
import { fetchCardFromDB } from '../database/data/fetchCardFromDB';
import { saveCardsToDB } from '../database/data/saveCardsToDB';

const CardFetch = new SlashCommandBuilder()
    .setName("cardfetch")
    .setDescription("Fetches card info from Scryfall.")
    .addStringOption((option) =>
        option
            .setName("cardname")
            .setDescription("Name of the card you want to display info from.")
            .setRequired(true)
    )
    .addStringOption((option) => 
        option
            .setName("set")
            .setDescription("Set printing you would like to display card from.")
            .setRequired(false)
    )


export const CardInfo: Command =  {
    data: CardFetch,
    run: async (interaction) => {
        await interaction.deferReply();
        let text: string = interaction.options.getString("cardname", true);
        // Removes spaces
        let convertedText: string = stripAndForceLowerCase(text);

        let setName: string | null = interaction.options.getString("set", false);

        // call function that checks databases, if empty call new one to pull from api. use below to make the api calling one
        //  

        
        const returnCardInfo = async () => {
                // let card = await fetchCardFromDB(query, setName) if(setName) const card =  cardsDB.filter.cardinstance...  return card.filter(set: setName) ... else return card[0]
            //Wrapper function that runs fetch from db... then fetches from api if card isnt present

            // return a string with the name if the card is only in missing DB.. better ways to do this
                const checkDB = async () => {
                    let card: any = await fetchCardFromDB(convertedText, setName);
                    // checks if the card is in DB
                    if(!card) {
                        let noCard = await CheckMissingDB(convertedText);
                        if(noCard) {
                            return noCard
                        }
                    } else {
                        card = card.details;
                    }
                    // returns a card if present... will be null if nothing there
                    return card
                }

                let card: any = await checkDB();

                if(!card) {
                     let cards = await fetchCardAPI(convertedText);
                     // console.log(cards);
                     await saveCardsToDB(cards, text);
                     if(cards) {
                        card = await fetchCardFromDB(convertedText, setName)
                        console.log(card)
                        card = card.details;
                     }
                } else {
                    if(typeof card === 'string') {
                        card = null
                    } 
                }


            

                // if(!card)
            if(!card) {
                // card = await fetchCard(query, setName) throw most of this junk in here
                    // if (!card) the run the interaction followup 
                interaction.deleteReply()
                // had to wrap in a set timeout to get the message to not delete itself from above
                setTimeout(() => {
                    interaction.followUp({ content: `**No card found matching ${text}**`, ephemeral: true});
                }, 100)
            //remove else 
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
        returnCardInfo();
    }
}
