import fs from 'node:fs'
import { Client, Intents, Collection } from "discord.js"
import 'dotenv/config'
import express from 'express'
import interactionCreate from "./listeners/interactionCreate"
import ready from "./listeners/ready"
import { Commands } from './AllCommands'
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

// TODO CACHE

/*

    WRITE A METHOD TO CACHE THE DATA FRMO SCRYFALL... THEY HAVE AN API CALL FOR IT

    MAKE A MONGODB DATABASE TO SYNC INTO IT
    

    THEN QUERY THE DATABASE FOR EITHER 
        maybe run all at the same time and then check if any of the values contain anything. function returns either blank or the json for the card data
            word is what is passed into the command as a name
        
            cardModel.findOne({ "name": { $regex: regexVariable} }, 
                (err, card) => {
                    if (err) return handleErr(err);
                    if (!setName) {
                        return card.printing[0]
                    }
                    let correctCardPrinting = card.printing.filter(printing => printing.set === setName);

                    if(!correctCardPrinting) {
                        return card.printing[0];
                    }
                    return correctCardPrinting;
                }
            )
            cardNonExistanceModel.findOne({ "name": { $regex: regexVariable} }, 
                (err, card) => {
                    if (err) return handleErr(err);
                    return card;
                }
            )

        
        have this check each card and inside of each card have it check the card instances for matching set if card name matcheas
        1. WE CALL THE API FOR AUTO COMPLETE THEN CHECK IF DATABSE CONTAINS CARD THAT IS IN THE FIRST SLOT
        2. WRITE SOME REGEX TO SEARCH FOR ANY SINGLE CARD IN THE CARD COLLECTION IN THE DB THAT CONTAINS THOSE CHARACTERS 
            THEN RETURN AN ARRAY ALL THAT MATCH
                IF NON EXISTANT FETCH FROM API USING THIS https://api.scryfall.com/cards/search?as=grid&order=released&q=%21"CARDNAMEVARIABLE"+include%3Aextras&unique=prints

                    first fetch using the api that returns array of card names (`https://api.scryfall.com/cards/autocomplete?q=${textDespaced}`
                    then fill in the first result in above api to pull every printing. then save to the card collections array as
                    name: "CARDNAME"
                    sets: "LIST OF ALL PRINTED SETS THE CARD HAS BEEN IN"



                    that allows us to save every single set tied to the card at once
                    and if still not existant then add it to a non existant cards collection
                IF ONLY ONE RETURN IT
                IF MULTIPLE RUN FILTER TO RETURN THE ONE THAT MATCHES THE SET THEN DISPLAY THAT ONE... maybe save card as a card instance stored inside of the actual card collection
                    Save card name first as an item in the card collection... then add the card to the card instances collection refrenceing the card objectid itself
                    card instances have sets, image link, price, description, type, rarity, CMC and if it has card faces save those inside as well
                        have a card faces type and add that onto the card if it does have any faces
                    
    have the api calling function call modal save for if card exists or not, if it does fill in the feilds and save to the db if it doesnt save name to non existant model



    BUILD OUT NODE BACKEND FOR FETCHING STORED DATA IN DATABASE

*/

// TODO LONG TERM GOALS

/*

    SET UP DATABASE TO ALLOW USERS TO STORE CARDS THEY OWN

    WRITE COMMAND TO ALLOW USER TO ADD NEW CARD TO COLLECTION

    WRITE COMMAND TO ALLOW USER TO VIEW FULL COLLECTION

    WRITE COMMAND THAT ALLOWS USER TO EXPORT COLLECTION IN A WAY THAT THEY CAN IMPORT ONTO OTHER WEBSITES

    WRITE COMMAND TO ALLOW REMOVING A CARD FROM COLLECTION

    ??? ALLOW USER TO SAVE DECKS AND GET CERTAIN STATS FROM DECK EG: AVRAGE CMC, COLORS, TYPES, ETC ???

    ??? GATCHA MODE ???

*/

