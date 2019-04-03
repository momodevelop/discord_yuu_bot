interface MessageList {
	[name: string]: string;
}

const messages: MessageList = {
	"mute": "\
mute:\n\
	Disables spamming images \n\
	Usage: yuu mute\n",

	"unmute": "\
unmute:\n\
	Enables spamming images \n\
	Usage: yuu unmute\n",

}

export function msg(name: string): string {
	return messages[name];
}

export function getAllMessages(): MessageList {
	return messages;
}