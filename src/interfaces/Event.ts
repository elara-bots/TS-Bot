import { Events } from "discord.js";

export interface Event {
    name: keyof typeof Events | string;
    emit?: "on" | "once";
    execute(...args: unknown[]): Promise<unknown> | unknown;
}
