const Discord = require('discord.js');

const botRaiz = "C:/Users/Hiago Costa/Documents/Dev Docs/Discord Bots/Music Bot"

const fila = require(botRaiz+'/JSON/serverCtrl.json');
var stayPlaying = require(botRaiz+'/JSON/serverCtrl.json');

module.exports.run = (bot, msg, args) => {
	while((i = fila.fila.shift()) != undefined)
	{
		i;
	}
	stayPlaying.stayPlaying = false;
	const channel = bot.channels.cache.get('<id>')
	msg.reply("Saindo do canal!!");
	let VoiceChannel = msg.member.voice.channel;
	VoiceChannel.leave();
}
module.exports.help ={
	name : "stop"
}