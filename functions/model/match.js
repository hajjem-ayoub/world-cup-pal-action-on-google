const moment = require('moment');

class MatchModel {

    constructor(id, homeTeam, awayTeam, homeResult, awayResult, date, stadium, channels, type, rawHometeam, rawAwayteam, groupname) {
        this._id = id;
        this._homeTeam = homeTeam;
        this._awayTeam = awayTeam;
        this._homeResult = homeResult;
        this._awayResult = awayResult;
        this._date = date;
        this._stadium = stadium;
        this._channels = channels;
        this._type = type;
        this._groupname = groupname;
        this._rawHometeam = rawHometeam;
        this._rawAwayteam = rawAwayteam;
    }

    getId() {
        return this._id;
    }

    getHomeTeam() {
        return this._homeTeam;
    }

    getAwayTeam() {
        return this._awayTeam;
    }

    getHomeResult() {
        return this._homeResult;
    }

    setHomeResult(result) {
        this._homeResult = result;
    }

    getAwayResult() {
        return this._awayResult;
    }

    setAwayResult(result) {
        this._awayResult = result;
    }

    getDate() {
        return this._date;
    }

    getStadium() {
        return this._stadium;
    }

    getChannels() {
        return this._channels;
    }

    getType() {
        return this._type;
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
        this._homeTeam = team;
    }

    setAwayTeam(team) {
        this._awayTeam = team;
    }

    getRawHometeam() {
        return this._rawHometeam;
    }

    getRawAwayteam() {
        return this._rawAwayteam;
    }

    getGroupname() {
        return this._groupname;
    }
}

module.exports = MatchModel;
