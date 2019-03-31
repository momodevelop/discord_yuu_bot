import { readdir } from 'fs';
import { promisify } from 'util';

const readdirAsync = promisify(readdir);

export interface CommandBase<T> {
	readonly name: string;
	exec(params: T): Promise<void>;
}

// Invoker class
export class Commander<T> {
	private commandList: Map<string, CommandBase<T>> = new Map<string, CommandBase<T>>();

	public addCommand(commandToAdd: CommandBase<T>): void {
		let command: CommandBase<T> | undefined = this.commandList.get(commandToAdd.name);
		if (!command) {
			this.commandList.set(commandToAdd.name, commandToAdd);
			console.info("[Commander] Added Command: " + commandToAdd.name);
		}
		else {
			throw new Error("Command already exists: " + commandToAdd.name);
		}
	}

	public async exec(name: string, params: T): Promise<boolean> {
		let command: CommandBase<T> | undefined = this.commandList.get(name);
		if (command) {
			try {
				await command.exec(params);
			} catch {
				console.error("[Commander] Something went wrong with the command: " + name);
			}

			return true;
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
					this.addCommand(module.default());
				}
			}
		}		
	}

}