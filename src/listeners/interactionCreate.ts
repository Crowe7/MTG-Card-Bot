import { Client, Interaction } from "discord.js";
import { Commands } from "../AllCommands";
import { buttonInteractions } from "./buttonInteractions";


export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: any) => {
        if (interaction.isCommand()) {
            for (const Command of Commands) {
                if(interaction.commandName === Command.data.name) {
                    await Command.run(interaction);
                    break;
                }
            }
        }
        if (interaction.isButton()) {
            for (const buttonInteraction of buttonInteractions) {
                if(interaction.customId === buttonInteraction.name) {
                    await buttonInteraction.run(interaction);
                    break;
                }
            }
        }
    });
};
