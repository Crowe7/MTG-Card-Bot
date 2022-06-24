import { SlashCommandBuilder } from "@discordjs/builders"
import { MessageEmbed } from "discord.js"
import { Command } from "../AllCommands"
import { collectionFunction } from "../data/collectionFunctionWrapper"


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
    option
        .setName("bulkcards")
        .setDescription("Cards to add/remove to/from your collection")
        .setRequired(false)
)

export const Collection: Command = {
    data: CollectionCommand,
    run: async (interaction) => {
        await interaction.deferReply();

        // collection function is gonna return an object with which a title to use and a txt file to attach as an attachement to the response message
        const title: string =  await collectionFunction(interaction.options.getString('type', true), interaction.user.id);

        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Placeholder')
        .setDescription(title);

        await interaction.editReply({embeds: [embed]});
    }
}