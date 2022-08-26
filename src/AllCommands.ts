
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';

import {CardInfo} from './commands/CardInfo'
import { Collection } from './commands/Collection';
import { RandomCard } from './commands/RandomcCard';
export interface Command {
    data:
    | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
    run: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
// Put all commands here
export const Commands:Command[] = [CardInfo, RandomCard, Collection];

