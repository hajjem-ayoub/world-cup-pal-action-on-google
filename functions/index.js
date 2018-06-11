'use strict';
const functions = require('firebase-functions');
const {
  dialogflow,
  BasicCard,
  Button,
  Image,
  List,
  SimpleResponse,
  Table,
  NewSurface
} = require('actions-on-google');
const moment = require('moment');
const DataStore = require('./store');
const app = dialogflow({ debug: true });
const Ssml = require('./ssml-helper').SSML;

// fetch data
const dataStore = new DataStore();
dataStore.getData();

// intents
const DEFAULT_WELCOME_INTENT = 'Default Welcome Intent';
const DEFAULT_NO_INPUT = 'Default no input intent';
const NEED_HELP_INTENT = 'Need help';
const DEFAULT_NO_INPUT_YES = 'Default no input intent - yes';
const RESET_USER_STORAGE = 'Reset user storage';

const ASK_ABOUT_ALL_GROUPS_INTENT = 'Ask about all groups';
const ASK_ABOUT_A_GROUP_INTENT = 'Ask about a group';
const GROUP_ITEM_SELECTED_INTENT = 'Group item selected';
const FIND_GROUP_BY_TEAM_INTENT = 'Ask about a group by team name';
const ASK_ABOUT_GAMES_BY_TEAM_INTENT = 'Ask about games by team name';
const ASK_ABOUT_GAMES_BY_TEAM_FOLLOWUP_YES_INTENT = 'Ask about games by team name - yes'

const SHOW_STADIUM_INTENT = 'Show Stadium intent'

const FIND_GAME_BY_DATE = 'Find a game by date';

const ASSETS_DOMAIN_NAME = 'staging.worldcuppal.appspot.com';

const getImage = (imageName) => {
  return `https://storage.googleapis.com/${ASSETS_DOMAIN_NAME}/${imageName}.jpg`;
}

const getSong = (songName) => {
  return `https://storage.googleapis.com/${ASSETS_DOMAIN_NAME}/${songName}.mp3`;
}

//const intentSuggestions = [];
app.middleware((conv) => {
  conv.hasScreen =
    conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
  conv.hasAudioPlayback =
    conv.surface.capabilities.has('actions.capability.AUDIO_OUTPUT');
  conv.hasScreenPossibility =
    conv.available.surfaces.capabilities.has('actions.capability.SCREEN_OUTPUT');
});

app.intent(DEFAULT_NO_INPUT, (conv) => {
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  if (repromptCount === 0) {
    conv.ask(`Come on, ask something!!`);
  } else if (repromptCount === 1) {
    conv.ask(`Do you want me to tell you what I can do?`);
  } else if (conv.arguments.get('IS_FINAL_REPROMPT')) {
    const ssmlResponse = new Ssml();
    conv.ask(new SimpleResponse({
      text: `Okay, I don't like being ignored,
      am leaving, let's talk when you learn how to do it.`,
      speech: ssmlResponse.speak(
        [
          ssmlResponse.say(`Okay`, { volume: "+6dB" }),
          ssmlResponse.pause("0.2s"),
          ssmlResponse.say(`I don't like being ignored`, { volume: "+6dB" }),
          ssmlResponse.pause("0.2s"),
          ssmlResponse.say(`let's talk when you learn how to do it.`, { volume: "+6dB" })
        ])
    }));
    conv.close();
  }
});

app.intent(DEFAULT_NO_INPUT_YES, (conv) => {
  return conv.followup('actions_intent_NEED_HELP');
});

app.intent(RESET_USER_STORAGE, (conv) => {
  conv.user.storage = {};
  return conv.ask('Done, user storage deleted');
});

