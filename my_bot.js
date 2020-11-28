const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");


client.on('ready', () => {
    console.log("Connected");
});

client.on('message', message =>
{
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    var name = message.author.display_name;

    if(command === "ping")
    {
        message.channel.send("pong! " + message.author.display_name);
    }
})

client.login(config.token);
