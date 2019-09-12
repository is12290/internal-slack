var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment("2019-09-12T12:22:37.649");
var rounded = round(now, moment.duration(30, "minutes"), "floor");
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
        scopes: ['bot']
    };

    var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true });
    bot_options.storage = mongoStorage;

    var controller = Botkit.slackbot(bot_options);
    controller.startTicking();

    controller.storage.users.all(function (err, all_users) {
        if (err) {
            console.log("error: ", err);
        }
        for (var j = 0; j < all_users.length; j++) {
            var user = all_users[j];
            if (typeof user.token != 'undefined') {
                console.log(user.name);
                controller.spawn({ token: user.token }, function (bot) {
                if (!user.customization || !user.customization.logging || typeof user.customization.logging.check_in_time == 'undefined') {
                    // Pass
                } else {
                        if (user.customization.logging.check_in_time == moment.tz(rounded, user.customization.logging.timezone).format('HH:mm')) {
                            console.log("Saying for ", user.name);
                            bot.say({
                                text: "Ready to check in?",
                                attachments: [{
                                    title: "Check In",
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
                        console.log(bot);
                }
                
            });
            }
            // if (j == all_users.length) {
            //     process.exit();
            // }
        }
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

function round(date, duration, method) {
    return moment(Math[method]((+date) / (+duration)) * (+duration));
}