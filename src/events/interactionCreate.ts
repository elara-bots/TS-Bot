import { Events, Interaction } from "discord.js";
import { Event } from "../interfaces/Event";
import { SlashCommand } from "../interfaces/Command";
import { getFilesList, Collection } from "@elara-services/utils";
import * as Commands from "../commands";
import { getResponder } from "../utils";

export const interactionCreate: Event = {
    name: Events.InteractionCreate,
    async execute(i: Interaction) {
        if (i.isChatInputCommand()) {
            const commands = getFilesList(Commands) as Collection<
                string,
                SlashCommand
            >;
            const command =
                commands.get(i.commandName) ||
                commands.find((c) => c.command.name === i.commandName);
            if (command) {
                return command.execute(i, getResponder(i));
            }
        }
    },
};
