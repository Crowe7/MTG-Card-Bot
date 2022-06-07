import fs from 'node:fs'
import { Client, Intents, Collection } from "discord.js"
import 'dotenv/config'
import express from 'express'
import interactionCreate from "./listeners/interactionCreate"
import ready from "./listeners/ready"
import { Commands } from './AllCommands'
const TOKEN = process.env.TOKEN

console.log("Bot Starting...");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});


ready(client);
interactionCreate(client);

client.login(TOKEN);

// TODO CACHE

/*
            // CRON JOB TODO
                HAVE A CRON DROP DROP DATABASE ENTIRELY EVERY WEEK TO CLEAR CACHE.. 

    WRITE A METHOD TO CACHE THE DATA FRMO SCRYFALL... THEY HAVE AN API CALL FOR IT

    MAKE A MONGODB DATABASE TO SYNC INTO IT
    
    CREATE A FUCNTION THAT STRIPS ALL SPACES AND FORCES LOWERCASE

    THEN QUERY THE DATABASE FOR EITHER 
        1. WE CALL THE API FOR AUTO COMPLETE THEN CHECK IF DATABSE CONTAINS CARD THAT IS IN THE FIRST SLOT
        2. WRITE SOME REGEX TO SEARCH FOR ANY SINGLE CARD IN THE CARD COLLECTION IN THE DB THAT CONTAINS THOSE CHARACTERS 
            THEN RETURN AN ARRAY ALL THAT MATCH
                IF NON EXISTANT FETCH FROM API
                IF ONLY ONE RETURN IT
                IF MULTIPLE RUN FILTER TO RETURN THE ONE THAT MATCHES THE SET THEN DISPLAY THAT ONE... maybe save card as a card instance stored inside of the actual card collection
                    Save card name first as an item in the card collection... then add the card to the card instances collection refrenceing the card objectid itself
                    card instances have sets, image link, price, description, type, rarity, CMC and if it has card faces save those inside as well
                        have a card faces type and add that onto the card if it does have any faces
    
    BUILD OUT NODE BACKEND FOR FETCHING STORED DATA IN DATABASE

    LOOK INTO AND USE CRONJOBS TO RUN THE CACHE METHOD EVERY 24 HOURS TO GET ACCURATE PRICES
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

