interface MessageList {
	[name: string]: string;
}

const messages: MessageList = {
	"resist": "\
resist:\n\
	Check CoC resistance\n\
	Usage: !coc resist <active> vs <passive>\n",

	"add alias": "\
add alias:\n\
    Adds an alias to a 'find' query\n\
    Usage: !coc addalias <alias_name> for <target_name>\n\
		(if success, you can then do '!coc, find <alias_name>')\n",

	"remove alias": "\
remove alias:\n\
    Removes an alias\n\
    Usage: !coc removealias <alias_name>\n",

	"get alias": "\
get alias:\n\
    Displays an alias\n\
    Usage: !coc getalias <alias_name>\n",

	"find": "\
find:\n\
	Use this command to find something!\n\
	Usage: !coc, find <something>\n",

}

export function msg(name: string): string {
	return messages[name];
}

export function getAllMessages(): MessageList {
	return messages;
}