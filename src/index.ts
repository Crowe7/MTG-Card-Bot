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

// TODO

/*

    WRITE A METHOD TO CACHE THE DATA FRMO SCRYFALL... THEY HAVE AN API CALL FOR IT

    MAKE A MONGODB DATABASE TO SYNC INTO IT
    
    CREATE A FUCNTION THAT STRIPS ALL SPACES AND FORCES LOWERCASE

    THEN QUERY THE DATABASE FOR EITHER 
        1. WE CALL THE API FOR AUTO COMPLETE THEN CHECK IF DATABSE CONTAINS CARD THAT IS IN THE FIRST SLOT
        2. WRITE SOME REGEX TO SEARCH FOR ANY SINGLE CARD IN THE CARD COLLECTION IN THE DB THAT CONTAINS THOSE CHARACTERS THEN RETURN THE FIRST ONE WE FIND
    
    BUILD OUT NODE BACKEND FOR FETCHING STORED DATA IN DATABASE

    LOOK INTO AND USE CRONJOBS TO RUN THE CACHE METHOD EVERY 24 HOURS TO GET ACCURATE PRICES
*/