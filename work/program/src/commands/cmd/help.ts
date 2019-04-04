import { CommandBase } from 'libs/Commander/Commander';
import { CallbackParams } from 'commands/callback-params';
import { getAllMessages } from 'messages/msg-help';

class cCommand implements CommandBase<CallbackParams> {
	public readonly name: string = "help";

	public async exec(params: CallbackParams): Promise<void> {
		let res: string = "Hi! I'm **YuuBot**, a bot created by Momo 🍑!\nHere are my commands :confused: ```";

		for (let key in getAllMessages()) {
			res += getAllMessages()[key] + "\n";
		}
		res += "```";
		await params.msg.reply(res);
	}
}

export default function () {
	return new cCommand();
}