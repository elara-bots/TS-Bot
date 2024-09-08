import "dotenv/config";

import { deployCommands, type SlashCommand } from "@elara-services/botbuilder";
import { getFilesList } from "@elara-services/utils";
import * as Commands from "../plugins/commands";
import * as context from "../plugins/context";

deployCommands(
    process.env.TOKEN as string,
    getFilesList<SlashCommand>(Commands),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFilesList<any>(context),
);
