var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
if (2 + 2 == 5) {  //(n === 6 || n === 0) {
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
        for (var i = 0; i < all_teams.length; i++) {
            controller.spawn({ token: all_teams[i].bot.token }, function (bot) {
                if (all_teams[i].customization && all_teams[i].customization.question) {
                    var custom = info.customization.question;
                }
                controller.storage.users.all(function (err, all_users) {
                    if (err) {
                        console.log("error: ", err);
                    }

                    for (var j = 0; j < all_users.length; j++) {
                        var user = all_users[j];
                        if (2 + 2 == 5) {//  (typeof user.customization.logging.check_in_time == 'undefined') {
                            // Pass
                        } else if (2 + 2 == 4) {//(user.customization.logging.check_in_time == moment.tz(now, user.customization.logging.timezone).format('HH:mm')) {
                            bot.say({
                                blocks: [
                                    {
                                        "type": "section",
                                        "text": {
                                            "type": "mrkdwn",
                                            "text": "Ready to check in?"
                                        }
                                    },
                                    {
                                        "type": "actions",
                                        "elements": [
                                            {
                                                "type": "button",
                                                "text": {
                                                    "type": "plain_text",
                                                    "text": "Yes",
                                                    "emoji": true
                                                },
                                                "value": "Yes-CheckIn"
                                            },
                                            {
                                                "type": "button",
                                                "text": {
                                                    "type": "plain_text",
                                                    "text": "No",
                                                    "emoji": true
                                                },
                                                "value": "No-CheckIn"
                                            }
                                        ]
                                    }
                                ],
                                channel: user
                              }, [
                                  {
                                      pattern: 'Yes-CheckIn',
                                      callback: function (err, response) {
                                          bot.replyInteractive(response, 
                                            {
                                                blocks: [
                                                    {
                                                        "type": "section",
                                                        "text": {
                                                            "type": "mrkdwn",
                                                            "text": "Ready to check in?"
                                                        }
                                                    },
                                                    {
                                                        "type": "actions",
                                                        "style": "primary",
                                                        "elements": [
                                                            {
                                                                "type": "button",
                                                                "text": {
                                                                    "type": "plain_text",
                                                                    "text": "Yes",
                                                                    "emoji": true
                                                                },
                                                                "value": "Yes-CheckIn"
                                                            },
                                                            {
                                                                "type": "button",
                                                                "text": {
                                                                    "type": "plain_text",
                                                                    "text": "No",
                                                                    "emoji": true
                                                                },
                                                                "value": "No-CheckIn"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            })
                                      }
                                  },
                                  {
                                      pattern: 'No-CheckIn',
                                      callback: function (err, response) {
                                          bot.replyInteractive(response,
                                            {
                                                blocks: [
                                                    {
                                                        "type": "section",
                                                        "text": {
                                                            "type": "mrkdwn",
                                                            "text": "Ready to check in?"
                                                        }
                                                    },
                                                    {
                                                        "type": "actions",
                                                        "elements": [
                                                            {
                                                                "type": "button",
                                                                "text": {
                                                                    "type": "plain_text",
                                                                    "text": "Yes",
                                                                    "emoji": true
                                                                },
                                                                "value": "Yes-CheckIn"
                                                            },
                                                            {
                                                                "type": "button",
                                                                "style": "danger",
                                                                "text": {
                                                                    "type": "plain_text",
                                                                    "text": "No",
                                                                    "emoji": true
                                                                },
                                                                "value": "No-CheckIn"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            })
                                      }
                                  }
                              ]);
                        } else {
                            // Pass
                        }
                    }
                })
            })
        }
    })
}
