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

          bot.api.im.open({
            user: results[j].id
          }, (err, res) => {
            if (err) {
              bot.botkit.log('Failed to open IM with user', err)
            }

            bot.startConversation({
              text: "Here's your check in...",
              channel: res.channel.id,
              attachments: [
                {
                  title: "Sleep",
                  callback_id: 'checkin-sleep',
                  attachment_type: 'default',
                  color: '#02D2FF',
                  actions: [
                    {
                      'name': 'perfect-button',
                      'value': 'Perfect',
                      'text': 'Perfect',
                      'type': 'button'
                    },
                    {
                      'name': 'sufficient-button',
                      'value': 'Sufficient',
                      'text': 'Sufficient',
                      'type': 'button'
                    },
                    {
                      'name': 'restless-button',
                      'value': 'Restless',
                      'text': 'Restless',
                      'type': 'button'
                    },
                    {
                      'name': 'terrible-button',
                      'value': 'Terrible',
                      'text': 'Terrible',
                      'type': 'button'
                    },
                  ]
                }
              ]
            }, function (err, convo) {
              console.log("skipped?");
            });

          });
        }
      });
    });
  }
});