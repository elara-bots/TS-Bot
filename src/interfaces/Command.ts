import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getResponders } from "../utils";

export interface SlashCommand {
    command: SlashCommandBuilder;
    execute(
        interaction: ChatInputCommandInteraction,
        responder: getResponders
    ): Promise<unknown>;
}
