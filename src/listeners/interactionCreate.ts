import { Client, Interaction } from "discord.js";
import { Commands } from "../AllCommands";


export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand()) {
            for (const Command of Commands) {
                if(interaction.commandName === Command.data.name) {
                    await Command.run(interaction);
                    break;
                }
            }
        }
    });
};
