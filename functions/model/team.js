class TeamModel {
  constructor(id, name, iso2) {
    this.id = id;
    this.name = name;
    this.iso2 = iso2;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getIso2() {
    return this.icon;
  }

}

module.exports = TeamModel;
