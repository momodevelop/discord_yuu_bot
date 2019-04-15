import { ResponseBase } from 'libs/Responder/Responder';
import { CallbackParams } from '../callback-params';
import { hasWords } from 'common/common';

class cResponse implements ResponseBase<CallbackParams> {
 	public async exec(params: CallbackParams): Promise<boolean> {
		if (hasWords(params.msg.content, ["hi", "hello", "yo"] ) && 
			hasWords(params.msg.content, ["yuu"] )) {
			await params.msg.reply("Hi! Have you seen Ryoji? ^^");
			return true;
		}
		
		
		return false;
	}
}

export default function () {
	return new cResponse();
}