import { Client, Events } from "discord.js";
import { Event } from "../interfaces/Event";

export const ready: Event = {
    name: Events.ClientReady,
    execute(client: Client) {
        console.log(
            `[CLIENT]: ${client.user?.tag} is now ready in ${client.guilds.cache.size} servers.`
        );
    },
};
