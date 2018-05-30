const TeamModel = require('../model/team');

class TeamParser {
    static parse(teams) {
        teams.forEach((team) => {
            TeamParser.teams.push(new TeamModel(team.id, team.name, team.iso2));
        });
    }

    static getTeam(teamId) {
        return TeamParser.teams.find( (team) => team.getId() === teamId);
    }
}

if (!TeamParser.teams) {
    TeamParser.teams = []
}

module.exports = TeamParser
