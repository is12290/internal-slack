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
controller.startTicking();

controller.storage.teams.all(function (error, all_teams) {
  if (error) {
    console.log("ERROR: ", error);
  }
  for (let team in all_teams) {
    controller.spawn({ token: team.bot.token }, function (bot) {
      controller.storage.users.find({ team: team.id }, function (error, results) {

        if (error) {
          console.log("error: ", error);
        }
        for (let result in results) {
          console.log(result)
          var user = result.id;

          bot.say({
            text: "hey",
            channel: user
          })

        }
      });
    })
  }
});