interface MessageList {
	[name: string]: string;
}

const messages: MessageList = {
	"resist": "\
resist:\n\
	Check CoC resistance\n\
	Usage: !coc resist <active> vs <passive>\n",

}

export function msg(name: string): string {
	return messages[name];
}

export function getAllMessages(): MessageList {
	return messages;
}