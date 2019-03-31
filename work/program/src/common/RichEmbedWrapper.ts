import { RichEmbed } from 'discord.js';
import { fileExists } from 'common/common'

interface File {
	attachment: string;
	name: string;
}

export class RichEmbedWrapper {
	private _richEmbedObj: RichEmbed;
	private _files: File[];

	constructor() {
		this._richEmbedObj = new RichEmbed();
		this._files = [];
	}

	public get RichEmbed() {
		return this._richEmbedObj;
	}

	public async setAuthorWithImg(path: string, name: string, authorName: string): Promise<boolean> {
		if (await this.addAttachment(path, name)) {
			this.RichEmbed.setAuthor(authorName, RichEmbedWrapper.getAttachmentStr(name));
			return true;
		}
		return false;

	}

	// TODO: reject multiple names when adding files
	public async addAttachment(path: string, name: string): Promise<boolean> {
		if (await fileExists(path)) {
			this._files.push({
				attachment: path,
				name: name
			});
			return true;
		}
		return false;
	}

	public async setThumbnailImg(path: string, name: string): Promise<boolean> {
		if (await this.addAttachment(path, name)) {
			this.RichEmbed.setThumbnail(RichEmbedWrapper.getAttachmentStr(name));
			return true;
		}
		return false;
	}

	public static getAttachmentStr(name: string): string {
		return "attachment://" + name;
	}

	public async setImg(path: string, name: string): Promise<boolean> {
		if (await this.addAttachment(path, name)) {
			this.RichEmbed.setImage(RichEmbedWrapper.getAttachmentStr(name));
			return true;
		}
		return false;
	}

}

