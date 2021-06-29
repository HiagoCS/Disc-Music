//Requires
const Discord = require('discord.js');
const fs  = require('fs');
//JSON
const prefix = require('./JSON/config.json');
const keys = require('./JSON/keys.json');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, file) =>{

	if (err) console.log(err);

	let jsFile = file.filter(f => f.split(".").pop() === "js")
	if (jsFile.length <= 0) {
		console.log("Não achei comando porra");
		return;
	}

	jsFile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded`);
		bot.commands.set(props.help.name, props);

	})
})

bot.login(keys.token_discord);
bot.on('ready', () =>{
	console.log("Denis DJ está ONLINE!!");
});

bot.on('message', msg =>{
	let messageArray = msg.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	if (msg.author.bot) return;

	let commandFile = bot.commands.get(cmd.slice(prefix.prefix.music.length));
	if (commandFile) commandFile.run(bot, msg, args);
});