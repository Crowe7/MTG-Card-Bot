import { SlashCommandBuilder } from "@discordjs/builders"
import { Command } from "../AllCommands"
import { collectionFunction } from "../data/collectionFunctionWrapper"
import { deleteCollectionFile } from "../data/deleteCollectionFile"


const CollectionCommand = new SlashCommandBuilder()
.setName("collection")
.setDescription("Allows you to view, add, or remove cards from your personal collection.")
.addStringOption((option) =>
    option.setName("type")
        .setDescription("Paste text file in for adding/removing.")
        .setRequired(true)
        .addChoices(
            { name: 'Add', value: 'add' },
            { name: 'Remove', value: 'remove' },
            { name: 'View', value: 'view' },
            { name: 'Delete Collection', value: 'deleteCollection'},
        )
)
.addAttachmentOption((option) => 
    option
        .setName("bulkcards")
        .setDescription("add/remove from your collection with a TXT file!, format is: 1 Shock (AER)")
        .setRequired(false)
)

export const Collection: Command = {
    data: CollectionCommand,
    run: async (interaction) => {
        await interaction.deferReply();

        // collection function is gonna return an object with which a title to use and a txt file to attach as an attachement to the response message

        if(interaction.options.getString('type') === 'view') {
            try {
                await collectionFunction(interaction.options.getString('type', true), interaction.user.id);
                await interaction.editReply({files: ['./collection.txt']}); 
                deleteCollectionFile();
            } catch(err) {
                interaction.deleteReply()
                // had to wrap in a set timeout to get the message to not delete itself from above
                setTimeout(() => {
                     return interaction.followUp({ content: `${err}`, ephemeral: true});
                }, 100); 
            }
        }
        else if(interaction.options.getString('type') === 'deleteCollection') {
            try {
                await collectionFunction(interaction.options.getString('type', true), interaction.user.id);
                await interaction.editReply({ content: `Collection deleted!` }); 
            } catch(err) {
                interaction.deleteReply()
                // had to wrap in a set timeout to get the message to not delete itself from above
                setTimeout(() => {
                     return interaction.followUp({ content: `${err}`, ephemeral: true});
                }, 100); 
            }
        } else {
            try {
                await collectionFunction(interaction.options.getString('type', true), interaction.user.id,  interaction.options.getAttachment('bulkcards', false) || undefined, interaction.user.username )
                await interaction.editReply({files: ['./collection.txt']}); 
                deleteCollectionFile();
            } catch(err) {
                interaction.deleteReply()
                // had to wrap in a set timeout to get the message to not delete itself from above
                setTimeout(() => {
                    return interaction.followUp({ content: `${err}`, ephemeral: true});
               }, 200); // this is a random number... Bot crashes below 120
            }
        }
    }
}