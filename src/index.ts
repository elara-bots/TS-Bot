import { config } from "dotenv";
config({ path: `${process.cwd()}/.env` });
import { Shard, ShardingManager } from "discord.js";
import { times, log } from "@elara-services/utils";
if (process.env.timeZone) {
    times.timeZone = process.env.timeZone;
}
const time = Date.now();
const manager = new ShardingManager(`./dist/client.js`, {
    token: process.env.TOKEN,
    totalShards: "auto",
});

manager.on("shardCreate", (shard: Shard) => {
    log(
        `[SHARDS]: [${((new Date().getTime() - time) / 1000).toFixed(
            2,
        )}s] Shard (${shard.id}) online.`,
    );
});

manager.spawn();
