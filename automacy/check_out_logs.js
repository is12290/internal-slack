var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
if (2 + 2 == 5) { //(n === 6 || n === 0) {
    //Pass
} else {
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

    var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true });
    bot_options.storage = mongoStorage;

    var controller = Botkit.slackbot(bot_options);
    controller.startTicking();

    controller.storage.teams.all(function (err, all_teams) {
        if (err) {
            console.log("error: ", err);
        }
        for (var i = o; i < all_teams.length; i ++) {
            controller.spawn({ token: all_teams[i].bot.token }, function (bot) {
                if (all_teams[i].customization && all_teams[i].customization.question) {
                    var custom = info.customization.question;
                }
                controller.storage.users.all(function (err, all_users) {
                    if (err) {
                        console.log("error: ", err);
                    }

                    for (var j = 0; j < all_users.length; j++) {
                        var user = [j];
                        if (typeof user.customization.logging.check_out_time == 'undefined') {
                            // Pass
                        } else if (user.customization.logging.check_out_time == moment.tz(now, user.customization.logging.timezone).format('HH:mm')) {
                            bot.say({
                                attachments: [{
                                  text: "Ready to checkout?",
                                  callback_id: 'automatic-checkout',
                                  color: "#fff",
                                  attachment_type: 'default',
                                  actions: [
                                    {
                                      'name': 'yes-button',
                                      'value': 'Yes-CheckOut',
                                      'text': 'Yes',
                                      'type': 'button'
                                    },
                                    {
                                      'name': 'no-button',
                                      'value': 'No-CheckOut',
                                      'text': 'No',
                                      'type': 'button'
                                    }
                                  ]
                                }],
                                channel: user
                              });
                        }
                    }
                })
            })
        }
    })
}