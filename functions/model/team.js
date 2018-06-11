class TeamModel {
  constructor(id, name, fifaCode, iso2, flag, emoji, emojiString) {
    this._id = id;
    this._name = name;
    this._fifaCode = fifaCode;
    this._iso2 = iso2;
    this._flag = flag;
    this._emoji = emoji;
    this._emojiString = emojiString;
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  getIso2() {
    return this._icon;
  }

  getEmojiString() {
    return this._emojiString;
  }

  getFlag() {
    return this._flag;
  }

}

module.exports = TeamModel;
