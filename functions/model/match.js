const moment = require('moment');

class MatchModel {

    constructor(id, homeTeam, awayTeam, homeResult, awayResult, date, stadium, channels, type, rawHometeam, rawAwayteam, groupname) {
        this.id = id;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeResult = homeResult;
        this.awayResult = awayResult;
        this.date = date;
        this.stadium = stadium;
        this.channels = channels;
        this.type = type;
        this.groupname = groupname;
        this.rawHometeam = rawHometeam;
        this.rawAwayteam = rawAwayteam;
    }

    getId() {
        return this.id;
    }

    getHomeTeam() {
        return this.homeTeam;
    }

    getAwayTeam() {
        return this.awayTeam;
    }

    getHomeResult() {
        return this.homeResult;
    }

    setHomeResult(result) {
        this.homeResult = result;
    }

    getAwayResult() {
        return this.awayResult;
    }

    setAwayResult(result) {
        this.awayResult = result;
    }

    getDate() {
        return this.date;
    }

    getStadium() {
        return this.stadium;
    }

    getChannels() {
        return this.channels;
    }

    getType() {
        return this.type;
    }

    isFinish() {
        return this.getHomeResult() !== null && this.getAwayResult() !== null;
    }

    isStarted() {
        const now = moment();
        return now.isAfter(this.getDate());
    }

    getWinner() {
        if (this.getHomeResult() > this.getAwayResult()) {
            return this.getHomeTeam();
        }

        return this.getAwayTeam();
    }

    getLoser() {
        if (this.getHomeResult() < this.getAwayResult()) {
            return this.getHomeTeam();
        }

        return this.getAwayTeam();
    }

    setHomeTeam(team) {
        this.homeTeam = team;
    }

    setAwayTeam(team) {
        this.awayTeam = team;
    }

    getRawHometeam() {
        return this.rawHometeam;
    }

    getRawAwayteam() {
        return this.rawAwayteam;
    }

    getGroupname() {
        return this.groupname;
    }
}

module.exports = MatchModel;
