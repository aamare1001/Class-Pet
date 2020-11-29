const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");


client.on('ready', () => {
    console.log("Connected");
});

client.on('message', async (message) =>
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

    }
    if(command === "up")
    {
        var time = client.uptime / 1000;
        time = Math.floor(time / 60);
        message.channel.send("I've been up for: " + time +" minutes");
        console.log("I've been up for: %d minutes", time);
    }
    if(command === "addtest")
    {
        const filter = m => m.author.id === message.author.id;
        const collector = await message.channel.awaitMessages(filter, {max: 1, time: 10000, errors:['time']});
        console.log(collector.get(collector.firstKey()).content);
        var testName = collector.get(collector.firstKey()).content;
        message.channel.send("Test name is " + testName);
        var fs = require('fs');
        fs.writeFile((testName + ".txt"), (testName + ' Grades:'), function(err)
            {
                if (err) throw err;
                console.log(testName + " created!");
            });
    }
})

client.login(config.token);
