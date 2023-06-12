import { Events, Interaction } from "discord.js";
import { getFilesList, Collection } from "@elara-services/utils";
import { Event, SlashCommand } from "../interfaces";
import { getResponder } from "../utils";
import * as Commands from "../commands";

export const interactionCreate: Event = {
    name: Events.InteractionCreate,
    async execute(i: Interaction) {
        if (i.isChatInputCommand()) {
            const commands = getFilesList(Commands) as Collection<
                string,
                SlashCommand
            >;
            const command = commands.find((c) => c.command.name === i.commandName);
            if (command) {
                return command.execute(i, getResponder(i));
            }
        }
    },
};
