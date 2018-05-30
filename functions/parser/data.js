const AppModel = require('../model/app');
const StadiumParser = require('./stadium');
const ChannelParser = require('./channel');
const TeamParser = require('./team');
const GroupParser = require('./group');
const KnockoutParser = require('./knockout');
const moment = require('moment');

class DataParser {

    static parse(data) {
        const stadiums = StadiumParser.parse(data.stadiums);
        ChannelParser.parse(data.tvchannels);
        TeamParser.parse(data.teams);
        const groups = GroupParser.parse(data.groups);
        const knockouts = KnockoutParser.parse(data.knockout, groups);
        return new AppModel(groups, knockouts, stadiums);
    }

    static getDate(date) {
        return moment(date);
    }
}

module.exports = DataParser;
