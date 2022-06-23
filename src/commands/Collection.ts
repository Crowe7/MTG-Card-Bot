import { SlashCommandBuilder } from "@discordjs/builders"
import { Command } from "../AllCommands"


const CollectionCommand = new SlashCommandBuilder()
.setName("collection")
.setDescription("Allows you to view, add, or remove cards from your personal collection.")
.addStringOption((option) =>
    option.setName("type")
        .setDescription("Paste bulk text in for adding/removing.")
        .setRequired(true)
        .addChoices(
            { name: 'Add', value: 'add' },
            { name: 'Remove', value: 'remove' },
            { name: 'View', value: 'view' },
        )
)
.addStringOption((option) => 
    option.setName("Bulk Cards")
        .setDescription("Cards to add/remove to/from your collection")
        .setRequired(false)
)

export const Collection: Command = {
    data: CollectionCommand,
    run: async (interaction) => {
        
    }
}