import { ButtonInteraction, CacheType, CollectorFilter, CommandInteraction, Message, MessageComponentInteraction } from "discord.js"




const addButton = {
    name: 'add',
    run: async (interaction: ButtonInteraction<CacheType>) => {

        interaction.reply({content:"Added cardname to collection: You have _ copies", ephemeral: true})

            // import function from database folder that adds the card to the users personal collection
            // like  const result = addToCollection(card, interaction.user.id);
            //if(result)
            // else 
            // await i.editReply({ content: 'could not add ${card.name} to collection'});
    }
}

const removeButton = {
    name: 'remove',
    run: async (interaction: ButtonInteraction<CacheType>) => {
        interaction.reply({content: "Removed a copy of cardname from collection: you have _ copies", ephemeral: true})
    }
}


export const buttonInteractions = [addButton, removeButton];