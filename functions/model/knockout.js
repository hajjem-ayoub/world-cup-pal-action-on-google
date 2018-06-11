class KnockoutModel {

    constructor(id, name, matches) {
        this._id = id;
        this._name = name;
        this._matches = matches;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getMatches() {
        return this._matches;
    }
}

module.exports = KnockoutModel;
