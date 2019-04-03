import { CommandBase } from 'libs/commander/commander';
import { CallbackParams } from 'commands/callback-params';
import * as c from 'models/db/tables/channel'

class cCommand implements CommandBase<CallbackParams> {
	public readonly name: string = "mute";

	private readonly res: string = "Okay, muting self! Remember that you can unmute with: ```yuu unmute```";
	private readonly res2: string = "I'm already muted ☹";


	public async exec(params: CallbackParams): Promise<void> {

		let channelId: number = parseInt(params.msg.channel.id);

		let channel: c.Channel | null = c.get(parseInt(params.msg.channel.id));
		if (!channel) {
			console.log("[mute] Muting channel and adding entry: " + channelId);
			c.add({ id: channelId, muteGetImage: true });
			await params.msg.reply(this.res);
			return;
		}
		
		if (channel.muteGetImage == false) {
			channel.muteGetImage = true;
			c.update(channel);
			console.log("[mute] Muting channel: " + channelId);
			await params.msg.reply(this.res);
		}
		else {
			await params.msg.reply(this.res2);
		}
		
	}
}

export default function () {
	return new cCommand();
}