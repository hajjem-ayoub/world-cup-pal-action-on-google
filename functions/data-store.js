const winston = require('winston');
const logger = winston.loggers.get('DEFAULT_LOGGER');
const { logObject } = require('./utils');
const DataParser = require('./parser/data');
const fetch = require('isomorphic-fetch');

class DataStore {
  constructor() {
    logger.debug(logObject('DataStore', 'constructor', {
      info: 'DataStore instance created'
    }));

    this.DATA_URL = 'https://cdn.rawgit.com/lsv/fifa-worldcup-2018/master/data.json';
  }

  getData() {
    fetch(this.DATA_URL)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return DataParser.parse(json);
      })
      .catch((error) => console.log(error));
  }

}

(new DataStore()).getData()