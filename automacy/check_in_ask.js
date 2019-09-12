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
        controller.storage.users.all(function (err, all_users) {
            if (err) {
                console.log("error: ", err);
            }
        for (var i = 0; i < all_teams.length; i++) {
            var bot = controller.spawn({ token: all_teams[i].bot.token });
            
                for (var j = 0; j < all_users.length; j++) {
                    if (all_teams[i].name == "Internal") {
                        bot.say({
                            text: "Yo",
                            channel: "DK97CQZSL"
                        }, function (err, response) {
                            console.log("error: ", err);
                        });
                    }
                    var user = all_users[j];
                    if (user.team != all_teams[i].id || !user.customization || !user.customization.logging || typeof user.customization.logging.check_in_time == 'undefined') {
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
                        }, function (err, response) {
                            console.log("error: ", err);
                        });
                        sleep(400);
                    } else {
                        // Pass
                    }
                }
                }
                setTimeout(bot.destroy.bind(bot), 100);
            
        }
        // function FatalError() { Error.apply(this, arguments); this.name = "FatalError"; }
        // FatalError.prototype = Object.create(Error.prototype);
        // throw new FatalError("All done!");
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

function round(date, duration, method) {
    return moment(Math[method]((+date) / (+duration)) * (+duration)); 
}