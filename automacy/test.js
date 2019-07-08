const dotenv = require('dotenv');
dotenv.config();
const Botkit = require('botkit');

var bot_options = {
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  clientSigningSecret: process.env.clientSigningSecret,
  // debug: true,
  scopes: ['bot'],
  studio_token: process.env.studio_token,
  studio_command_uri: process.env.studio_command_uri
};

var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true, tables: ['teams', 'user'] });
bot_options.storage = mongoStorage;

var controller = Botkit.slackbot(bot_options);

controller.storage.teams.all(function (error, all_teams) {
  console.log("ALL TEAMS: ", all_teams);
  for (var team in all_teams) {
    controller.spawn( {token: team.bot.token}, function (bot) {
      controller.storage.users.find( {team: team}, function (error, results) {
        for (var result in results) {
          bot.startConversation({user: result.id, channel: result.channels[0]}, function (err, convo) {
            if (err) {
              console.log("ERROR: ", err);
            } else {
              convo.say("Hey!");
              convo.next();
              convo.addQuestion("How are you?", function (response, convo) {
                convo.say("cool, you said: " + response.text);
                convo.next();
              }, {}, 'default');
            }
          })
        }
      })
    })
  }
});