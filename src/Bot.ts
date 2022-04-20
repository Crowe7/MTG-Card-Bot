import { Client } from "discord.js"
import 'dotenv/config'
import express from 'express'

console.log("Bot Starting...");

const client = new Client({
    intents: []
});

const TOKEN = process.env.TOKEN

client.login(TOKEN);

console.log(client);