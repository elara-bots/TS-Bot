import {
    PrefixCommand,
    createEvent,
    handleMessageCommand,
} from "@elara-services/botbuilder";
import { getFilesList } from "@elara-services/utils";
import { Events, type Message } from "discord.js";
import * as Commands from "../prefix";

export const messageCreate = createEvent({
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
});
