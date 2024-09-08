import { buildPrefixCommand } from "@elara-services/botbuilder";
import { embedComment, noop } from "@elara-services/utils";
import { Colors } from "discord.js";

export const ping = buildPrefixCommand({
    name: "ping",
    async execute(_, r) {
        const d = Date.now();
        const msg = await r.loading();
        if (!msg) {
            return;
        }
        return msg
            .edit(embedComment(`🏓 Pong! \`${Date.now() - d}ms\``, Colors.Aqua))
            .catch(noop);
    },
});
