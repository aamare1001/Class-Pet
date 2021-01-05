const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
    console.log("Connected");
});

client.on('message',(message) =>
{
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;
    let line = message.content.substring(config.prefix.length).split(" ");
    const command = line[0].toLowerCase();
    var name = message.member.displayName;
    const guild = message.guild;

    if(command == "ping")
    {
        message.channel.send("pong! " + name);
        console.log("ponged in " + message.channel.name);
    }

    if(command == "chat")
    {
        //const chat = new Discord.DMChannel(client, message.author);
        console.log("started chat with " + name);
        message.author.send("hi");

    }
    if(command == "up")
    {
        var time = client.uptime / 1000;
        time = Math.floor(time / 60);
        message.channel.send("I've been up for: " + time +" minutes");
        console.log("I've been up for: %d minutes", time);
    }
    if(command == "addtest")
    {
        // const filter = m => m.author.id == message.author.id;
        // const collector = await message.channel.awaitMessages(filter, {max: 1, time: 10000, errors:['time']});
        // console.log(collector.get(collector.firstKey()).content);
        // var testName = collector.get(collector.firstKey()).content;
        // message.channel.send("Test name is " + testName);
        // var fs = require('fs');
        // fs.writeFile((testName + ".txt"), (testName + ' Grades:'), function(err)
        //     {
        //         if (err) throw err;
        //         console.log(testName + " created!");
        //     });
    }
    if(command == "addgrade")
    {
        message.author.send("Which test?");
        // List Tests
        var author = message.author.username;
        var gradechannel = message.guild.channels.create((author + " GRADE"), {position: 1})
        .then(console.log)
        .catch(console.error);

        gradechannel.delete()
    }

    if(command == "join")
    {
        let section = guild.roles.cache.find(role => role.name == line[1]);
        if(section == undefined)
        {
            if(line.length == 1)
            {
                message.channel.send("Needs class");
            }
            else
            message.channel.send(line[1] +" is not a role!");
        }
        else {
            //console.log("looking for nothing: " + guild.roles.cache.find(role => role.name == "newrole"));
            if(message.member.roles.highest.comparePositionTo("795765460049854514") < 0 && section.comparePositionTo("795765460049854514") >= 0)
            {
                message.channel.send("```Nice attempt to get power hahaha. you tried```");
            }
            else
            message.member.roles.add(section.id);
            // message.member.roles.add("795757104128065537");
        }
    }
    if(command == "leave")
    {
        let section = guild.roles.cache.find(role => role.name == line[1]);
        if(section == undefined)
        {
            if(line.length == 1)
            {
                message.channel.send("Needs class");
            }
            else
            message.channel.send(line[1] +" is not a role!");
        }
        else {
            //console.log("looking for nothing: " + guild.roles.cache.find(role => role.name == "newrole"));
            message.member.roles.remove(section.id);
            // message.member.roles.add("795757104128065537");
        }
    }
})

client.login(config.token);

class Test
{
    #name;
    #sum = 0;
    #numGrades = 0;
    constructor(name)
    {
        this.sum = 0;
        this.numGrades = 0;
    }

    add(grade)
    {
        if(grade < 0)
        {
            message.channel.send("Impossible Grade")
        }
        if(grade > 100)
        {
            mesage.channel.send("Grade added. Was there Extra credit on this test?")
        }
        this.sum += grade;
        this.numGrades++;
    }

    remove(grade)
    {
        this.sum -= grade;
        this.numGrades--;
    }

    average()
    {
        messgae.channel.send("The average of " + " name is currently: " +(this.sum/this.numGrades));
    }
}

class Section
{
    #name;
    tests = [];
    constructor(name)
    {
        this.name = name;
    }
    addTest(test)
    {
        this.tests.push(test);
    }
    removeTest(testName)
    {
        //remove test by name
    }
    getTest(test)
    {
        return tests[test];
    }
}
