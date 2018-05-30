
class AppModel {
  constructor(groups, knockouts, stadiums){
    this.groups = groups;
    this.knockouts = knockouts;
    this.stadiums = stadiums;
  }
  
  groups(){
    return groups;
  }
  
  knockouts(){
    return knockouts;
  }
  
  stadiums(){
    return stadiums;
  }
}

module.exports = AppModel;