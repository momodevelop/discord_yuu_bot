import { CommandBase } from 'libs/commander/commander';
import { CallbackParams } from 'commands/callback-params';
import * as c from 'models/db/tables/channel';

class cCommand implements CommandBase<CallbackParams> {
	public readonly name: string = "unmute";

	private readonly res: string = "Okay, unmuting self! Remember that you can mute with: ```yuu mute```";
	private readonly res2: string = "I'm already unmuted ☹";

	public async exec(params: CallbackParams): Promise<void> {


		let channelId: number = parseInt(params.msg.channel.id);

		let channel: c.Channel | null = c.get(parseInt(params.msg.channel.id));
		if (!channel) {
			console.log("[unmute] Adding entry: " + channelId);
			c.add({ id: channelId, muteGetImage: false });
			await params.msg.reply(this.res2);
			return;
		}
		
		if (channel.muteGetImage == true) {
			channel.muteGetImage = false;
			c.update(channel);
			console.log("[unmute] Unmuting channel: " + channelId);
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