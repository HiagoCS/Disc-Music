const Discord = require('discord.js');

const botRaiz = "C:/Users/Hiago Costa/Documents/Dev Docs/Discord Bots/Music Bot"

const servers = require(botRaiz+'/JSON/serverCtrl.json');

module.exports.run = (bot, msg, args) => {
	if (msg.member.voice.channel) {
		if (!servers.server.DJ.paused) {
			servers.server.DJ.pause();
			console.log("Pausado");
		}
		else{
			msg.channel.send("A musica já está pausada!!");
		}
	}
	else{
		msg.channel.send("Você precisa estar em uma sala de voz!!");
	}
}

module.exports.help = {
	name : "pause"
}