var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
if (n === 6 || n === 0) {
    //Pass
} else {
    console.log("first if statement");
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

    controller.storage.teams.all(function (err, all_teams) {
        if (err) {
            console.log("error: ", err);
        }
        console.log("Opened team storage");
        controller.storage.users.all(function (err, all_users) {
            console.log("Opened user storage");
        if (err) {
            console.log("error: ", err);
        }
        for (var i = 0; i < all_teams.length; i++) {
            var bot = controller.spawn({ token: all_teams[i].bot.token });
            console.log("bot spawned");
                for (var j = 0; j < all_users.length; j++) {
                    var user = all_users[j];
                    if (!user.customization || !user.customization.logging || typeof user.customization.logging.check_in_time == 'undefined') {
                        // Pass
                    } else if (user.customization.logging.check_in_time == moment.tz(now, user.customization.logging.timezone).format('HH:mm')) {
                        bot.say({
                            attachments: [{
                                text: "Ready to check in?",
                                color: "#0294ff",
                                callback_id: 'automatic-checkin',
                                attachment_type: 'default',
                                actions: [
                                    {
                                        'name': 'yes-button',
                                        'value': 'Yes-CheckIn',
                                        'text': 'Yes',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'no-button',
                                        'value': 'No-CheckIn',
                                        'text': 'No',
                                        'type': 'button'
                                    }
                                ]
                            }],
                            channel: user.channel
                        });
                            sleep(400);
                    } else {
                        // Pass
                    }
                }

            console.log("Made it to bot destroy");
            setTimeout(bot.destroy.bind(bot), 100);
            console.log("Made it past bot destroy");
        }
        console.log("Outside of team for loop");
        controller.shutdown();
        })
    })
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
