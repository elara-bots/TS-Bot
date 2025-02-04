import "dotenv/config";

import { log } from "@elara-services/utils";
import { ShardingManager } from "discord.js";

const time = Date.now();
const manager = new ShardingManager(`./dist/client.js`, {
    token: process.env.TOKEN,
    totalShards: "auto",
});

manager.on("shardCreate", (shard) => {
    log(
        `[SHARDS]: [${((new Date().getTime() - time) / 1000).toFixed(
            2,
        )}s] Shard (${shard.id}) online.`,
    );
});

manager.spawn();
