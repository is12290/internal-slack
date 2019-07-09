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
  if (!error) {
    console.log("Got all teams");
  }
  for (var i = 0; i < all_teams.length; i++) {
    console.log("Looping through teams");
    controller.spawn({ token: all_teams[i].bot.token }, function (bot) {
      console.log("Spawning Bot");
      controller.storage.users.find({ team: all_teams[i].id }, function (error, results) {
        for (var j = 0; j < results.length; j++) {
          console.log("Looping through users");
          console.log("ID: ", results[j].id);
          bot.startPrivateConversation({user: results[j].id}, function (err, dm) {
            console.log("Starting Conversation");
            dm.say("hi");
            console.log("Skipped");
          });
        }
      });
    });
  }
});