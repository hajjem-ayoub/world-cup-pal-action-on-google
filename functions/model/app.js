
class AppModel {
  constructor(groups, knockouts, stadiums){
    this._groups = groups;
    this._knockouts = knockouts;
    this._stadiums = stadiums;
  }
  
  getGroups(){
    return this._groups;
  }
  
  getKnockouts(){
    return this._knockouts;
  }
  
  getStadiums(){
    return this._stadiums;
  }
}

module.exports = AppModel;