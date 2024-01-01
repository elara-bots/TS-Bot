import type { SlashCommand } from "@elara-services/botbuilder";
import { comment } from "@elara-services/utils";
import { Colors, SlashCommandBuilder, SnowflakeUtil } from "discord.js";

export const ping: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`View the latency for the bot`),
    defer: {
        silent: true,
    },
    async execute(i, r) {
        return r
            .edit({
                embeds: [
                    comment(
                        `🏓Pong! \`${
                            Date.now() - SnowflakeUtil.timestampFrom(i.id)
                        }ms\``,
                        Colors.Aqua,
                    ),
                ],
            })
            .catch(() => null);
    },
};
