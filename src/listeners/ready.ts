import { Client, REST, Routes } from "discord.js";
import {Commands} from '../AllCommands';
import 'dotenv/config'
import mongoose from "mongoose";

export default (client: Client): void => {
    mongoose.connect(process.env.MONGO_URI as string);    
    // Porbably add a mongoose connnect function database folder then import here and call it.
    client.on("ready", async () => {
        if(!client.user || !client.application) {return}
        const rest = new REST({ version: "9" }).setToken(
            process.env.TOKEN as string
        );
        // this clears all set commands  | client.application.commands.set([]);
        const commandData = Commands.map((command) => command.data.toJSON());
        await rest.put(
            Routes.applicationCommands(
                client.user.id,
            ),
            {body: commandData}
        )
        console.log(`${client.user.username} is online`);
    });
};