import {
    createEvent,
    getFilesList,
    handleAutocompleteCommand,
    handleInteractions,
    type SlashCommand,
} from "@elara-services/botbuilder";
import { Events, type Interaction } from "discord.js";
import * as Commands from "../commands";
import * as context from "../context";

export const interactionCreate = createEvent({
    name: Events.InteractionCreate,
    async execute(i: Interaction) {
        if (i.isAutocomplete()) {
            return handleAutocompleteCommand(
                i,
                getFilesList<SlashCommand>(Commands),
            );
        }
        if (i.isChatInputCommand()) {
            return handleInteractions(i, Commands);
        }
        if (i.isContextMenuCommand()) {
            return handleInteractions(i, context);
        }
    },
});
