import { Client, Intents, Interaction } from "discord.js"
import 'dotenv/config'
import express from 'express'
import ready from "./listeners/ready"
import interactoinCreate from "./listeners/interactoinCreate"
const TOKEN = process.env.TOKEN

console.log("Bot Starting...");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

ready(client);
interactoinCreate(client);

client.login(TOKEN);