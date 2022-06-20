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

// TODO ADD COLLECTION COMMAND

/*

    WRITE SCHEMA AND MODEL FOR THE USER THEMSELVES
        id for the specific user, and cards array

    WRITE SCHEMA AND MODEL FOR USERS CARDS
        name, details for card and quntity

    THESE GO INSIDE OF THE ACTUAL CARD INFO COMMAND AS BUTTONS THE USER CAN SEE
        darken the remove button if the user does not have the card currently in there collection.

        WRITE COMMAND TO ALLOW USER TO ADD NEW CARD TO COLLECTION
            make this a seperate function, check usersID number on discord, and find user in DB with the same ID then push the card to the users card collection array.
                user.cards.filter(cards.card.name === name => cards.card.quantity += 1)
            when the user clicks on either of the buttons provided send a new message that is ephemerel that states how many of that card the have left in the collection.

        WRITE COMMAND TO ALLOW USER TO REMOVE CARD FROM COLLECTION

    WRITE COMMAND TO SHOW USER FULL COLLECTION
        have a button that allows a user to export the cards as txt for importing purposes on the eventually made website
        

*/

// TODO LONG TERM GOALS

/*

    WRITE COMMAND TO ALLOW USER TO ADD NEW CARD TO COLLECTION

    WRITE COMMAND TO ALLOW USER TO VIEW FULL COLLECTION

    WRITE COMMAND THAT ALLOWS USER TO EXPORT COLLECTION IN A WAY THAT THEY CAN IMPORT ONTO OTHER WEBSITES

    WRITE COMMAND TO ALLOW REMOVING A CARD FROM COLLECTION

    ??? ALLOW USER TO SAVE DECKS AND GET CERTAIN STATS FROM DECK EG: AVRAGE CMC, COLORS, TYPES, ETC ???

    ??? GATCHA MODE ???

*/

