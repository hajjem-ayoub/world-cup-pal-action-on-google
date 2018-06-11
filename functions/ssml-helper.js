// Copyright 2017, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Utility class to create SSML responses
 */

// Logging dependencies
const logger = require('winston').loggers.get('DEFAULT_LOGGER');
const { logObject } = require('./utils');

const SSML = class {
  constructor () {
    logger.debug(logObject('ssml', 'constructor', {
      info: 'SSML instance created'
    }));
  }

  // Say prompt
  /*
    About speechOptions
    Relative: Specify a relative value (e.g. "low", "medium", "high", etc) where "medium" is the default pitch.
    Semitones: Increase or decrease pitch by "N" semitones using "+Nst" or "-Nst" respectively. Note that "+/-" and "st" are required.
    Percentage: Increase or decrease pitch by "N" percent by using "+N%" or "-N%" respectively. Note that "%" is required but "+/-" is optional.
  */
  say (value, speechOptions) {
    logger.debug(logObject('ssml', 'say', {
      info: 'Say tag',
      value: value
    }));
    if(!value) {
      throw Error("you need to add a value to say function");
    }

    let optionsString = '';

    if (speechOptions && speechOptions.volume) {
      optionsString += `volume="${speechOptions.volume}" `
    }

    if (speechOptions && speechOptions.rate) {
      optionsString += `rate="${speechOptions.rate}" `
    }

    if (speechOptions && speechOptions.pitch) {
      optionsString += `pitch="${speechOptions.pitch}" `
    }

    return `<prosody ${optionsString}>${this.escape(value)}</prosody>`;
  }

  // Audio tag
  audio (url) {
    logger.debug(logObject('ssml', 'audio', {
      info: 'Audio tag',
      url: url
    }));
    
    if(!url) {
      throw Error("you need to add a url to audio function");
    }
    return `<audio src='${url}'></audio>`;
  }

  // Audio tag
  voice (voiceObjects, voiceOptions) {
    logger.debug(logObject('ssml', 'voice', {
      info: 'Voice tag',
      voiceOptions: voiceOptions
    }));
    
    if(!voiceObjects) {
      throw Error("you need to add a voiceObjects to voice function");
    }
    if(!voiceOptions || !voiceOptions.gender) {
      throw Error("you need to add a voiceOptions with a gender to voice function");
    }

    let optionsString = '';

    if (voiceOptions && voiceOptions.gender) {
      optionsString += `gender="${voiceOptions.gender}" `
    }

    if (voiceOptions && voiceOptions.variant) {
      optionsString += `variant="${voiceOptions.variant}" `
    }
    
    return `<voice ${optionsString}>${voiceObjects.join(' ')}</voice>`;
  }

  // Audio tag
  media (mediaObjects, mediaOptions) {
    logger.debug(logObject('ssml', 'media', {
      info: 'Media tag',
      mediaOptions: mediaOptions
    }));
    if(!mediaObjects) {
      throw Error("you need to mediaObjects a value to media function");
    }

    let optionsString = '';

    if (mediaOptions && mediaOptions.id) {
      optionsString += `xml:id="${mediaOptions.id}" `
    }

    if (mediaOptions && mediaOptions.begin) {
      optionsString += `begin="${mediaOptions.begin}" `
    }

    if (mediaOptions && mediaOptions.end) {
      optionsString += `end="${mediaOptions.end}" `
    }

    if (mediaOptions && mediaOptions.repeatCount) {
      optionsString += `repeatCount="${mediaOptions.repeatCount}" `
    }

    if (mediaOptions && mediaOptions.repeatDur) {
      optionsString += `repeatDur="${mediaOptions.repeatDur}" `
    }

    if (mediaOptions && mediaOptions.soundLevel) {
      optionsString += `soundLevel="${mediaOptions.soundLevel}" `
    }

    if (mediaOptions && mediaOptions.fadeInDur) {
      optionsString += `fadeInDur="${mediaOptions.fadeInDur}" `
    }

    if (mediaOptions && mediaOptions.fadeOutDur) {
      optionsString += `fadeOutDur="${mediaOptions.fadeOutDur}" `
    }

    return `<media ${optionsString}>${mediaObjects.join(' ')}</media>`;
  }

  parallel (mediaObjects) {
    logger.debug(logObject('ssml', 'parallel', {
      info: 'Parallel tag'
    }));
    if(!mediaObjects || mediaObjects.length === 0) {
      throw Error("you need to add at least a media object to parallel function");
    }
    return `<par>${mediaObjects.join(' ')}</par>`;
  }

  sequence (mediaObjects) {
    logger.debug(logObject('ssml', 'sequence', {
      info: 'Sequence tag'
    }));
    if(!mediaObjects || mediaObjects.length === 0) {
      throw Error("you need to add at least a media object to sequence function");
    }
    return `<seq>${mediaObjects.join(' ')}</seq>`;
  }

  // Break tag
  pause (duration) {
    logger.debug(logObject('ssml', 'pause', {
      info: 'Pause tag',
      duration: duration
    }));
    if (!duration) {
      throw Error("you need to add a duration to pause function");
    }
    return `<break time='${duration}'/>`;
  }

  // Convert to string
  speak (elements) {
    logger.debug(logObject('ssml', 'speak', {
      info: 'Speak tag'
    }));
    if(!elements || elements.length === 0) {
      throw Error("you need to add at least one element speak function");
    }
    return `<speak>${elements.join(' ')}</speak>`;
  }

  escape (value) {
    if (value && typeof (value) === 'string') {
      return value.replace(/&/g, '&amp;');
    }
    return value;
  }
};

module.exports = {
  SSML: SSML
};