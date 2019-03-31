import { ResponseBase } from 'libs/Responder/Responder';
import { CallbackParams } from '../CallbackParams';

class cResponse implements ResponseBase<CallbackParams> {
 	public async exec(params: CallbackParams): Promise<boolean> {
		return false;
	}
}

export default function () {
	return new cResponse();
}