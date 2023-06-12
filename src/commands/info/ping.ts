import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../interfaces";

export const ping: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`View the latency for the bot`),
    async execute(i, r) {
        const time = Date.now();
        await r.defer({ ephemeral: true });
        return r.edit(`🏓Pong! \`${Date.now() - time}ms\``);
    },
};
