var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
if (n === 6 || n === 0) {
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

    controller.storage.teams.all(function (err, all_teams) {
        if (err) {
            console.log("error: ", err);
        }
        controller.storage.users.all(function (err, all_users) {
            if (err) {
                console.log("error: ", err);
            }
            for (var i = 0; i < all_teams.length; i++) {
                var bot = controller.spawn({ token: all_teams[i].bot.token });
                for (var j = 0; j < all_users.length; j++) {
                    var user = all_users[j];
                    if (typeof user.customization == 'undefined' || typeof user.customization.logging == 'undefined' || typeof user.customization.logging.reflection_time == 'undefined') {
                        // Pass
                    } else if (user.customization.logging.reflection_time == moment.tz(now, user.customization.logging.timezone).format('HH:mm')) {
                        bot.say({
                            attachments: [{
                                text: "Ready to reflect?",
                                color: "#0294ff",
                                callback_id: 'automatic-reflections',
                                attachment_type: 'default',
                                actions: [
                                    {
                                        'name': 'yes-button',
                                        'value': 'Yes-Reflect',
                                        'text': 'Yes',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'no-button',
                                        'value': 'No-Reflect',
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

                setTimeout(bot.destroy.bind(bot), 100);
            }
            process.exit();
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