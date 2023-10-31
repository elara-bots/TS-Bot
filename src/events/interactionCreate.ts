import type { Event, SlashCommand } from "@elara-services/botbuilder";
import { getFilesList, getInteractionResponder } from "@elara-services/utils";
import { Events, Interaction } from "discord.js";
import * as Commands from "../commands";

export const interactionCreate: Event = {
    enabled: true,
    name: Events.InteractionCreate,
    async execute(i: Interaction) {
        if (i.isChatInputCommand()) {
            const commands = getFilesList<SlashCommand>(Commands);
            const command = commands.find(
                (c) => c.command.name === i.commandName,
            );
            if (command) {
                return command.execute(i, getInteractionResponder(i));
            }
        }
    },
};
