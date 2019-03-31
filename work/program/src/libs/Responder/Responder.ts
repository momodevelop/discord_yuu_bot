import { readdir } from 'fs';
import { promisify } from 'util';

const readdirAsync = promisify(readdir);

export interface ResponseBase<T> {
	exec(params: T): Promise<boolean>;
}

// Invoker class
export class Responder<T> {
	private responseList: ResponseBase<T>[] = [];

	public addResponse(response_to_add: ResponseBase<T>, name: string): void {
		this.responseList.push(response_to_add);
		console.info("[Responder] Added Response: " + name);
	}

	public async exec(params: T): Promise<boolean> {
		for (let i = 0; i < this.responseList.length; ++i) {
			if (await this.responseList[i].exec(params)) {
				return true;
			}
		}
		return false;
	}


	public async parseDir(path: string): Promise<void> {
		let files: string[] = await readdirAsync(path);
		for (let i: number = 0; i < files.length; ++i) {
			let filename_split = files[i].split(/\.(.+)/);
			if (filename_split != null) {
				// only accept js files
				if (filename_split[1] == "js") {
					let filename: string = filename_split[0];
					let module: any = await import(`${path}${filename}`);
					this.addResponse(module.default(), filename);
				}
			}
		}
	}

}