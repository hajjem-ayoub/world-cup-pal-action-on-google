const MatchModel = require('../model/match');
const KnockoutModel = require('../model/knockout');
const GroupModel = require('../model/group');
const TeamModel = require('../model/team');
const AppModel = require('../model/app');

const ResultParser = require('./result');
const DataParser = require('./data');
const StadiumParser = require('./stadium');
const ChannelParser = require('./channel');
const moment = require('moment');

class KnockoutParser {

    static parse(phases, groups) {
        const output = [];
        Object.keys(phases).forEach((key) => {
            output.push(new KnockoutModel(
                key,
                phases[key].name,
                KnockoutParser.createKnockoutMatches(phases[key].matches, groups, phases[key].name)))
            ;
        });
        return output;
    }

    static updateKnockouts(data) {
        data.getKnockouts().forEach((k) => {
            k.getMatches().forEach((m) => {
                m.setHomeTeam(this.getKnockoutTeam(m.getType(), m.getRawHometeam(), data.getGroups()));
                m.setAwayTeam(this.getKnockoutTeam(m.getType(), m.getRawAwayteam(), data.getGroups()));
            });
        });

        return data;
    }

    static createKnockoutMatches(matches, groups, key) {
        const output = [];
        matches.forEach((match) => {
            const stadium = StadiumParser.getStadium(match.stadium);
            if (stadium) {
                const obj = new MatchModel(
                    match.name,
                    KnockoutParser.getKnockoutTeam(match.type, match.home_team, groups),
                    KnockoutParser.getKnockoutTeam(match.type, match.away_team, groups),
                    ResultParser.getResult(match, 'home'),
                    ResultParser.getResult(match, 'away'),
                    moment(match.date),
                    stadium,
                    ChannelParser.getChannelsByIds(match.channels),
                    match.type,
                    match.home_team,
                    match.away_team,
                    key)
                ;
                KnockoutParser.knockoutmatches.push({ name: match.name, obj });
                output.push(obj);
                stadium.addMatch(obj);
            }
        });
        return output;
    }

    static getKnockoutTeam(type, matchteam, groups) {
        let foundmatch;
        switch (type) {
            default:
                return matchteam;
            case 'qualified':
                if (typeof matchteam === 'string') {
                    const splitted = matchteam.split('_');
                    const foundGroup = groups.find((group) => {
                        return group.getName() === splitted[1];
                    });
                    if (!foundGroup) {
                        throw new Error('Group not found in ' + matchteam);
                    }

                    if (splitted[0] === 'winner') {
                        return foundGroup.getFinished()
                            ? foundGroup.getStandings()[0].getTeam()
                            : 'Winner of group ' + foundGroup.getName().toUpperCase()
                            ;
                    }

                    return foundGroup.getFinished()
                        ? foundGroup.getStandings()[1].getTeam()
                        : 'Runner up group ' + foundGroup.getName().toUpperCase()
                    ;
                }

                throw new Error('matchteam variable should be a string ' + matchteam + ' given');
            case 'winner':
                foundmatch = KnockoutParser.findKnockoutMatch(matchteam);
                if (foundmatch && foundmatch.isFinish()) {
                    return foundmatch.getWinner();
                }
                return 'Winner of match ' + matchteam;
            case 'loser':
                foundmatch = KnockoutParser.findKnockoutMatch(matchteam);
                if (foundmatch && foundmatch.isFinish()) {
                    return foundmatch.getLoser();
                }
                return 'Loser of match ' + matchteam;
        }
    }

    static findKnockoutMatch(matchteam) {
        const found = KnockoutParser.knockoutmatches.find((match) => {
            return match.name === matchteam;
        });
        if (found) {
            return found.obj;
        }
        return undefined;
    }

}

if(!KnockoutParser.knockoutmatches){
    KnockoutParser.knockoutmatches = [];
}

module.exports = KnockoutParser;
