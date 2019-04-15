export function hasWords(str: string, words: string[], ignore_case: boolean = true) {
	let ignore_case_str: string = (ignore_case ? "i" : "");
	for (let i = 0; i < words.length; ++i) {
		if (str.match(new RegExp("\\b" + words[i] + "\\b", ignore_case_str)) !== null) {
			return true;
		}
	}
	return false;
}