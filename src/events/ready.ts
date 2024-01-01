import { Events, type Event } from "@elara-services/botbuilder";
import { ActivityType, Client, PresenceData } from "discord.js";

export const ready: Event = {
    enabled: true,
    name: Events.ClientReady,
    async execute(client: Client<true>) {
        console.log(
            `[CLIENT]: ${client.user.tag} is now ready in ${client.guilds.cache.size} servers.`,
        );
        const obj: PresenceData = {
            status: "online",
            activities: [
                {
                    type: ActivityType.Custom,
                    name: "commands",
                },
            ],
        };
        if (process.env.STATUS) {
            obj.status = process.env.STATUS as PresenceData["status"];
        }
        if (process.env.ACTIVITY_TYPE) {
            // @ts-ignore
            obj.activities[0].type =
                ActivityType[
                    process.env.ACTIVITY_TYPE as keyof typeof ActivityType
                ];
        }
        if (process.env.STREAM_URL) {
            // @ts-ignore
            obj.activities[0].url = process.env.STREAM_URL;
        }
        if (process.env.ACTIVITY_NAME) {
            // @ts-ignore
            obj.activities[0].name = process.env.ACTIVITY_NAME;
        }
        client.user.setPresence(obj);
    },
};
