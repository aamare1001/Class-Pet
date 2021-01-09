const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const Enmap = require('enmap');
const classes = ["Chernyak", "Jerousek", "Al-Rawi", "Velissaris", "Honors"];
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
        if(message.member.roles.highest.comparePositionTo(config.SoloRank) < 0)
        {
            message.channel.send("```You can not clear```");
        }
        else
        {
            client.saveData.clear();
            message.channel.send("Current classes: " + client.saveData.count);
        }
    }
    // Needs to check permission to see if class mod
    // Needs to check if class name is real
    // !addtest TestName ClassName
    if(command == "addtest")
    {
        if(message.member.roles.highest.comparePositionTo(config.classMod) < 0)
        {
            message.channel.send("```You are not a Class Moderator```");
        }
        else if(line.length != 3)
        {
            message.channel.send("Incorrect Syntax\n```!addTest TestName ClassName```");
        }
        else if(!classes.includes(line[2]))
        {
            message.channel.send(line[2] + " is not a valid class!");
        }
        else
        {
            if(client.saveData.has(line[1]))
            {
                message.channel.send(line[1] + " is already taken, please name the test a different name.");
            }
            else
            {
                client.saveData.set(line[1], new Object(line[1], line[2]));
                message.channel.send("Test " + line[1] + " successfully added to the " + line[2] + " class!");
            }
        }
    }
    // Needs to get tests with correct Section
    // !listtests ClassName
    if(command == "listtests")
    {
        if(line.length != 2)
        {
            message.channel.send("Incorrect Syntax\n```!listtests ClassName```");
        }
        else if(!classes.includes(line[1]))
        {
            message.channel.send(line[1] + " is not a valid class!");
        }
        else
        {
            var tests = client.saveData.array();
            var temp = [];
            var string = "```Tests in " + line[1] + ":\n==========================\n";
            for(var i = 0; i < tests.length;i++)
            {
                if(tests[i].section == line[1])
                {
                    temp.push(tests[i]);
                }
            }
            for(var i = 0; i < temp.length; i++)
            {
                string += temp[i].name + "\n";
            }
            string += "```";
            if(temp.length == 0)
            {
                message.channel.send("No tests have been added for this class yet.");
            }
            else
                message.channel.send(string);

        }
        //message.channel.send("# of tests: " + client.saveData.count);
    }

    //will check the testname and class name to make sure it is a valid test, then dm and ask for grade
    // !addgrade TestName ClassName Grade
    if(command == "addgrade")
    {
        if(line.length != 4)
        {
            message.channel.send("Incorrect Syntax\n```!addgrade TestName ClassName```");
        }
        else if(!client.saveData.has(line[1]))
        {
            message.channel.send("Test Not Found");
        }
        else if(!classes.includes(line[2]))
        {
            message.channel.send(line[2] + " is not a valid class!");
        }
        else
        {
            var test = client.saveData.get(line[1]);
            if(test.section != line[2])
            {
                message.channel.send(test.name + " is not in the " + line[2] + " class.");
            }
            else
            {
                test.sum += parseInt(line[3]);
                test.numGrades++;
                if(test.max < parseInt(line[3]))
                    test.max = parseInt(line[3]);
                if(test.min > parseInt(line[3]))
                    test.min = parseInt(line[3]);
                client.saveData.update(line[1], test);
            }
        }
    }

    //!removetest testname classname
    if(command == "removetest")
    {
        if(message.member.roles.highest.comparePositionTo(config.classMod) < 0)
        {
            message.channel.send("```You are not a Class Moderator```");
        }
        else if(line.length != 3)
        {
            message.channel.send("Incorrect Syntax\n```!removeTest TestName ClassName```");
        }
        else if(!classes.includes(line[2]))
        {
            message.channel.send(line[2] + " is not a valid class!");
        }
        else
        {
            if(!client.saveData.has(line[1]))
            {
                message.channel.send(line[1] + " was never added.");
            }
            else
            {
                if(client.saveData.get(line[1]).section != line[2])
                {
                    message.channel.send(line[1] + " was never added to this class.");
                }
                else
                {
                    client.saveData.delete(line[1]);
                    message.channel.send("Test " + line[1] + " successfully deleted from the " + line[2] + " class!");
                }
            }
        }
    }

    //Will need Min, Max, Average, Name, Date, and Section
    //!testinfo testName ClassName
    if(command == "testinfo")
    {
        if(line.length != 3)
        {
            message.channel.send("Incorrect Syntax\n```!testinfo TestName ClassName```");
        }
        else if(!client.saveData.has(line[1]))
        {
            message.channel.send("Test Not Found");
        }
        else if(!classes.includes(line[2]))
        {
            message.channel.send(line[2] + " is not a valid class!");
        }
        else
        {
            var test = client.saveData.get(line[1]);
            var string = "```";
            if(test.section == line[2])
            {
                console.log(test);
                message.channel.send(test.sum + " > " + test.numGrades);
                //testName
                string += test.name + "\n";
                //Test Date
                //string += test.date + "\n";
                //test Section
                string += test.section + "\n";
                //grades inputted
                string += "Number of Grades inputted: " +  test.numGrades + "\n";
                //test average
                string += "Test Average: " + (test.sum / test.numGrades) + "\n";
                //test max
                string += "Test Max: " + test.max + "\n";
                //test min
                string += "Test Min: " + test.min + "```";
                message.channel.send(string);
            }
            else
            {
                message.channel.send(line[1] + " is not a test in the " + line[2] + " class.");
            }
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
    this.min = 1000;
}
