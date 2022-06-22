import { ButtonInteraction, CacheType, CollectorFilter, CommandInteraction, Message, MessageComponentInteraction } from "discord.js"
import { stripAndForceLowerCase } from "../data/convertText";
import { stripFieldText } from "../data/stripAsterisks";
import { fetchCardFromDB } from "../database/data/fetchCardFromDB";
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
            const savedCard = currentUser?.cardCollection.filter( card => card.name === name);
            let cardQuantity = null
            if(savedCard) {
                cardQuantity = savedCard[0].quantity;
            }
            interaction.reply({content:`Added **${name}** from set **${set}** to collection: You have **${cardQuantity}** copies`, ephemeral: true})
        } catch (error) {
            interaction.reply({content:`Could not add **${name}** to collection!`, ephemeral: true})
        }
    }
}

const removeButton = {
    name: 'remove',
    run: async (interaction: ButtonInteraction<CacheType>) => {
        interaction.reply({content: "Removed a copy of cardname from collection: you have _ copies", ephemeral: true})
    }
} 


export const buttonInteractions = [addButton, removeButton];

        // this will be used later

        /*
        let title = stripAndForceLowerCase( interaction.message.embeds[0].title || 'TITLE NOT FOUND');
        let set = stripFieldText(interaction.message.embeds[0].fields?.find(field => field.name === "Set")?.value);
        console.log(title, set);
        const card: any = await fetchCardFromDB(title, set);
        */