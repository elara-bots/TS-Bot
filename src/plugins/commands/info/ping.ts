import { buildCommand, type SlashCommand } from "@elara-services/botbuilder";
import { embedComment } from "@elara-services/utils";
import { Colors, SlashCommandBuilder, SnowflakeUtil } from "discord.js";

export const ping = buildCommand<SlashCommand>({
    command: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`View the latency for the bot`),
    defer: { silent: true },
    async execute(i, r) {
        return r
            .edit(
                embedComment(
                    `🏓Pong! \`${
                        Date.now() - SnowflakeUtil.timestampFrom(i.id)
                    }ms\``,
                    Colors.Aqua,
                ),
            )
            .catch(() => null);
    },
});
