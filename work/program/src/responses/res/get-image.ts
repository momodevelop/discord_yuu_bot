import { ResponseBase } from 'libs/Responder/Responder';
import { CallbackParams } from '../callback-params';
import config from 'config.json'
import { getImages, SearchParams, OptionalSearchParams } from 'api/google-custom-search'
import { get as getChannel } from 'models/db/tables/channel'

const kSearchCount = 10;

// Based on a bunch of allowed keywords, find a cute image and respond 
// Allowed 'manual' keywords: otters, river otters, dogs, pomerinian, etc..
// Then append with 'auto' keywords: cute, large, etc..
class cResponse implements ResponseBase<CallbackParams> {
 	public async exec(params: CallbackParams): Promise<boolean> {
		// Go through the words for keywords. 
		// Get the first one that it encounters
		let channel = getChannel(parseInt(params.msg.channel.id));
		if (channel) {
			if (channel.muteGetImage == true) {
				return false;
			} 
		}


		let searchStr: string = "";
		for(let i = 0; i < config.subjectKeywords.length; ++i) {
			let regexStr: string = "\\b" + config.subjectKeywords[i] + "[s]*?\\b";
			let wordsFound: string[] | null = params.msg.content.match(new RegExp(regexStr, "gi"));
			if(wordsFound == null)
				continue;
			else {
				searchStr = wordsFound[0];
				break;
			}
			
		}

		if (searchStr.length == 0) {
			return false;
		}

		// Words that must make it in
		for( let word of config.additionalKeywords) {
			searchStr += " " + word;
		}

		// Randomly add additional words to the search
		// At least around half the additional keywords will go in.
		if (config.randomAdditionalKeywords.length)
			searchStr += " " + config.randomAdditionalKeywords[Math.floor(Math.random() * config.randomAdditionalKeywords.length)];
	

		console.log("Searching: " + searchStr);

		
		// Pacakage everything nicely for the API
		// hard coded image sizes...?
		let imageSizes = ["huge", "large", "xlarge", "xxlarge"];
		let searchParams: SearchParams = {
			key: config.keys.googleCustomSearchKey,
			cx: config.keys.googleCustomSearchCx,
			q: searchStr
		}

		let optionalSearchParams: OptionalSearchParams  = {
			safe: "high",
			num: kSearchCount,
			imgSize: imageSizes[Math.floor(Math.random() * imageSizes.length)]
		}

		let result: string[] = await getImages(searchParams, optionalSearchParams);

		let selectedLink: string = result[Math.floor(Math.random() * kSearchCount)];
		let message: string = "Here you go! Cute right? \^\/\/\^\n" + selectedLink; 



		await params.msg.reply(message);
		
		return true;
	}
}

export default function () {
	return new cResponse();
}