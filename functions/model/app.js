
class AppModel {
  constructor(groups, stadiums){
    this._groups = groups;
    this._stadiums = stadiums;
  }
  
  getGroups(){
    return this._groups;
  }
  
  getStadiums(){
    return this._stadiums;
  }
}

module.exports = AppModel;