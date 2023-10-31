import { config } from "dotenv";
config({ path: `${process.cwd()}/.env` });
import { getFilesList } from "@elara-services/utils";
import * as Commands from "../commands";
import { deployCommands, type SlashCommand } from "@elara-services/botbuilder";

const commands = getFilesList<SlashCommand>(Commands);
deployCommands(process.env.TOKEN as string, commands);
