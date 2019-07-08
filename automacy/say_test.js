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
  for (var i = 0; i < all_teams.length; i++) {
    controller.spawn( {token: all_teams[i].bot.token}, function (bot) {
        bot.say({
            text: 'This is a test',
            channel: all_teams[i].channel
        }, function (err, response) {
            if (err) {
                console.log("error: ", err);
            } else {
                console.log("response: ", response);
            }
        });
    })
  }
});