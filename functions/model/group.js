class GroupModel {
    constructor(name, standings, matches, finished) {
        this.name = name;
        this.standings = standings;
        this.matches = matches;
        this.finished = finished;
    }

    getName() {
        return this.name;
    }

    getDisplayName() {
        return this.getName().toUpperCase();
    }

    getStandings() {
        return this.standings;
    }

    setStandings(standings) {
        this.standings = standings;
    }

    getMatches() {
        return this.matches;
    }

    getFinished() {
        return this.finished;
    }

    setFinish(finish) {
        this.finished = finish;
    }
}

module.exports = GroupModel;
