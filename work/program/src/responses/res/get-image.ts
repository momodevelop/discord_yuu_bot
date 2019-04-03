import { ResponseBase } from 'libs/Responder/Responder';
import { CallbackParams } from '../callback-params';
import allowedAnimals from 'data/allowed-animals.json'
import config from 'config.json'
import { getImages } from 'api/google-custom-search'
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


		let animalToSearch: string = "";
		for(let i = 0; i < allowedAnimals.animals.length; ++i) {
			let regexStr: string = "\\b" + allowedAnimals.animals[i] + "[s]*?\\b";
			let wordsFound: string[] | null = params.msg.content.match(new RegExp(regexStr, "gi"));
			if(wordsFound == null)
				continue;
			else {
				animalToSearch = wordsFound[0];
				break;
			}
			
		}

		if (animalToSearch.length == 0) {
			return false;
		}

		// Animal to search is found. 
		// Now let's just add auto words that will be added to the search
		for( let word in config.autoSearchWords) {
			animalToSearch += " " + word;
		}
		
		let imageSizes = ["huge", "large", "xlarge", "xxlarge"];

		let result: string[] = await getImages(animalToSearch, config.tokens.googleCustomSearch, {
			safe: "high",
			num: kSearchCount,
			imgSize: imageSizes[Math.floor(Math.random() * imageSizes.length)]
		});

		let selectedLink: string = result[Math.floor(Math.random() * kSearchCount)];
		let message: string = "Here you go! Cute right? \^\/\/\^\n" + selectedLink; 

		

		await params.msg.reply(message);
		
		return true;
	}
}

export default function () {
	return new cResponse();
}