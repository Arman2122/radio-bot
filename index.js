// import config files
const { TOKEN, CHANNEL, LIVE } = require("./config.json");
const ytdl = require("ytdl-core");

// import events loader and node event handler functions
const { loadEvents } = require("./utility/loadEvents");
const { loadNode } = require("./utility/loadNode");

// Discord client
const { Client } = require("discord.js");
const { MessageEmbed } = require('discord.js');

const client = new Client();

// error if no token provided, and error if channel id and yt url aren't valid
if (!TOKEN) {
  console.error("Please provide a valid Discord Bot Token.");
  process.exit(1);
} else if (!CHANNEL || Number(CHANNEL) == NaN) {
  console.log("Please provide a valid channel ID.");
  process.exit(1);
} else if (!ytdl.validateURL(LIVE)) {
  console.log("Please provide a valid Youtube URL.");
  process.exit(1);
}

//restart commnad
client.on('message', message => {
  let isBotOwner = message.author.id == '460692713025830912';
  if (message.content === 'restart') {
    if(!isBotOwner) 
      return;
      
    /*else
        message.channel.send(`<a:ANdiscord2:801585193260679169> Okay, I'll restart...`)
        .then(() => client.destroy(),
        client.login(TOKEN),
        console.log("Bot Restart Shod Loading Up ..."),
        loadEvents(client, process), 
        loadNode(process),
        console.log("Tamami Event Ha Load Shodan")
      )
    }*/


    else
        message.channel.send(`<a:ANdiscord2:801585193260679169> Okay, I'll restart...`)
        .then(() => client.destroy()).then(() => client.login(TOKEN)).then(() => loadEvents(client, process)).then (() => loadNode(process))
        client.login(TOKEN)
        console.log("Bot Restart Shod Loading Up ...")
        loadEvents(client, process),
        loadNode(process)
        console.log("Tamami Event Ha Load Shodan")
      
    }

});

//proxy
const proxyip = '194.233.69.90';
const proxyport = 443;

// login
client.login(TOKEN).then(() => {
  console.log(` Successfully logged in as: ${client.user.username}#${client.user.discriminator}`);
})

// run events loader and node events handler functions
loadEvents(client, process);
loadNode(process);
