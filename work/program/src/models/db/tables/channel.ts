import db from 'models/db/db';
import config from 'config.json';

export interface Channel {
    id: number;
    muteGetImage: boolean;
}


export function get(channelId: number) : Channel | null {
    let channelInfo: Collection<any> = db.addCollection(config.db.tables.channel);
    let channel: Channel | null = channelInfo.findOne({ id: channelId });
    return channel;

}

export function add(channelObj: Channel) {
    let channelInfo: Collection<any> = db.addCollection(config.db.tables.channel);
    channelInfo.insertOne(channelObj);
}

export function update(channelObj: Channel) {
    let channelInfo: Collection<any> = db.addCollection(config.db.tables.channel);
    channelInfo.update(channelObj);
}