app.intent(NEED_HELP_INTENT, (conv) => {
  const ssmlResponse = new Ssml();
  conv.ask(new SimpleResponse({
    text: `I am your world cup buddy
    You can ask me about the different groups in the world cup, by just saying 
    - Tell me about the different groups 
    You can also ask about a particular group, to know the different teams inside and their standings
    to do that you should say for example
    - tell me about group A
    or even better
    - Which group is Denmark.
    That was about groups, but if you are interested in a specific team, you can say
    - when is denmark playing
    or more specifically
    - when is denmark playing against Australia
    If you just want all games in a specific date, you can say
    - Who is playing the 15th of June 2018
    Am sure am forgetting something
    But i can't remember it, so you gotta find out by yourself.`,
    speech: ssmlResponse.speak(
      [
        ssmlResponse.say(`I am your world cup buddy`, { volume: "+6dB" }),
        ssmlResponse.pause("0.2s"),
        ssmlResponse.say(`You can ask me about the different groups in the world cup, by just saying `, { volume: "+6dB" }),
        ssmlResponse.voice([

        ], {
          gender: 'male',
          variant: '4'
        }),
        ssmlResponse.voice([
          ssmlResponse.say(`Tell me about the different groups `, { volume: "+6dB" })
        ], {
          gender: 'male',
          variant: '4'
        }),
        ssmlResponse.pause("1s"),
        ssmlResponse.say(`You can also ask about a particular group, to know the different teams inside and their standings`, { volume: "+6dB" }),
        ssmlResponse.pause("0.2s"),
        ssmlResponse.say(`to do that you should say for example`, { volume: "+6dB" }),
        ssmlResponse.voice([
          ssmlResponse.say(`tell me about group A`, { volume: "+6dB" })
        ], {
          gender: 'male',
          variant: '4'
        }),
        ssmlResponse.pause("0.2s"),
        ssmlResponse.say(`or even better`, { volume: "+6dB" }),
        ssmlResponse.voice([
          ssmlResponse.say(`Which group is Denmark`, { volume: "+6dB" }),
        ], {
          gender: 'male',
          variant: '4'
        }),
        
        ssmlResponse.pause("1s"),
        ssmlResponse.say(`That was about groups,`, { volume: "+6dB" }),
        ssmlResponse.pause("0.5s"),
        ssmlResponse.say(`but if you are interested in a specific team, you can say`, { volume: "+6dB" }),
        ssmlResponse.voice([
          ssmlResponse.say(`when is denmark playing`, { volume: "+6dB" }),
        ], {
          gender: 'male',
          variant: '4'
        }),
        ssmlResponse.pause("0.2s"),
        ssmlResponse.say(`or more specifically`, { volume: "+6dB" }),
        ssmlResponse.voice([
          ssmlResponse.say(`when is denmark playing against Australia`, { volume: "+6dB" })
        ], {
          gender: 'male',
          variant: '4'
        }),
        ssmlResponse.pause("1s"),
        ssmlResponse.say(`If you just want all games in a specific date, you can say`, { volume: "+6dB" }),
        ssmlResponse.voice([
          ssmlResponse.say(`Who is playing the 15th of June 2018`, { volume: "+6dB" })
        ], {
          gender: 'male',
          variant: '4'
        }),
        ssmlResponse.pause("1s"),
        ssmlResponse.say(`Am sure am forgetting something`, { volume: "+6dB" }),
        ssmlResponse.pause("0.2s"),
        ssmlResponse.say(`But i can't remember it, so you gotta find out by yourself`, { volume: "+6dB" })
      ])
  }));
});

// intents Handling
app.intent(DEFAULT_WELCOME_INTENT, (conv) => {
  const ssmlResponse = new Ssml();

  if (conv.user.storage.lastVisit) {
    return conv.ask(new SimpleResponse(`Welcome back buddy, what do you need today?`));
  }

  conv.user.storage.lastVisit = moment();
  
  conv.ask(new SimpleResponse({
    text: `What's up maaan.
    I am your world cup buddy! You can ask me any question.
    I can tell you about the different groups, different games and different teams.
    I also know about stadiums, and where every game is played.
    So please don't be shy, just go ahead and ask!`,
    speech: ssmlResponse.speak([
      ssmlResponse.parallel([
        ssmlResponse.media(
          [
            ssmlResponse.audio(getSong('world_cup'), 'sound of stadium')
          ],
          {
            fadeOutDur: "5s",
            soundLevel: "-15dB",
            clipBegin: "2s"
          }
        ),

        ssmlResponse.media(
          [
            ssmlResponse.say(`what's up, my friend`, { volume: "+20dB" }),
            ssmlResponse.pause("0.2s"),
            ssmlResponse.say(`I Am you world cup buddy`, { volume: "+6dB" }),
            ssmlResponse.pause("1s"),
            ssmlResponse.say(`you can ask me about the world cup`, { volume: "+6dB" }),
            ssmlResponse.pause("1s"),
            ssmlResponse.say(`I can tell you about the different groups`, { volume: "+6dB" }),
            ssmlResponse.say(`different games and different teams`, { volume: "+6dB" }),
            ssmlResponse.pause("1s"),
            ssmlResponse.say(`I also know about stadiums, and where every game is played`, { volume: "+6dB" }),
            ssmlResponse.say(`So please don't be shy, ${ssmlResponse.pause("0.5s")}just go ahead and ask!`, { volume: "+6dB" }),
          ],
          {
            id: "greeting",
            begin: "1.5s"
          }
        )
      ])
    ])
  }));
});

