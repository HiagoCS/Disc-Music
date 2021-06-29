const Discord = require('discord.js');
const botRaiz = "C:/Users/Hiago Costa/Documents/Dev Docs/Discord Bots/Music Bot"

const servers = require(botRaiz+'/JSON/serverCtrl.json');

module.exports.run = (bot, msg, args) => {
	if (msg.member.voice.channel) {
			if (servers.server.DJ.paused) {
				servers.server.DJ.resume();
				console.log("Despausado");
			}
			else{
				msg.channel.send("A musica já esta tocando!!");
			}
	}
	else{
		msg.channel.send("Você precisa estar em uma sala de voz!!");
	}
}
module.exports.help = {
	name : "resume"
}