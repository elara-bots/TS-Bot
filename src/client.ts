import "dotenv/config";

import { getPresence, loadEvents } from "@elara-services/botbuilder";
import { getFilesList } from "@elara-services/utils";
import {
    Client,
    IntentsBitField,
    Options,
    type ActivityType,
    type PresenceData,
} from "discord.js";
import * as events from "./plugins/events";
import { checkIfDeploy } from "./scripts/checks";

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
            rest: { offset: 100 },
            makeCache: Options.cacheWithLimits({
                MessageManager: { maxSize: 200 },
            }),
            presence: getPresence({
                status: process.env.STATUS as PresenceData["status"],
                name: process.env.ACTIVITY_NAME,
                type: process.env.ACTIVITY_TYPE as keyof typeof ActivityType,
                stream_url: process.env.STREAM_URL,
            }),
        });
        if (!checkIfDeploy()) {
            loadEvents(this, getFilesList(events));
            this.login(process.env.TOKEN).catch(console.error);
        }
    }
}
export default new BotClient(process.env.PREFIX);
