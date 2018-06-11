class GroupModel {
    constructor(name, standings, matches, finished) {
        this._name = name;
        this._standings = standings;
        this._matches = matches;
        this._finished = finished;
    }

    getName() {
        return this._name;
    }

    getDisplayName() {
        return this.getName().toUpperCase();
    }

    getStandings() {
        return this._standings;
    }

    setStandings(standings) {
        this._standings = standings;
    }

    getMatches() {
        return this._matches;
    }

    getFinished() {
        return this._finished;
    }

    setFinish(finish) {
        this._finished = finish;
    }
}

module.exports = GroupModel;
