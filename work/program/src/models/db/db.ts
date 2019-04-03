import config from 'config.json';
import loki from 'lokijs';

const Root: string = require('app-root-path');
export default new loki(Root + "/" + config.db.path, {autosave: true, autoload: true});