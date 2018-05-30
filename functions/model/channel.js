class ChannelModel {
  constructor(id, name, icon) {
      this.id = id;
      this.name = name;
      this.icon = icon;
  }

  getId() {
      return this.id;
  }

  getName() {
      return this.name;
  }

  getIcon() {
      return this.icon;
  }

}

module.exports = ChannelModel;
