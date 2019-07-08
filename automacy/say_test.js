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
        controller.spawn({ token: all_teams[i].bot.token }, function (bot) {
            controller.storage.users.find({ team: all_teams[i].id }, function (err, all_users) {
                for (var j = 0; j < all_users.length; j++) {
                    // bot.say({
                    //     text: 'This is a test',
                    //     channel: all_users[j].channels[0]
                    // }, function (err, response) {
                    //     if (err) {
                    //         console.log("error: ", err);
                    //     } else {
                    //         console.log("response: ", response);
                    //     }
                    // });
                    bot.startConversation({
                        user: all_users[j].id,
                        channel: all_users[j].id,
                        text: 'dummy'
                    }, function (err, convo) {
                        convo.ask({
                            channel: all_users[j].id,
                            text: 'Just what do you think you are doing, Dave?'
                        }, function (res, convo) {
                            convo.say(res.text + ' is not a good enough answer.')
                            convo.next()
                        }
                        )
                    }
                    )
                }
            })
        });
    }
})