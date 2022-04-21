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