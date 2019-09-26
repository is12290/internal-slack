var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
var rounded = round(now, moment.duration(30, "minutes"), "floor");
const today = moment().format('MM/DD/YYYY');
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

    controller.storage.users.all(function (err, all_users) {
        if (err) {
            console.log("error: ", err);
        }
        for (var j = 0; j < all_users.length; j++) {
            var user = all_users[j];
            if (typeof user.token != 'undefined') {
            var bot = controller.spawn({ token: user.token });
            if (user.logs && typeof user.logs[today] != 'undefined' && typeof user.logs[today].reflection != 'undefined') {
                // Pass
            } else if (!user.customization || !user.customization.logging || typeof user.customization.logging.reflection_time == 'undefined') {
                if (moment.tz(rounded, user.timezone).format('HH:mm') == '18:30') {
                    bot.say({
                        text: "Ready to reflect?",
                        attachments: [{
                            title: "Reflection",
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
                    }, function (err, response) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            } else {
                if (user.customization.logging.reflection_time == moment.tz(rounded, user.customization.logging.timezone).format('HH:mm')) {
                    bot.say({
                        text: "Ready to reflect?",
                        attachments: [{
                            title: "Reflection",
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
                    }, function (err, response) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    sleep(400);
                } else {
                    // Pass
                }
            }
        }
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