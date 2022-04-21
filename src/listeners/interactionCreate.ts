import { BaseCommandInteraction, Client, Interaction } from "discord.js";


export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand()) {

        }
    });
};
