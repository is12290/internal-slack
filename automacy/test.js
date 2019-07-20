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
  for (var i = 0; i < all_teams.length; i++) {
    controller.spawn({ token: all_teams[i].bot.token }, function (bot) {
      controller.storage.users.find({ team: all_teams[i].id }, function (error, results) {
        for (var j = 0; j < results.length; j++) {
          var user = results[j].id

          bot.startPrivateConversation({
            user: user,

          }, function (err, convo) {
            // create a path for when a user says YES
            convo.addMessage({
              text: 'You said yes! How wonderful.',
            }, 'yes_thread');

            // create a path for when a user says NO
            convo.addMessage({
              text: 'You said no, that is too bad.',
            }, 'no_thread');

            // create a path where neither option was matched
            // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
            convo.addMessage({
              text: 'Sorry I did not understand.',
              action: 'default',
            }, 'bad_response');

            // Create a yes/no question in the default thread...
            convo.addQuestion('Do you like cheese?', [
              {
                pattern: 'yes',
                callback: function (response, convo) {
                  convo.gotoThread('yes_thread');
                },
              },
              {
                pattern: 'no',
                callback: function (response, convo) {
                  convo.gotoThread('no_thread');
                },
              },
              {
                default: true,
                callback: function (response, convo) {
                  convo.gotoThread('bad_response');
                },
              }
            ], {}, 'default');

            convo.activate();
          });
        }
      });
    });
  }
});