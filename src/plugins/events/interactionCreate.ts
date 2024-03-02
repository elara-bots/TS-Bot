import { createEvent, handleInteractions } from "@elara-services/botbuilder";
import { Events, Interaction } from "discord.js";
import * as Commands from "../commands";
import * as context from "../context";

export const interactionCreate = createEvent({
    name: Events.InteractionCreate,
    async execute(i: Interaction) {
        if (i.isChatInputCommand()) {
            return handleInteractions(i, Commands);
        }
        if (i.isContextMenuCommand()) {
            return handleInteractions(i, context);
        }
    },
});
