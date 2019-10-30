var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
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

    // Get log dates for the week
    var days = [];
    var start = moment().startOf('isoWeek');
    var end = moment().endOf('isoWeek');
    var day = start;
    while (day <= end) {
        days.push(day.format('L'));
        day = day.clone().add(1, 'd');
    }

    controller.storage.teams.all(function (err, all_teams) {
        if (err) {
            console.log("error: ", err);
        }
        for (var x = 0; x < all_teams.length; x++) {
            var team = all_teams[x];
            bot.api.conversations.history({ token: bot.config.token, channel: team.bot.channel }, function (err, response) {
                if (err) {
                    console.log("error: ", err);
                }
                
                    controller.storage.users.find({ team: team.bot.channel }, function (err, all_users) {
                        if (err) {
                            console.log("error: ", err);
                        }
                        for (var j = 0; j < all_users.length; j++) {
                            var user = all_users[j];
                            if (moment.tz(rounded, user.timezone).format('HH:mm') == '15:30') {
                                var reflection_tally = {
                                    0: { // Progress
                                        4: 0, // Substantial
                                        3: 0, // Acceptable
                                        2: 0, // Minimal
                                        1: 0 // Stagnant
                                    },
                                    1: { // Frustration
                                        4: 0, // Nonexistent
                                        3: 0, // Present
                                        2: 0, // Considerable
                                        1: 0 // Peak
                                    },
                                    2: { // Work Distribution
                                        4: 0, // Equal
                                        3: 0, // Fair
                                        2: 0, // Mostly Me
                                        1: 0 // Mostly Them
                                    },
                                    3: { // Confidence
                                        4: 0, // Certain
                                        3: 0, // Hopeful
                                        2: 0, // Dwindling
                                        1: 0 // Lost
                                    }
                                };
                                if (typeof user.token != 'undefined') {
                                    for (var k = 0; k < days.length; k++) {
                                        if (days[k] in user.logs && user.logs[days[k]].check_out != 'undefined') {
                                            var reflection = user.logs[days[k]].check_out;
                                            for (var z = 0; z < reflection.length; z++) {
                                                reflection_tally[z][reflection[z]] = reflection_tally[z][reflection[z]] + 1;
                                            }
                                        }
                                    }

                                    var message_context = [];
                                    if (reflection_tally[0][1] + reflection_tally[0][2] >= 3) {
                                        var progress = true;
                                        message_context.push(true);
                                    } else {
                                        message_context.push(false);
                                    }
                                    if (reflection_tally[1][1] + reflection_tally[1][2] >= 3) {
                                        var frustration = true;
                                        message_context.push(true);
                                    } else {
                                        message_context.push(false);
                                    }
                                    if (reflection_tally[2][1] + reflection_tally[2][2] >= 3) {
                                        var work = true;
                                        message_context.push(true);
                                    } else {
                                        message_context.push(false);
                                    }
                                    if (reflection_tally[3][1] + reflection_tally[3][2] >= 3) {
                                        var confidence = true;
                                        message_context.push(true);
                                    } else {
                                        message_context.push(false);
                                    }

                                    if (progress == true || frustration == true || work == true || confidence == true) {
                                        controller.spawn({ token: user.token }, function (bot) {
                                            
                                            var message = '<@' + user.id + '>, wasn\'t feeling too well this week in regards to ';

                                            for (var t = 0; t < message_context.length; t++) {
                                                if (t == 0 && message_context[t] == true) {
                                                    if (message_context[1] == true || message_context[2] == true || message_context[3] == true) {
                                                        message = message + '_progress made_, ';
                                                    } else if ((message_context[1] == true & message_context[2] == false && message_context[3] == false) || (message_context[1] == false & message_context[2] == true && message_context[3] == false) || (message_context[1] == false & message_context[2] == false && message_context[3] == true)) {
                                                        message = message + '_progress made_ ';
                                                    } else {
                                                        message = message + '_progress made_.';
                                                    }
                                                }
                                                if (t == 1 && message_context[t] == true) {
                                                    if (message_context[2] == true || message_context[3] == true) {
                                                        message = message + 'your _overall frustration_, ';
                                                    } else if (message_context[0] == true && message_context[2] == false && message_context[3] == false) {
                                                        message = message + 'and _your overall frustration_.';
                                                    } else if (message_context[0] == false && message_context[2] == false && message_context[3] == false) {
                                                        message = message + 'your _overall frustration_.';
                                                    }
                                                }
                                                if (t == 2 && message_context[t] == true) {
                                                    if (message_context[3] == true) {
                                                        message = message + '_work distribution_, ';
                                                    } else if ((message_context[0] == true && message_context[3] == false) || (message_context[1] == true && message_context[3] == false)) {
                                                        message = message + 'and _work distribution_.';
                                                    } else if (message_context[0] == false && message_context[1] == false && message_context[3] == false) {
                                                        message = message + '_work distribution_.';
                                                    }
                                                }
                                                if (t == 3 && message_context[t] == true) {
                                                    if (message_context[0] == false && message_context[1] == false && message_context[2] == false) {
                                                        message = message + '_venture confidence_.'
                                                    } else {
                                                        message = message + 'and _venture confidence_.'
                                                    }
                                                }
                                            }

                                            message = message + ' It would be great if you would be willing to take a few minutes to chat with them about it!';

                                            var channel_message = 'Happy Friday, <@channel>! It\'d be great if you could clear some time to talk to your fellow founders today :partly_sunny:';

                                            if (response.messages[0].text == channel_message || response.messages[1].text == channel_message || response.messages[2].text == channel_message || response.messages[3].text == channel_message) { 
                                                bot.say({
                                                    text: channel_message,
                                                    channel: team.bot.channel
                                                });
                                            }

                                            for (var y = 0; y < all_users.length; y++) {
                                                var user_instance = all_users[y];
                                                if (user_instance.id == user.id) {
                                                    // Pass
                                                } else {
                                                    bot.say({
                                                        text: message,
                                                        channel: user_instance.channel
                                                    });
                                                }
                                            }
                                            
                                        });
                                    } else {
                                        // Pass
                                    }
                                }
                                sleep(200);
                            }
                        }
                    })
            })
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