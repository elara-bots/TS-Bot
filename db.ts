import "dotenv/config";

import { get, is, log, sleep } from "@elara-services/utils";
import { exec as ex } from "child_process";
import { existsSync, mkdirSync, readdirSync, rmdirSync, unlinkSync, writeFileSync } from "fs";
import readline from "readline-sync";

const exec = async (cmd: string) => new Promise((r) => ex(cmd, (err) => r(err ? false : true)));

const type = (name: string) => process.argv.find((c) => c.includes(name)) ? true : false;

const writeFile = async (folder: string, path: string, data: string, timer: number = get.secs(2)) => {
    await mkdirSync(folder, { recursive: true });
    await writeFileSync(`${folder}${path}`, data);
    if (is.number(timer)) {
        await sleep(timer);
    }
    return true;
};

const unlink = async (path: string, file: string) => {
    if (existsSync(`${path}${file}`)) {
        await unlinkSync(`${path}${file}`);
        const files = readdirSync(path);
        if (!files.length) {
            await rmdirSync(path);
        }
        return true;
    }
    return false;
};

async function add() {
    if (existsSync(`./prisma/schema.prisma`)) {
        throw new Error(`Prisma is already installed!`);
    }
    log(`[DB_ADD]: Installing prisma and @prisma/client`);
    await exec(`npm i prisma -D && npm i @prisma/client`);
    await sleep(get.secs(10));
    log(`[DB_ADD]: Creating ./prisma/schema.prisma`);
    await writeFile(`${__dirname}/prisma`, `/schema.prisma`, `
    // This is your Prisma schema file,
    // learn more about it in the docs: https://pris.ly/d/prisma-schema

    generator client {
        provider = "prisma-client-js"
    }

    datasource db {
        provider = "mongodb"
        url      = env("DATABASE_URL")
    }
`.trim());
    log(`[DB_ADD]: Creating ./src/plugins/services/db.ts`);
    await writeFile(`${__dirname}/src/plugins/services`, `/db.ts`, `
        import { PrismaClient } from "@prisma/client";
        export const prisma = new PrismaClient();    
    `.trim());
    log(`[DB_ADD]: Adding 'prestart' script to package.json file.`);
    const pack = require("./package.json");
    pack.scripts['prestart'] = `npx prisma db push`;
    await writeFileSync(`./package.json`, JSON.stringify(pack, undefined, 2));
    await sleep(get.secs(5));
    log(`[DB_ADD]: Running 'npm run fix'`);
    await exec(`npm run fix`);
    await sleep(get.secs(5));
    log(`[DB_ADD]: Finished!`);
}

async function remove() {
    const name = readline.question("Are you sure you want to remove ALL database-related files?\n**(All current data in the files will be gone!)**\n\nReply with: Y/N\n\nYour Response: ");
    if (name?.toLowerCase() !== "y") {
        return log(`[DB_REMOVE]: You didn't want to go through with it.`);
    }
    log(`[DB_REMOVE]: Uninstalling prisma and @prisma/client`);
    await exec(`npm r prisma @prisma/client`);
    await sleep(get.secs(10));
    log(`[DB_REMOVE]: Deleting ./prisma/schema.prisma`);
    await unlink(`${__dirname}/prisma`, `/schema.prisma`);
    log(`[DB_REMOVE]: Delting ./src/plugins/services/db.ts`);
    await unlink(`${__dirname}/src/plugins/services`, `/db.ts`);
    log(`[DB_REMOVE]: Removing 'prestart' script from package.json file.`);
    const pack = require("./package.json");
    delete pack.scripts['prestart'];
    await writeFileSync(`./package.json`, JSON.stringify(pack, undefined, 2));
    log(`[DB_REMOVE]: Finished!`);
}


if (type("remove")) {
    remove();
} else {
    add();
}