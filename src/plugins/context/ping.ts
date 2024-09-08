import {
    buildCommand,
    type MessageContextMenuCommand,
} from "@elara-services/botbuilder";
import { embedComment } from "@elara-services/utils";
import {
    ApplicationCommandType,
    Colors,
    ContextMenuCommandBuilder,
    SnowflakeUtil,
} from "discord.js";

export const ping = buildCommand<MessageContextMenuCommand>({
    command: new ContextMenuCommandBuilder()
        .setName(`ping`)
        .setDMPermission(false)
        .setType(ApplicationCommandType.Message),
    defer: { silent: true },
    async execute(i, r) {
        if (!i.inCachedGuild()) {
            return;
        }
        const ms = Date.now() - SnowflakeUtil.timestampFrom(i.id);
        return r.edit(embedComment(`🏓 Pong! \`${ms}ms\``, Colors.Aqua));
    },
});
