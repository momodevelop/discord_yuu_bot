import { promisify } from 'util';
import { writeFile, stat } from 'fs';

export const statFileAsync = promisify(stat);
export const writeFileAsync = promisify(writeFile);