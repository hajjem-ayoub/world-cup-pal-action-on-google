class StandingModel {

    constructor(team, played, wins, draws, losses, goalsFor, goalsAgainst) {
        this._team = team;
        this._played = played || 0;
        this._wins = wins || 0;
        this._draws = draws || 0;
        this._losses = losses || 0;
        this._goalsFor = goalsFor || 0;
        this._goalsAgainst = goalsAgainst || 0;
    }

    getTeam() {
        return this._team;
    }

    getPlayed() {
        return this._played;
    }

    getWins() {
        return this._wins;
    }

    getDraws() {
        return this._draws;
    }

    getLosses() {
        return this._losses;
    }

    getGoalsFor() {
        return this._goalsFor;
    }

    getGoalsAgainst() {
        return this._goalsAgainst;
    }

    getGoalsDifference() {
        return this.getGoalsFor() - this.getGoalsAgainst();
    }

    getPoints() {
        return (this.getWins() * 3) + this.getDraws();
    }

    addPlayed() {
        this._played += 1;
    }

    addWin() {
        this._wins += 1;
    }

    addDraw() {
        this._draws += 1;
    }

    addLoss() {
        this._losses += 1;
    }

    addGoalsFor(goals) {
        if (goals) {
            goals = +this._goalsFor + +goals;
            this._goalsFor = goals;
        }
    }

    addGoalsAgainst(goals) {
        if (goals) {
            goals = +this._goalsAgainst + +goals;
            this._goalsAgainst = goals;
        }
    }

}

module.exports = StandingModel;
