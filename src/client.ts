import { config } from "dotenv";
config({ path: `${process.cwd()}/.env` });

import { loadEvents } from "@elara-services/botbuilder";
import { getFilesList, times } from "@elara-services/utils";
import { ActivityType, Client, IntentsBitField, Options } from "discord.js";
import * as events from "./events";
if (process.env.timeZone) {
    times.timeZone = process.env.timeZone;
}

declare module "discord.js" {
    export interface Client {
        prefix?: string;
    }
}

class BotClient extends Client {
    constructor(public prefix?: string) {
        super({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildPresences,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
            ],
            rest: {
                offset: 100,
            },
            makeCache: Options.cacheWithLimits({
                MessageManager: {
                    maxSize: 200,
                },
            }),
            presence: {
                status: "dnd",
                activities: [
                    {
                        name: "Just starting up",
                        type: ActivityType.Listening,
                    },
                ],
            },
        });
        loadEvents(this, getFilesList(events));
        this.login(process.env.TOKEN).catch(console.error);
    }
}
export default new BotClient(process.env.PREFIX);
