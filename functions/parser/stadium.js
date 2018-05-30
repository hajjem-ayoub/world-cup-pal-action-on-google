const StadiumModel = require('../model/stadium');

class StadiumParser {
    static parse(stadiums) {
        stadiums.forEach((stadium) => {
            StadiumParser.stadiums.push(new StadiumModel(stadium.id, stadium.name, stadium.lat, stadium.lng));
        });
        return this.stadiums;
    }

    static getStadium(stadiumId) {
        return StadiumParser.stadiums.find( (stadium) => stadium.getId() === stadiumId);
    }
}

if(!StadiumParser.stadiums){
    StadiumParser.stadiums = [];
}

module.exports = StadiumParser;
