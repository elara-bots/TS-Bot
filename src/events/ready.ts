import { Events, type Event } from "@elara-services/botbuilder";
import { Client } from "discord.js";

export const ready: Event = {
    enabled: true,
    name: Events.ClientReady,
    execute(client: Client) {
        console.log(
            `[CLIENT]: ${client.user?.tag} is now ready in ${client.guilds.cache.size} servers.`,
        );
    },
};
