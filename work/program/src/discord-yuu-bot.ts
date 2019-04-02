// Globals ////////////////////////////////
require('app-module-path').addPath(__dirname);

// Load libs ////////////////////////////////
import { Client, Message } from 'discord.js';
import { Commander } from 'libs/commander/commander';
import { Responder } from 'libs/responder/responder';
import { CallbackParams as CommandCallbackParams } from 'commands/callback-params';
import { CallbackParams as ResponseCallbackParams } from 'responses/callback-params';
import config from 'config.json'

// Discord bot ////////////////////////////
const prefix: string = config.prefix || "";
if (prefix == "") {
	console.error("Prefix not defined!")
	process.exit(0);
}

console.log(config);

let responder: Responder<ResponseCallbackParams> = new Responder();
let commander: Commander<CommandCallbackParams> = new Commander();
const bot: Client = new Client();

async function onMessage(msg: Message): Promise<void> {
	try {
		// reject self
		if (msg.author.id === bot.user.id) {
			return;
		}

		//ignore case
		if (msg.content.toLowerCase().startsWith(prefix)) {
			console.info('I\'m called! -> ' + msg.content);

			let args: string[] = msg.content.substring(prefix.length).match(/(?:[^\s"]+\b|:|(")[^"]*("))+|[=!&|~]/g) || [];
			if (!args.length) {
				return;
			}

			let command: string = args[0];
			args.shift();

			if (! await commander.exec(command, {bot, msg, args})) {
				await responder.exec({bot, msg});
			}
		}

		else {
			// don't need to match anything
			await responder.exec({bot, msg});

			//if (msg.content.match(/\b(yuu)\b/ig)) {
			//	await responder.exec({bot, msg});
			//}
		}
	}
	catch (e) {
		console.error(e);
	}
}

async function onLoad(): Promise<void> {
	try {
		await commander.parseDir(__dirname + '/commands/cmd/');
		await responder.parseDir(__dirname + '/responses/res/');
		await bot.login(config.tokens.discord);
		console.info("YuuBot up and ready to work! ^^b");
		bot.user.setActivity("type '" + prefix + " help'");
		bot.on('message', onMessage);
	}
	catch (e) {
		console.info(e);
		process.exit(0);
	}
}

onLoad();

 

