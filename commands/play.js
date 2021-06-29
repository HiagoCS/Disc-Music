const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const google = require('googleapis');
const stopCmd = require('./stop.js');

const botRaiz = "C:/Users/Hiago Costa/Documents/Dev Docs/Discord Bots/Music Bot"

const configs = require(botRaiz+'/JSON/config.json');
const prefix = require(botRaiz+'/JSON/config.json');
const keys = require(botRaiz+'/JSON/keys.json');
const servers = require(botRaiz+'/JSON/serverCtrl.json');
const fila = require(botRaiz+'/JSON/serverCtrl.json');
var stayPlaying = require(botRaiz+'/JSON/serverCtrl.json');

const youtube = new google.youtube_v3.Youtube({
	version: 'v3',
	auth: keys.google_key
});

module.exports.run = (bot, msg, args) => {
	let VoiceChannel = msg.member.voice.channel;
		if (VoiceChannel == null) {
			console.log('Canal não encontrado!!');
		}
		else{
			console.log('Canal foi encontrado!!');
			VoiceChannel.join()
			.then(connection =>{
				let tocar = msg.content.replace('.play ', '');
				if (tocar.length === 0) {
					msg.channel.send("Nada para tocar");
					return;
				}
				if (ytdl.validateURL(tocar)) {
					fila.fila.push(tocar);
					console.log("Adicionado "+ tocar);
					play(connection, msg);
				}
				else{
					youtube.search.list({
						q: tocar,
						part: 'snippet',
						fields: 'items(id(videoId),snippet(title, channelTitle))'
						},function(err, resultado){
							if (err) {
								console.log(err);
							}
							else if (resultado) {
								const resulList = [];
								for (let i in resultado.data.items) {
									const splitItem ={
										'title' : resultado.data.items[i].snippet.title,
										'channel': resultado.data.items[i].snippet.channelTitle,
										'id' : "https://www.youtube.com/watch?v="+resultado.data.items[i].id.videoId
									}
									resulList.push(splitItem);
									console.log("VIDEO ID = "+resultado.data.items[i].id.videoId)
								}
								const embed = new Discord.MessageEmbed()
									.setColor([0,241,22])
									.setAuthor('Dennis DJ')
									.setDescription('Escolha a música');

								for(let i in resulList){
									embed.addField(`${parseInt(i)+1}: ${resulList[i].title}`, resulList[i].channel);
								}
								msg.channel.send(embed)
								.then((embedMessage)=>{
									const options = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'];
									for(let i in options){
										embedMessage.react(options[i]);
									}
									const filter = (reaction, user) => {
										return options.includes(reaction.emoji.name)
										&& user.id === msg.author.id;
									}
									embedMessage.awaitReactions(filter,{max: 1, time:60000, errors:['time']})
										.then((collected) => {
											const reaction = collected.first();
											const idOption = options.indexOf(reaction.emoji.name);
											console.log(resulList[idOption].id);
											if (fila.fila.length > 0) {
												msg.channel.send(`Adicionado ${resulList[idOption].title} de ${resulList[idOption].channel} a playlist`);
											}
											else{
												msg.channel.send(`Tocando ${resulList[idOption].title} de ${resulList[idOption].channel}`);
											}
											if (resulList[idOption].id == "https://www.youtube.com/watch?v=undefined") {
												msg.reply('Video indisponivel');
												return;
											}
											fila.fila.push(resulList[idOption].id);
											play(connection, msg);
										}).catch((error) => {
											msg.reply('Opção Inválida');
											console.log(error);
										});
								});
							}
					});
				}
			});
		}
		function play (connection, msg) {
			if (stayPlaying.stayPlaying === false) {
				const nowPlay = fila.fila[0];
				stayPlaying.stayPlaying = true;
				servers.server.stream = ytdl(nowPlay, configs.ytdlFilter);
				servers.server.DJ = connection.play(servers.server.stream, configs.streamOP);
				console.log("Tocando "+nowPlay);
				servers.server.DJ.on('finish', () => {
					fila.fila.shift();
					console.log(fila.fila[0]);
					stayPlaying.stayPlaying = false;
					if (fila.fila[0] != undefined) {
						play(connection);
					}else if (fila.fila[0] == undefined){
						stopCmd.run(bot, msg, args);}
				});
			}
		}
}
module.exports.help = {
	name : "play"
}