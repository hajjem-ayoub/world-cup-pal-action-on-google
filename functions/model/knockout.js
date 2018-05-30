class KnockoutModel {

    constructor(id, name, matches) {
        this.id = id;
        this.name = name;
        this.matches = matches;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getMatches() {
        return this.matches;
    }
}

module.exports = KnockoutModel;