app.intent(ASK_ABOUT_ALL_GROUPS_INTENT, (conv) => {
  const ssmlResponse = new Ssml();
  conv.ask(new SimpleResponse({
    text: `Here we go, the list of all groups`,
    speech: ssmlResponse.speak(
      [
        ssmlResponse.say(`We have in Total 8 groups <break time='0.2s'/> Called By alphabetical letters`, { volume: "+6dB" }),
        ssmlResponse.pause("0.2s"),
        ssmlResponse.say(`for example, the first group is Group A, the second, <break time='0.2s'/> is Group B <break time='0.2s'/> and so on`, { volume: "+6dB" }),
        ssmlResponse.pause("0.2s"),
        ssmlResponse.say(`the last one is called group H`, { volume: "+6dB" }),
        ssmlResponse.pause("0.2s"),
        ssmlResponse.say("Give me a group name, and i will tell you everything about it.")
      ])
  }));
  

  if (conv.hasScreen) {
    return dataStore.getData()
    .then(state => {
      return state.getGroups();
    })
    .then((groups) => {
      const groupsListItems = {};
      groups.forEach(group => {
        groupsListItems[group.getName()] = formatListElementByGroup(group);
      });
      // Create a list
      return conv.ask(new List({
        title: 'List Of groups',
        items: groupsListItems
      }));
    });
  }
  return;
});

app.intent(GROUP_ITEM_SELECTED_INTENT, (conv, params, option) => {
  return groupStandingsAnswer(conv, option);
});

app.intent(ASK_ABOUT_A_GROUP_INTENT, (conv, params) => {
  return groupStandingsAnswer(conv, params.group);
});

app.intent(FIND_GROUP_BY_TEAM_INTENT, (conv, params) => {
  return dataStore.getData()
    .then(state => {
      return state.getGroups()
        .find(
          (group) => group.getStandings()
            .filter(standing => standing.getTeam().getName() === params['geo-country'])
            .length > 0);
    })
    .then((group) => {
      conv.ask(`${params['geo-country']} is part of group ${group.getName()}`);
      return groupStandingsAnswer(conv, group.getName());
    });
});

