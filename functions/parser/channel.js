const ChannelModel = require('../model/channel');

class ChannelParser {
    static parse(channels) {
        if (channels) {
            channels.forEach((channel) => {
                ChannelParser.channels.push(new ChannelModel(channel.id, channel.name, channel.icon));
            });
        }
    }

    static getChannelsByIds(channelIds){
        return ChannelParser.channels.filter((channel) => {
            channelIds.forEach((channelId) => {
                return channel.getId() === channelId;
            });
        });
    }
}

if (!ChannelParser.channels) {
    ChannelParser.channels = []
}

module.exports = ChannelParser
