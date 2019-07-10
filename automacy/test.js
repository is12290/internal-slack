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
  if (error) {
    console.log("ERROR: ", error);
  }
  for (var i = 0; i < all_teams.length; i++) {
    controller.spawn({ token: all_teams[i].bot.token }, function (bot) {
      controller.storage.users.find({ team: all_teams[i].id }, function (error, results) {
        for (var j = 0; j < results.length; j++) {
          var user = results[j].id

          bot.api.im.open({
            user: results[j].id
          }, (err, res) => {
            if (err) {
              bot.botkit.log('Failed to open IM with user', err)
            }

            bot.startPrivateConversation({user: user}, function (err, convo) {
              convo.say({
                text: 'ayyyy lmao',
                channel: res.channel.id
              });

              convo.activate();
            })
          });
        }
      });
    });
  }
});