app.intent(ASK_ABOUT_GAMES_BY_TEAM_INTENT, (conv, params) => {
  const teams = params['geo-country'];
  const notFoundTeams = [...params['geo-country']];
  const ssmlResponse = new Ssml();
  if (teams.length > 2) {
    return conv.ask(new SimpleResponse({
      text: `To tell you about games, 
      I will need one or two teams maximum,
      I don't get what you mean when you mention ${teams.length} different teams.`,
      speech: ssmlResponse.speak(
        [
          ssmlResponse.say(`Sweet, <break time='0.2s'/> but i don't get what you mean`, { volume: "+6dB" }),
          ssmlResponse.pause("0.2s"),
          ssmlResponse.say(`You need to specify no more than 2 teams, <break time='0.2s'/> but you specified ${teams.length}`, { volume: "+6dB" }),
          ssmlResponse.pause("0.2s"),
          ssmlResponse.say(`it's not a cycling competition, <break time='0.2s'/> <s>you know that </s><s> right?</s>`, { volume: "+6dB" })
        ])
    }));
  }
  return dataStore.getData()
    .then(state => {
      return state.getGroups()
        .filter(
          (group) => group.getStandings()
            .filter(standing => {
              const exist = teams.includes(standing.getTeam().getName());
              if (exist) {
                notFoundTeams.splice(notFoundTeams.indexOf(standing.getTeam().getName()), 1);
              }
              return exist;
            }).length > 0);
    })
    .then((groups) => {
      // teams are not in world cup
      if (groups.length === 0) {
        return conv.ask(new SimpleResponse({
          text: `I'm really sad to be the one who tells you this,
          but none of teams you mentioned has made it for the world cup.`,
          speech: ssmlResponse.speak(
            [
              ssmlResponse.say(`Sorry to tell you this`, { volume: "+6dB" }),
              ssmlResponse.pause("0.2s"),
              ssmlResponse.say(`but none of the teams you specified, <break time='0.2s'/>
              has made it to the world cup`, { volume: "+6dB" }),
              ssmlResponse.pause("0.2s")
            ])
        }));
      }
      // teams are in different groups
      if (groups.length === 2) {
        return conv.ask(new SimpleResponse({
          text: `Sorry but you mentioned 2 teams in 2 different groups, they can't play against each other.
          not before knockout phase at least.`,
          speech: ssmlResponse.speak(
            [
              ssmlResponse.say(`Sorry but you mentioned 2 teams in 2 different groups.`, { volume: "+6dB" }),
              ssmlResponse.pause("0.2s"),
              ssmlResponse.say(`they can't play against each other`, { volume: "+6dB" }),
              ssmlResponse.pause("0.2s"),
              ssmlResponse.say(`not before knockout phase at least.`, { volume: "+6dB" }),
              ssmlResponse.pause("0.2s"),
              ssmlResponse.say(`so try to ask again, i know you can do it.`, { volume: "+6dB" }),
            ])
        }));
      }
      // one of the teams not in world cup
      if (notFoundTeams.length > 0) {
        return conv.ask(new SimpleResponse({
          text: `I'm really sad to be the one who tells you this,
          but ${notFoundTeams[0]} didn't make it for this world cup, maybe next time.`,
          speech: ssmlResponse.speak(
            [
              ssmlResponse.say(`Sorry to tell you this`, { volume: "+6dB" }),
              ssmlResponse.pause("0.2s"),
              ssmlResponse.say(`but ${notFoundTeams[0]} didn't make it for this world cup`, { volume: "+6dB" }),
              ssmlResponse.pause("0.2s"),
              ssmlResponse.say(`maybe next time.`, { volume: "+6dB" }),
            ])
        }));
      }

      // normal case scenario
      if(!conv.hasAudioPlayback) {
        conv.ask(`${teams[0]}  game` + (teams.length === 1 ? `s: ` : `against ${teams[1]}: `));
      } else {
        const gamesToDescribe = groups[0].getMatches().filter(game => {
          return teams.length === 1 ?
            // All games for a team
            teams.includes(game.getHomeTeam().getName()) ||
            teams.includes(game.getAwayTeam().getName()) :
            // one game that matches both teams
            teams.includes(game.getHomeTeam().getName()) &&
            teams.includes(game.getAwayTeam().getName())
        })
          conv.ask(new SimpleResponse({
            speech: ssmlResponse.speak(gamesToDescribe.map((game, index) => {
              if (gamesToDescribe.length === 1) {
                return [
                  ssmlResponse.say(`On ${game.getDate().format("dddd, MMMM Do h:mm a")}`, { volume: "+6dB" }),
                  ssmlResponse.pause("0.2s"),
                  ssmlResponse.say(`Do you wanna know where are they playing`, { volume: "+6dB" })
                ]  
              }
              const againstTeam = game.getHomeTeam().getName() !== teams[0] ?
              game.getHomeTeam().getName():
              game.getAwayTeam().getName()
              const speech = [];

              switch (index) {
                case 0: 
                  speech.push(ssmlResponse.say(`they play against ${againstTeam}`, { volume: "+6dB" }))
                  speech.push(ssmlResponse.say(`On ${game.getDate().format("dddd, MMMM Do h:mm a")}`, { volume: "+6dB" }))
                  speech.push(ssmlResponse.pause("0.2s"));
                  break;
                case 1:
                  speech.push(ssmlResponse.say(`and against ${againstTeam}`, { volume: "+6dB" }))
                  speech.push(ssmlResponse.say(`On ${game.getDate().format("dddd, MMMM Do h:mm a")}`, { volume: "+6dB" }))
                  speech.push(ssmlResponse.pause("0.2s"))
                  break;
                case 2:
                  speech.push(ssmlResponse.say(`and finally against ${againstTeam}`, { volume: "+6dB" }))
                  speech.push(ssmlResponse.say(`On ${game.getDate().format("dddd, MMMM Do h:mm a")}`, { volume: "+6dB" }))
                  speech.push(ssmlResponse.pause("0.2s"))
                  break;
              }
              return speech;
          }).reduce((acc, val) => acc.concat(val), []))
          }));
      }

      return gamesInGroupAnswer(
        conv,
        groups[0].getMatches().filter(match => {
          return teams.length === 1 ?
            // All games for a team
            teams.includes(match.getHomeTeam().getName()) ||
            teams.includes(match.getAwayTeam().getName()) :
            // one game that matches both teams
            teams.includes(match.getHomeTeam().getName()) &&
            teams.includes(match.getAwayTeam().getName())
        }
        )
      );

    });
});

