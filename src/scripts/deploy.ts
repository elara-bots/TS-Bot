import { config } from "dotenv";
config({ path: `${process.cwd()}/.env` });

import {
    APIUser,
    REST,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    Routes,
} from "discord.js";
import { getFilesList } from "@elara-services/utils";
import * as Commands from "../commands";
import { SlashCommand } from "../interfaces/Command";

const commands = getFilesList(Commands) as Map<string, SlashCommand>;
const body: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

for (const cmd of commands.values()) {
    if (
        !("command" in cmd) ||
        !("toJSON" in cmd.command) ||
        !("execute" in cmd)
    ) {
        continue;
    }
    body.push(cmd.command.toJSON());
}
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string);

(async () => {
    try {
        console.log(`Started refreshing application (/) commands.`);
        const clientId = (await rest.get(`/users/@me`)) as APIUser;

        // The put method is used to fully refresh all commands in the guild with the current set
        console.log("Deploying for production...");
        await rest.put(Routes.applicationCommands(clientId.id), { body });

        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
