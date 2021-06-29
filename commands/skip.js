const Discord = require('discord.js');

const botRaiz = "C:/Users/Hiago Costa/Documents/Dev Docs/Discord Bots/Music Bot"

const fila = require(botRaiz+'/JSON/serverCtrl.json');
const servers = require(botRaiz+'/JSON/serverCtrl.json');
module.exports.run = (bot, msg, args) => {
	if (fila.fila[0] != undefined) {
		servers.server.DJ.end();
	}
	else{
		msg.channel.send("Acabou a playlist!!");
	}
}
module.exports.help = {
	name:"skip"
}