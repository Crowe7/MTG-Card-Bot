import { ButtonInteraction, CacheType, CollectorFilter, CommandInteraction, Message, MessageComponentInteraction } from "discord.js"
import { stripAndForceLowerCase } from "../data/convertText";
import { stripFieldText } from "../data/stripAsterisks";
import { fetchCardFromDB } from "../database/data/fetchCardFromDB";
import { removeCopyFromCollectionDB } from "../database/data/removeCopyFromCollectionDB";
import { saveCardToCollectionDb } from "../database/data/saveCardToCollectionDB";
import { User } from "../database/models/UserCollection";




const addButton = {
    name: 'add',
    run: async (interaction: ButtonInteraction<CacheType>) => {

        let name: string = ''
        if(interaction.message.embeds[0].title) {
             name = interaction.message.embeds[0].title;
        }

        let set: string = '';
        if(interaction.message.embeds[0].fields?.find(field => field.name === "Set")?.value) {
            set = stripFieldText(interaction.message.embeds[0].fields?.find(field => field.name === "Set")?.value);
        }

        try {
            if(!name || !set || !interaction.user.username) {
                throw new Error
            }
            await saveCardToCollectionDb(name, interaction.user.username, set, interaction.user.id)
            const currentUser = await User.findOne({discordID: interaction.user.id}).exec();
            const savedCard = currentUser?.cardCollection.filter( card => card.name === name && card.setName === set);
            let cardQuantity = null
            if(savedCard) {
                cardQuantity = savedCard[0].quantity;
            }
            // shows copy instead of copies on one card 
            if(cardQuantity && cardQuantity === 1) {
                interaction.reply({content:`Added **${name}** from set **${set}** to collection: You have **${cardQuantity}** copy`, ephemeral: true});
            } else {
                interaction.reply({content:`Added **${name}** from set **${set}** to collection: You have **${cardQuantity}** copies`, ephemeral: true});
            }

        } catch (error) {
            interaction.reply({content:`Could not add **${name}** to collection!`, ephemeral: true})
        }
    }
}

const removeButton = {
    name: 'remove',
    run: async (interaction: ButtonInteraction<CacheType>) => {

        let name: string = ''
        if(interaction.message.embeds[0].title) {
             name = interaction.message.embeds[0].title;
        }

        let set: string = '';
        if(interaction.message.embeds[0].fields?.find(field => field.name === "Set")?.value) {
            set = stripFieldText(interaction.message.embeds[0].fields?.find(field => field.name === "Set")?.value);
        }

        try {
            if(!name || !set || !interaction.user.username) {
                throw new Error
            }
            await removeCopyFromCollectionDB(interaction.user.id, name, set)
            const currentUser = await User.findOne({discordID: interaction.user.id}).exec();
            const savedCard = currentUser?.cardCollection.filter( card => card.name === name && card.setName === set);

            let cardQuantity = null
            if(savedCard && savedCard.length !== 0) {
                cardQuantity = savedCard[0].quantity;
            } else {
                    // if the card was removed entirely in above function saved card wont exist 
                    return interaction.reply({content:`Removed **${name}** from set **${set}** from collection`, ephemeral: true});
            }

            // shows copy instead of copies on one card 
            if(cardQuantity === 1) {
                interaction.reply({content:`Removed **${name}** from set **${set}** from collection: You have **${cardQuantity}** copy`, ephemeral: true});
            } else {
                interaction.reply({content:`Removed **${name}** from set **${set}** from collection: You have **${cardQuantity}** copies`, ephemeral: true});
            }

        } catch (error) {
            interaction.reply({content:`Could not remove **${name}** from collection!`, ephemeral: true})
        }
    }
} 


export const buttonInteractions = [addButton, removeButton];