import { Client } from "discord.js";
import {Commands} from '../AllCommands';
import { REST } from '@discordjs/rest';
import 'dotenv/config'
import { Routes } from "discord-api-types/v10";

export default (client: Client): void => {
    client.on("ready", async () => {
        if(!client.user || !client.application) {return}
        const rest = new REST({ version: "9" }).setToken(
            process.env.TOKEN as string
        );
        const commandData = Commands.map((command) => command.data.toJSON());

        await rest.put(
            Routes.applicationGuildCommands(
                client.user.id,
                process.env.SERVER_ID as string
            ),
            {body: commandData}
        )
        console.log(`${client.user.username} is online`);
    });
};