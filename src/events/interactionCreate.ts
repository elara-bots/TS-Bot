import {
    handleInteractionCommand,
    type Event,
    type SlashCommand,
} from "@elara-services/botbuilder";
import { getFilesList } from "@elara-services/utils";
import { Events, Interaction } from "discord.js";
import * as Commands from "../commands";

export const interactionCreate: Event = {
    enabled: true,
    name: Events.InteractionCreate,
    async execute(i: Interaction) {
        handleInteractionCommand(i, getFilesList<SlashCommand>(Commands));
    },
};
