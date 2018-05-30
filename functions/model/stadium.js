class StadiumModel {

    constructor(id, name, lat, lng) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.matches = [];
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getLat() {
        return this.lat;
    }

    getLng() {
        return this.lng;
    }

    addMatch(match) {
        this.matches.push(match);
    }

    getMatches() {
        return this.matches;
    }
}

module.exports = StadiumModel;