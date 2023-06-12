import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { type getInteractionResponders } from "@elara-services/utils";

export interface SlashCommand {
    command: SlashCommandBuilder;
    execute(
        interaction: ChatInputCommandInteraction,
        responder: getInteractionResponders
    ): Promise<unknown>;
}
