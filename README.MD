# How to get started


## Env Setup: 
1. Use `cp .env.example .env` to create the .env file.
2. Fill out the `.env` file with the data needed. 
3. Go to `ecosystem.config.js` and provide the `name` you want to name the PM2 process (default: `TS-Bot`)
4. More info on .env: 
```txt
    "TOKEN" is your Discord bot's token from the Discord developer portal (here: https://discord.com/developers/applications)
    "timeZone" is the timezone you want the logs and other stuff to be in when posting to the console, etc. (full list here: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)
    "PREFIX" is the prefix you want to be used for prefix commands (ex: `!ping`)
```

## PM2 Setup: 
1. Install the packages with `npm i` (wait for that to finish)
2. Install PM2 globally (`npm i pm2 -g`)
3. Start the bot with `pm2 start ecosystem.config.js`
4. Use `pm2 l` or `pm2 logs <name>` to view the logs for the bot. 


## Locally: 
1. `npm i` - Install the packages
2. `npm run deploy` - Registers the bot's /commands to Discord
3. `npm run ds` - Build and run the bot. 