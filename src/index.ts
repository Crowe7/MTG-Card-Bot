import { Client, Intents} from "discord.js"
import 'dotenv/config'
import interactionCreate from "./listeners/interactionCreate"
import ready from "./listeners/ready"
import { connectToDB } from './database/connectDB'
const TOKEN = process.env.TOKEN

console.log("Bot Starting...");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});


ready(client);
connectToDB();
interactionCreate(client);

client.login(TOKEN);

// TODO SAVE CARDS DATABASE

// TODO LONG TERM GOALS

/*

    WRITE COMMAND TO ALLOW USER TO ADD NEW CARD TO COLLECTION

    WRITE COMMAND TO ALLOW USER TO VIEW FULL COLLECTION

    WRITE COMMAND THAT ALLOWS USER TO EXPORT COLLECTION IN A WAY THAT THEY CAN IMPORT ONTO OTHER WEBSITES

    WRITE COMMAND TO ALLOW REMOVING A CARD FROM COLLECTION

    ??? ALLOW USER TO SAVE DECKS AND GET CERTAIN STATS FROM DECK EG: AVRAGE CMC, COLORS, TYPES, ETC ???

    ??? GATCHA MODE ???

*/

