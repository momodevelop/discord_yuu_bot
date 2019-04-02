import { Client, Message } from 'discord.js';

export interface CallbackParams {
	bot: Client;
	msg: Message;
}