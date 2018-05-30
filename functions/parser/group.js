const GroupModel = require('../model/group');
const TeamParser = require('./team');
const MatchModel = require('../model/match');
const StandingModel = require('../model/standing');
const ResultParser = require('./result');
const DataParser = require('./data');
const StadiumParser = require('./stadium');
const ChannelParser = require('./channel');
const moment = require('moment');

class GroupParser {
    static parse(groupdata) {
        const models = [];
        Object.keys(groupdata).forEach((key) => {
            const matches = GroupParser.createMatches(groupdata[key].matches, key);
            models.push(new GroupModel(key, GroupParser.createStandings(matches), matches, GroupParser.finished));
        });
        return models;
    }

    static updateStandings(group) {
        group.setStandings(this.createStandings(group.getMatches()));
        let finish = true;
        group.getMatches().forEach((m) => {
            if (m.getHomeResult() === null || m.getAwayResult() === null) {
                finish = false;
            }
        });
        group.setFinish(finish);
    }

    static createMatches(data, key) {
        GroupParser.finished = false;
        const matches = [];
        data.forEach((match) => {
            const hometeam = TeamParser.getTeam(match.home_team);
            const awayteam = TeamParser.getTeam(match.away_team);
            const stadium = StadiumParser.getStadium(match.stadium);
            if (hometeam && awayteam && stadium) {
                const object = new MatchModel(
                    match.name,
                    hometeam,
                    awayteam,
                    ResultParser.getResult(match, 'home'),
                    ResultParser.getResult(match, 'away'),
                    moment(match.date),
                    stadium,
                    ChannelParser.getChannelsByIds(match.channels),
                    'groups',
                    null,
                    null,
                    key);

                if (object.getHomeResult() !== null || object.getAwayResult() !== null) {
                    GroupParser.finished = true;
                }

                matches.push(object);
                stadium.addMatch(object);
            }
        });

        return matches;
    }

    static sortStandings(matches, standings) {
        standings.sort((a, b) => {
            if (a.getPoints() !== b.getPoints()) {
                return a.getPoints() < b.getPoints() ? 1 : -1;
            }

            if (a.getGoalsDifference() !== b.getGoalsDifference()) {
                return a.getGoalsDifference() < b.getGoalsDifference() ? 1 : -1;
            }

            let match = matches.find((m) => {
                const ateam = a.getTeam();
                const bteam = b.getTeam();
                const hometeam = m.getHomeTeam();
                const awayteam = m.getAwayTeam();
                if (typeof hometeam !== 'string' && typeof awayteam !== 'string' && typeof ateam !== 'string' && typeof bteam !== 'string') {
                    return hometeam.getId() === ateam.getId() && awayteam.getId() === bteam.getId();
                }
            });
            if (match) {
                if (match.getHomeResult() > match.getAwayResult()) {
                    return -1;
                }

                if (match.getAwayResult() > match.getHomeResult()) {
                    return 1;
                }
            }
            match = matches.find((m) => {
                const ateam = a.getTeam();
                const bteam = b.getTeam();
                const hometeam = m.getHomeTeam();
                const awayteam = m.getAwayTeam();
                if (typeof hometeam !== 'string' && typeof awayteam !== 'string' && typeof ateam !== 'string' && typeof bteam !== 'string') {
                    return hometeam.getId() === bteam.getId() && awayteam.getId() === ateam.getId();
                }
            });
            if (match) {
                if (match.getHomeResult() > match.getAwayResult()) {
                    return 1;
                }

                if (match.getAwayResult() > match.getHomeResult()) {
                    return -1;
                }
            }
        });
        return standings;
    }

    static createStandings(matches) {
        let standings = [];
        matches.forEach((m) => {
            standings = GroupParser.parseStandingMatch(standings, m, true);
            standings = GroupParser.parseStandingMatch(standings, m, false);
        });
        return this.sortStandings(matches, standings);
    }

    static parseStandingMatch(standings, match, isHometeam) {
        const team = isHometeam ? match.getHomeTeam() : match.getAwayTeam();
        let index = standings.findIndex((value) => value.getTeam() === team);
        if (index === -1) {
            standings.push(new StandingModel(team));
            index = standings.findIndex((value) => value.getTeam() === team);
        }
        const standing = standings[index];

        if (match.getHomeResult() !== null && match.getAwayResult() !== null) {
            standing.addPlayed();
            if (isHometeam) {
                standing.addGoalsFor(match.getHomeResult());
                standing.addGoalsAgainst(match.getAwayResult());
                if (match.getHomeResult() === match.getAwayResult()) {
                    standing.addDraw();
                } else if (match.getHomeResult() > match.getAwayResult()) {
                    standing.addWin();
                } else {
                    standing.addLost();
                }
            } else {
                standing.addGoalsFor(match.getAwayResult());
                standing.addGoalsAgainst(match.getHomeResult());
                if (match.getHomeResult() === match.getAwayResult()) {
                    standing.addDraw();
                } else if (match.getHomeResult() < match.getAwayResult()) {
                    standing.addWin();
                } else {
                    standing.addLost();
                }
            }
            standings[index] = standing;
        }

        return standings;
    }
}

if(!GroupParser.finished){
    GroupParser.finished = false;
}

module.exports = GroupParser;
