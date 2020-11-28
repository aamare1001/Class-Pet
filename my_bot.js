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
    var name = message.author.username;

    if(command === "ping")
    {
        message.channel.send("pong! " + message.author.username);
        console.log("ponged in " + message.channel.name);
    }

    if(command === "chat")
    {
        //const chat = new Discord.DMChannel(client, message.author);
        console.log("started chat with " + name);
        message.author.send("hi");
        // const filter = m => m.content.includes('discord');
        // const collector = chat.createMessageCollector(filter, { time: 15000 });
        // collector.on('collect', m => console.log(`Collected ${m.content}`));
        // chat.send("hi there!");
        // collector.on('end', collected => console.log(`Collected ${collected.size} items`))
    }
    if(command === "up")
    {
        var time = client.uptime / 1000;
        time = Math.floor(time / 60);
        message.channel.send("I've been up for: " + time +" minutes");
        console.log("I've been up for: %d minutes", time);
    }
})

client.login(config.token);
