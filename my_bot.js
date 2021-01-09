const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const Enmap = require('enmap');
client.saveData = new Enmap({name: "Classes"});

client.on('ready', () => {
    console.log("Connected");
});

client.on('message',(message) =>
{
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;
    let line = message.content.substring(config.prefix.length).split(" ");
    const command = line[0].toLowerCase();
    const guild = message.guild;
    if(message.channel.guild_id != null)
        var name = message.member.displayName;

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
    if(command == "check")
    {
        message.channel.send("Current classes: " + client.saveData.count);
    }
    if(command == "clear")
    {
        client.saveData.clear();
        message.channel.send("Current classes: " + client.saveData.count);
    }

    // Needs to check permission to see if class mod
    // !addtest TestName ClassName
    if(command == "addtest")
    {
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
        client.saveData.set(line[1], new Object(line[1], line[2]));
        // if(!client.saveData.has(line[2]))
        // {
        //     message.channel.send("Class Not Found");
        // }
        // else
        // {
        //     let section = client.saveData.get(line[2]);
        //     console.log("Section get!!");
        //     message.channel.send(section.printName() + "adding now");
        //     section.addTest(new Test(line[1]));
        //     client.saveData.set(line[2], section);
        // }
    }
    // !listtests ClassName
    if(command == "listtests")
    {
        message.channel.send("# of tests: " + client.saveData.count);
    }

    //will check the testname and class name to make sure it is a valid test, then dm and ask for grade
    // !addgrade TestName ClassName
    if(command == "addgrade")
    {

        if(!client.saveData.has(line[1]))
        {
            message.channel.send("Test Not Found");
        }
        else
        {
            var test = client.saveData.get(line[1]);
            test.sum += 65;
            test.numGrades++;
            client.saveData.update(line[1], test);
        }

        //gradechannel.delete()
    }

    //Will need Min, Max, Average, Name, Date, and Section
    if(command == "testinfo")
    {
        if(!client.saveData.has(line[1]))
        {
            message.channel.send("Test Not Found");
        }
        else
        {
            var test = client.saveData.get(line[1]);
            console.log(test);
            message.channel.send(test.sum + " > " + test.numGrades);
        }
    }

    // !join ClassName
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
            if(message.member.roles.highest.comparePositionTo(config.moderator) < 0 && section.comparePositionTo(config.moderator) >= 0)
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

function Object(name, section)
{
    this.name = name;
    this.section = section;
    this.sum = 0;
    this.numGrades = 0;
    this.max = -1;
    this.min = -1;
}
