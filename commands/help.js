const Discord = require('discord.js');

const botRaiz = "C:/Users/Hiago Costa/Documents/Dev Docs/Discord Bots/Music Bot"

const configs = require(botRaiz+'/JSON/config.json');
const commands = require(botRaiz+'/JSON/commands.json');

module.exports.run = (bot, msg, args) => {
	const embed = new Discord.MessageEmbed()
	.setColor([193,17,199])
	.setAuthor("Dennis DJ")
	.setDescription("Comandos do Dennis DJ");
	for(let i in commands.basics){
		embed.addField("**"+commands.basics[i].name+"**", "**"+commands.basics[i].description+"**");
	}
	msg.channel.send(embed);
}
module.exports.help = {
	name : "help"
}