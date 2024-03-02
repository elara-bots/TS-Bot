import { Events, createEvent } from "@elara-services/botbuilder";
import { log } from "@elara-services/utils";
import type { Client } from "discord.js";

export const ready = createEvent({
    name: Events.ClientReady,
    async execute(client: Client<true>) {
        log(
            `[CLIENT]: ${client.user.tag} is now ready in ${client.guilds.cache.size} servers.`,
        );
    },
});
