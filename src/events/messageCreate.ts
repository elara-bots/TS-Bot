import {
    PrefixCommand,
    handleMessageCommand,
    type Event,
} from "@elara-services/botbuilder";
import { getFilesList } from "@elara-services/utils";
import { Events, type Message } from "discord.js";
import * as Commands from "../prefix-commands";

export const messageCreate: Event = {
    enabled: true,
    name: Events.MessageCreate,
    async execute(message: Message) {
        if (message.client.prefix) {
            handleMessageCommand(
                message,
                getFilesList<PrefixCommand>(Commands),
                message.client.prefix,
            );
        }
    },
};
