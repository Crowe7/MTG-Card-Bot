import { Client, GatewayIntentBits} from "discord.js"
import 'dotenv/config'
import interactionCreate from "./listeners/interactionCreate"
import ready from "./listeners/ready"
import { connectToDB } from './database/connectDB'
const TOKEN = process.env.TOKEN

console.log("Bot Starting...");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


ready(client);
connectToDB();
interactionCreate(client);

client.login(TOKEN);

// TODO ADD COLLECTION COMMAND

/*

    WRITE COMMAND TO SHOW USER FULL COLLECTION
        have a button that allows a user to export the cards as txt for importing purposes on the eventually made website

    WRITE COMMAND TO ALLOW USER TO IMPUT BULK COLLECTION DATA

    WRITE COMMAND TO ALLOW USER TO REMOVE BULK COLLECTION DATA


*/

// TODO LONG TERM GOALS

/*


    WRITE COMMAND TO ALLOW USER TO VIEW FULL COLLECTION

    WRITE COMMAND THAT ALLOWS USER TO EXPORT COLLECTION IN A WAY THAT THEY CAN IMPORT ONTO OTHER WEBSITES

    ??? ALLOW USER TO SAVE DECKS AND GET CERTAIN STATS FROM DECK EG: AVRAGE CMC, COLORS, TYPES, ETC ???

    ??? GATCHA MODE ???

*/