app.intent(FIND_GAME_BY_DATE, (conv, params) => {
  return dataStore.getData()
    .then(state => {
      return state.getGroups()
        .map((group) => group.getMatches()
          .filter((match) =>
            match.date.format("YYYY-MM-DD") === moment(params.date).format("YYYY-MM-DD")
          ))
        .reduce((acc, val) => acc.concat(val), []);
    })
    .then((matches) => matches.map((match) => {
      return conv.ask(match.getHomeTeam().getName + ' is playing against ' + match.getAwayTeam().name)
    }));
});

app.intent(ASK_ABOUT_GAMES_BY_TEAM_FOLLOWUP_YES_INTENT, (conv, params, options) => {
  return conv.followup('actions_intent_SHOW_STADIUM');
})

app.intent(SHOW_STADIUM_INTENT, (conv, params, options) => {

  const teams = conv.contexts.get('askaboutgamesbyteamname-followup').parameters['geo-country'];
  
  return dataStore.getData()
    .then(state => {
      return state.getGroups()
        .find(
          (group) => group.getStandings()
            .filter(standing => teams.includes(standing.getTeam().getName())).length > 0)
            .getMatches().find(game => teams.includes(game.getHomeTeam().getName()) &&
                teams.includes(game.getAwayTeam().getName()));
    })
    .then((game) => {
      conv.ask(`The game will be played in ${game.getStadium().getName()} `)
      if (conv.hasScreen) {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${game.getStadium().getLat()},${game.getStadium().getLng()}`
        const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center='${game.getStadium().getLat()},${game.getStadium().getLng()}'&zoom=16&size=400x200&markers=color:red|${game.getStadium().getLat()},${game.getStadium().getLng()}`
        
        conv.ask(new BasicCard({
          text: `${game.getStadium().getName()}`,
          title: `${game.getHomeTeam().getEmojiString()} X ${game.getAwayTeam().getEmojiString()}`,
          buttons: new Button({
            title: 'Get direction',
            url: mapUrl,
          }),
          image: new Image({
            url: imageUrl,
            alt: 'Image alternate text',
          }),
        }));
      } else if (conv.hasScreenPossibility) {
        return conv.ask(new NewSurface({
          capabilities: 'actions.capability.SCREEN_OUTPUT',
          context: 'Show stadium',
          notification: 'click to see stadium location'
        }))
      }
    })
});

const groupStandingsAnswer = (conv, groupName) => {
  return dataStore.getData()
  .then(state => {
    return state.getGroups().find((group) => group.getName() === groupName);
  })
  .then((group) => {
    const ssmlResponse = new Ssml();
    if(!group) {
      return conv.ask(new SimpleResponse({
        text: `Hmmm never heard of that one, groups are from A to H there is no group ${groupName}`,
        speech: ssmlResponse.speak([
          ssmlResponse.say(`I don't think that group exist,`, { volume: "+6dB" }),
          ssmlResponse.pause("0.2s"),
          ssmlResponse.say(`groups are from A to H`, { volume: "+6dB" }),
          ssmlResponse.pause("0.2s"),
          ssmlResponse.say(`I have never heard of group ${groupName}`, { volume: "+6dB" })
        ])
      }));
    }
    const standings = group.getStandings();
    conv.ask(new SimpleResponse({
      text: `Here are teams and their standings for group ${group.getName()}`,
      speech: ssmlResponse.speak([
        ssmlResponse.say(`In group ${group.getName()}`, { volume: "+6dB" }),
        ...getStandingsSpeech(standings),
        ssmlResponse.pause('1s'),
        ssmlResponse.say('You can ask about a team, or a specific game.')
      ])
    }));

    if (conv.hasScreen) {
      const tableColumns = ['', 'Pld', 'W-D-L', 'G', 'GD', 'Pts'];
      const tableRows = standings.map(standing => {
        return [
          `${standing.getTeam().getEmojiString()} ${standing.getTeam().getName()}`,
          `${standing.getPlayed()}`,
          `${standing.getWins()}-${standing.getDraws()}-${standing.getLosses()}`,
          `${standing.getGoalsFor()}-${standing.getGoalsAgainst()}`,
          `${standing.getGoalsDifference()}`,
          `${standing.getPoints()}`
        ]
      });

      return conv.ask(new Table({
        dividers: false,
        columns: tableColumns,
        rows: tableRows,
      }));
    }
  });
  
};

