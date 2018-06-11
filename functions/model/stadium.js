class StadiumModel {

    constructor(id, name, lat, lng) {
        this._id = id;
        this._name = name;
        this._lat = lat;
        this._lng = lng;
        this._matches = [];
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getLat() {
        return this._lat;
    }

    getLng() {
        return this._lng;
    }

    addMatch(match) {
        this._matches.push(match);
    }

    getMatches() {
        return this._matches;
    }
}

module.exports = StadiumModel;