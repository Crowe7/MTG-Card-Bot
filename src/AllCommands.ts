
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import {CardInfo} from './commands/CardInfo'
import { RandomCard } from './commands/RandomcCard';
export interface Command {
    data:
    | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
    run: (interaction: CommandInteraction) => Promise<void>;
}
// Put all commands here
export const Commands:Command[] = [CardInfo, RandomCard];