const formatSingleGameRow = (game) => {
  const namesRow = [
    `${game.getHomeTeam().getName()}`,
    `${game.getDate().format('DD/MM')}`,
    `${game.getAwayTeam().getName()}`
  ];

  const flagsRow = [
    `${game.getHomeTeam().getEmojiString()}`,
    ``,
    `${game.getAwayTeam().getEmojiString()}`
  ];

  return [namesRow, flagsRow]
}

const formatListElementByGroup = (group) => {
  const groupElement = {
    title: `Group ${group.getName()}`,
    image: new Image({
      url: getImage(`group_${group.getName()}`),
      alt: `Image of Group ${group.getName()}`,
    }),
  }
  return groupElement;
}

const gamesInGroupAnswer = (conv, games) => {
  const tableRows = games
    .map(game => formatSingleGameRow(game))
    .reduce((acc, val) => acc.concat(val), []);

  const tableColumnProperties = [
    { align: 'CENTER' },
    { align: 'CENTER' },
    { align: 'CENTER' }
  ];

  return conv.ask(new Table({
    dividers: false,
    columnProperties: tableColumnProperties,
    rows: tableRows,
  }));
};

const getStandingsSpeech = (standings) => {
  const ssmlResponse = new Ssml();
  const standingsSpeech = []
  const standingsGrouping = {}
  standings.forEach(standing => {
    const played = standing.getPlayed();
    const points = standing.getPoints();
    const teamName = standing.getTeam().getName();
    if (!standingsGrouping[played]) {
      standingsGrouping[played] = {}
      standingsGrouping[played][points] = [teamName];
    } else {
      if (!standingsGrouping[played][points]) {
        standingsGrouping[played][points] = [teamName]
      } else {
        standingsGrouping[played][points].push(teamName)
      }
    }
  });
  Object.keys(standingsGrouping).forEach((matchPlayedNumber, matchPlayedIndex) => {
    if(Object.keys(standingsGrouping).length === 1) {
      if (matchPlayedNumber === '0') {
        standingsSpeech.push(ssmlResponse.say(`None of the teams has played any game yet`, { volume: "+6dB" }))
        standingsSpeech.push(ssmlResponse.say(`So obviously`, { volume: "+6dB" }))
      } else {
        standingsSpeech.push(ssmlResponse.say(`All teams has played ${matchPlayedNumber} games`, { volume: "+6dB" }))
      }
    } else {
      if (matchPlayedIndex === 0) {
        standingsSpeech.push(ssmlResponse.say(`with ${matchPlayedNumber} games played`, { volume: "+6dB" }))
      } else {
        standingsSpeech.push(ssmlResponse.say(`And with only ${matchPlayedNumber} games played`, { volume: "+6dB" }))
      }
    }
    Object.keys(standingsGrouping[matchPlayedNumber]).forEach((pointsNumber, pointsNumberIndex) => {
      if(Object.keys(standingsGrouping[matchPlayedNumber]).length === 1) {
        if (pointsNumber === '0') {
          standingsSpeech.push(ssmlResponse.say(`${standingsGrouping[matchPlayedNumber][pointsNumber].join(`, <break time='0.1s'/> `)} still have no points`, { volume: "+6dB" }))
        } else {
          standingsSpeech.push(ssmlResponse.say(`${standingsGrouping[matchPlayedNumber][pointsNumber].join(`, <break time='0.1s'/> `)} all have ${pointsNumber} points`, { volume: "+6dB" }))
        }
      } else {
        if (pointsNumberIndex === Object.keys(standingsGrouping[matchPlayedNumber]).length - 1) {
          standingsSpeech.push(ssmlResponse.say(`And with only ${pointsNumber} points we have ${standingsGrouping[matchPlayedNumber][pointsNumber].join(' ')}`, { volume: "+6dB" }))
        } else {
          standingsSpeech.push(ssmlResponse.say(`${standingsGrouping[matchPlayedNumber][pointsNumber].join(`, <break time='0.2s'/> `)} have ${pointsNumber} points`, { volume: "+6dB" }))
        }
      }
    });  
  });
  return standingsSpeech;
}

exports.conversationComponent = functions.https.onRequest(app);

/*
const express = require('express');
const bodyParser = require('body-parser');
const server = express();

// to send form data in body
server.use(bodyParser.json());

// to access assets like images
// server.use(express.static('public'));

server.post('/', app);
server.get('/', app);

server.listen(8010, () => {
  console.log('Example server listening on port 8010!')
});
*/
