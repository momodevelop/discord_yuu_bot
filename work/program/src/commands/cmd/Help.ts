import { CommandBase } from 'libs/Commander/Commander';
import { CallbackParams } from 'commands/CallbackParams';
import { messages } from 'messages/MsgHelp'

class cCommand implements CommandBase<CallbackParams> {
	public readonly name: string = "help";

	public async exec(params: CallbackParams): Promise<void> {
		let res: string = "Hi! I'm **SuiBot**, a bot created by Momo 🍑!\nHere are my commands :confused: ```";

		for (let key in messages) {
			res += messages[key] + "\n";
		}
		res += "```";
		await params.msg.reply(res);
	}
}

export default function () {
	return new cCommand();
}