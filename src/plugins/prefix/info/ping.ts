import { buildPrefixCommand } from "@elara-services/botbuilder";
import { colors, embedComment, noop } from "@elara-services/utils";

export const ping = buildPrefixCommand({
    name: "ping",
    async execute(_, r) {
        const d = Date.now();
        return (await r.loading())
            ?.edit(
                embedComment(`🏓 Pong! \`${Date.now() - d}ms\``, colors.cyan),
            )
            .catch(noop);
    },
});
