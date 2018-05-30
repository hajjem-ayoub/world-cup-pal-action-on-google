class StandingModel {

    constructor(team, played, wins, draws, losts, goalsFor, goalsAgainst) {
        this.team = team;
        this.played = played || 0;
        this.wins = wins || 0;
        this.draws = draws || 0;
        this.losts = losts || 0;
        this.goalsFor = goalsFor || 0;
        this.goalsAgainst = goalsAgainst || 0;
    }

    getTeam() {
        return this.team;
    }

    getPlayed() {
        return this.played;
    }

    getWins() {
        return this.wins;
    }

    getDraws() {
        return this.draws;
    }

    getLosts() {
        return this.losts;
    }

    getGoalsFor() {
        return this.goalsFor;
    }

    getGoalsAgainst() {
        return this.goalsAgainst;
    }

    getGoalsDifference() {
        return this.getGoalsFor() - this.getGoalsAgainst();
    }

    getPoints() {
        return (this.getWins() * 3) + this.getDraws();
    }

    addPlayed() {
        this.played += 1;
    }

    addWin() {
        this.wins += 1;
    }

    addDraw() {
        this.draws += 1;
    }

    addLost() {
        this.losts += 1;
    }

    addGoalsFor(goals) {
        if (goals) {
            goals = +this.goalsFor + +goals;
            this.goalsFor = goals;
        }
    }

    addGoalsAgainst(goals) {
        if (goals) {
            goals = +this.goalsAgainst + +goals;
            this.goalsAgainst = goals;
        }
    }

}

module.exports = StandingModel;
