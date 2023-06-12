import { config } from "dotenv";
config({ path: `${process.cwd()}/.env` });

import { Client, IntentsBitField, Options, ActivityType } from "discord.js";
import { getFilesList } from "@elara-services/utils";
import * as events from "./events";
import { Event } from "./interfaces/Event";

class BotClient extends Client {
    constructor() {
        super({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.GuildPresences,
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
        const eventsList = getFilesList(events) as Map<string, Event>;
        for (const event of eventsList.values()) {
            this[event.emit || "on"](event.name, (...args) => {
                void event.execute(...args);
            });
        }

        this.login(process.env.TOKEN).catch(console.error);
    }
}
export default new BotClient();
