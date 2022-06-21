import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { Command } from '../AllCommands';
import { stripAndForceLowerCase } from '../data/convertText';
import { CheckMissingDB } from '../database/data/checkMissingDB';
import { fetchCardAPI } from '../database/data/fetchCard';
import { fetchCardFromDB } from '../database/data/fetchCardFromDB';
import { saveAllMatchingCards } from '../database/data/saveAllMatchingCards';
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

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('add')
            .setLabel('Add to Collection')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('remove')
            .setLabel('Remove Copy From Collection')
            .setStyle('DANGER')
            // put a setDisabled here that is true if the user has no copys of the card in there collection if possible
    )


export const CardInfo: Command =  {
    data: CardFetch,
    run: async (interaction) => {
        await interaction.deferReply();
        let text: string = interaction.options.getString("cardname", true);
        // Removes spaces
        let convertedText: string = stripAndForceLowerCase(text);

        let setName: string | null = interaction.options.getString("set", false);


        const returnCardInfo = async () => {

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
                     await saveCardsToDB(cards, convertedText);
                     if(cards) {
                        card = await fetchCardFromDB(convertedText, setName)
                        card = card.details;
                     }
                } else {
                    if(typeof card === 'string') {
                        card = null
                    } 
                }

            if(!card) {
                interaction.deleteReply()
                // had to wrap in a set timeout to get the message to not delete itself from above
                setTimeout(() => {
                     return interaction.followUp({ content: `**No card found matching ${text}**`, ephemeral: true});
                }, 100);
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
                                { name: 'Type', value: `**${card.type_line}**`, inline: true},
                                { name: 'Rarity', value: `**${card.rarity}**`, inline: true},
                                { name: "Set", value: `**${card.set}**`, inline: true}
                            )
                            .setImage(cardImage)
                            .setFooter({ text: `Price: $${price}`})
                        if(i === 0) {
                            await interaction.editReply({embeds: [embed], components: [buttons]});
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
                            { name: 'Type', value: `**${card.type_line}**`, inline: true},
                            { name: 'Rarity', value: `**${card.rarity}**`, inline: true},
                            { name: "Set", value: `**${card.set}**`, inline: true}
                        )
                        .setImage(card.image_uris.border_crop)
                        .setFooter({ text: `Price: $${price}`})
                    await interaction.editReply({embeds: [embed], components: [buttons]});
                }
                // saves all the cards after displaying current searched card to the user
                await saveAllMatchingCards(convertedText);
            }
        }
        returnCardInfo();
    }
}
