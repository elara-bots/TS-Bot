import { type PrefixCommand } from "@elara-services/botbuilder";
import { comment } from "@elara-services/utils";
import { Colors } from "discord.js";

export const ping: PrefixCommand = {
    enabled: true,
    name: "ping",
    async execute(_, r) {
        const d = Date.now();
        const msg = await r.loading();
        return msg
            ?.edit({
                embeds: [
                    comment(`🏓 Pong! \`${Date.now() - d}ms\``, Colors.Aqua),
                ],
            })
            .catch(() => null);
    },
};
