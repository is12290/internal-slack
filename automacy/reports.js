var d = new Date();
var n = d.getDay();
const moment = require('moment-timezone');
var now = moment();
const endOfMonth = moment().endOf('month').format('DD/MM/YYYY');
const today = moment().format('DD/MM/YYY');
if (today != endOfMonth && n === 6 || n === 0) {
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
    controller.startTicking()

    controller.storage.teams.all(function (err, all_teams) {
        if (err) {
            console.log("error: ", err);
        }

        for (var i = 0; i < all_teams.length; i++) {
            if (typeof all_teams[i].status != 'undefined' && all_teams[i].status == 'mid' || all_teams[i].status == 'top') {
                var team = all_teams[i];
                if (!team.customization.reporting.time) {
                    // Pass
                } else {
                    if (team.customization.reporting.time == moment.tz(now, team.customization.reporting.timezone).format('HH:mm')) {
                        controller.spawn({ token: all_teams[i].bot.token }, function (bot) {
                            controller.storage.users.find({ team: all_teams[i].id }, function (err, info) {
                                if (today == endOfMonth) {
                                    // Monthly Report
                                    var results = getMonthlyOutput(output, all_teams[i].status);
                                    if (results == 404) {
                                        bot.say({
                                            text: 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime, make sure all of your teammates have completed their logs!\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                            channel: team.channel
                                        });
                                    } else {
                                        if (all_teams[i].status == 'top') {
                                            if (results[0].length == 9) {
                                                if (typeof all_teams[i].customization.question == 'undefined') {
                                                    var topic = "Deleted Custom Topic"
                                                } else {
                                                    var topic = all_teams[i].customization.question.topic;
                                                }
                                                bot.say({
                                                    text: 'Hey there! Here is you organization\'s monthly report...\n',
                                                    channel: team.channel,
                                                    attachments: [
                                                        {
                                                            title: 'Sleep',
                                                            color: '#02D2FF',
                                                            attachment_type: 'default',
                                                            text: results[0][0] + '\n*Perfect:* ' + results[1][0][0] + ' | *Sufficient:* ' + results[1][0][1] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Energy',
                                                            color: '#2A02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][1] + '\n*Full:* ' + results[1][1][0] + ' | *Alright:* ' + results[1][1][1] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Mood',
                                                            color: '#8A02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][2] + '\n*Ecstatic:* ' + results[1][2][0] + ' | *Positive:* ' + results[1][2][1] + ' | *Indifferent:* ' + results[1][2][2] + ' | *Miserable:* ' + results[1][2][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Confidence',
                                                            color: '#CF02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][3] + '\n*Crushing It:* ' + results[1][3][0] + ' | *Okay:* ' + results[1][3][1] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Efficiency',
                                                            color: '#FF029D',
                                                            attachment_type: 'default',
                                                            text: results[0][4] + '\n*Overdrive:* ' + results[1][4][0] + ' | *Normal:* ' + results[1][4][1] + ' | *Slow:* ' + results[1][4][2] + ' | *Dragging:* ' + results[1][4][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Fulfillment',
                                                            color: '#FF8402',
                                                            attachment_type: 'default',
                                                            text: results[0][5] + '\n*Complete:* ' + results[1][5][0] + ' | *Present:* ' + results[1][5][1] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][3] + '\n'
                                                        },
                                                        {
                                                            title: topic,
                                                            color: '#FDFF02',
                                                            attachment_type: 'default',
                                                            text: results[0][6] + '\n*' + info.customization.question.choices[0] + ':* ' + results[1][6][0] + ' | *' + info.customization.question.choices[1] + ':* ' + results[1][6][1] + ' | *' + info.customization.question.choices[2] + ':* ' + results[1][6][2] + ' | *' + info.customization.question.choices[3] + ':* ' + '\n'
                                                        },
                                                        {
                                                            title: 'Overall',
                                                            color: '#02FF57',
                                                            attachment_type: 'default',
                                                            text: 'Logs Completed: ' + results[2] + '\n' + results[0][7]
                                                        }
                                                    ]
                                                });
                                            } else {
                                                bot.say({
                                                    text: 'Hey there! Here is you organization\'s monthly report...\n',
                                                    attachments: [
                                                        {
                                                            title: 'Sleep',
                                                            color: '#02D2FF',
                                                            attachment_type: 'default',
                                                            text: results[0][0] + '\n*Perfect:* ' + results[1][0][0] + ' | *Sufficient:* ' + results[1][0][1] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Energy',
                                                            color: '#2A02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][1] + '\n*Full:* ' + results[1][1][0] + ' | *Alright:* ' + results[1][1][1] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Mood',
                                                            color: '#8A02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][2] + '\n*Ecstatic:* ' + results[1][2][0] + ' | *Positive:* ' + results[1][2][1] + ' | *Indifferent:* ' + results[1][2][2] + ' | *Miserable:* ' + results[1][2][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Confidence',
                                                            color: '#CF02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][3] + '\n*Crushing It:* ' + results[1][3][0] + ' | *Okay:* ' + results[1][3][1] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Efficiency',
                                                            color: '#FF029D',
                                                            attachment_type: 'default',
                                                            text: results[0][4] + '\n*Overdrive:* ' + results[1][4][0] + ' | *Normal:* ' + results[1][4][1] + ' | *Slow:* ' + results[1][4][2] + ' | *Dragging:* ' + results[1][4][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Fulfillment',
                                                            color: '#FF8402',
                                                            attachment_type: 'default',
                                                            text: results[0][5] + '\n*Complete:* ' + results[1][5][0] + ' | *Present:* ' + results[1][5][1] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Overall',
                                                            color: '#02FF57',
                                                            attachment_type: 'default',
                                                            text: 'Logs Completed: ' + results[2] + '\n' + results[0][6]
                                                        }
                                                    ],
                                                    channel: team.channel
                                                });
                                            }
                                        } else {
                                            if (results[0].length == 9) {
                                                if (typeof all_teams[i].customization.question == 'undefined') {
                                                    var topic = "Deleted Custom Topic"
                                                } else {
                                                    var topic = all_teams[i].customization.question.topic;
                                                }
                                                bot.say({
                                                    text: 'Hey there! Here is your organization\'s monthly report...\n',
                                                    attachments: [
                                                        {
                                                            title: 'Sleep',
                                                            color: '#02D2FF',
                                                            attachment_type: 'default',
                                                            text: results[0][1] + '\n'
                                                        },
                                                        {
                                                            title: 'Energy',
                                                            color: '#2A02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][2] + '\n'
                                                        },
                                                        {
                                                            title: 'Mood',
                                                            color: '#8A02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Confidence',
                                                            color: '#CF02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][4] + '\n'
                                                        },
                                                        {
                                                            title: 'Efficiency',
                                                            color: '#FF029D',
                                                            attachment_type: 'default',
                                                            text: results[0][5] + '\n'
                                                        },
                                                        {
                                                            title: 'Fulfillment',
                                                            color: '#FF8402',
                                                            attachment_type: 'default',
                                                            text: results[0][6] + '\n'
                                                        },
                                                        {
                                                            title: topic,
                                                            color: '#02FF92',
                                                            attachment_type: 'default',
                                                            text: results[0][7] + '\n'
                                                        },
                                                        {
                                                            title: 'Overall',
                                                            color: '#02FF57',
                                                            attachment_type: 'default',
                                                            text: results[0][8]
                                                        }
                                                    ],
                                                    channel: team.channel
                                                });
                                            } else {
                                                bot.say({
                                                    text: 'Hey there! Here is your organization\'s monthly report...\n',
                                                    attachments: [
                                                        {
                                                            title: 'Sleep',
                                                            color: '#02D2FF',
                                                            attachment_type: 'default',
                                                            text: results[0][1] + '\n'
                                                        },
                                                        {
                                                            title: 'Energy',
                                                            color: '#2A02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][2] + '\n'
                                                        },
                                                        {
                                                            title: 'Mood',
                                                            color: '#8A02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][3] + '\n'
                                                        },
                                                        {
                                                            title: 'Confidence',
                                                            color: '#CF02FF',
                                                            attachment_type: 'default',
                                                            text: results[0][4] + '\n'
                                                        },
                                                        {
                                                            title: 'Efficiency',
                                                            color: '#FF029D',
                                                            attachment_type: 'default',
                                                            text: results[0][5] + '\n'
                                                        },
                                                        {
                                                            title: 'Fulfillment',
                                                            color: '#FF8402',
                                                            attachment_type: 'default',
                                                            text: results[0][6] + '\n'
                                                        },
                                                        {
                                                            title: 'Overall',
                                                            color: '#02FF57',
                                                            attachment_type: 'default',
                                                            text: results[0][7]
                                                        }
                                                    ],
                                                    channel: team.channel
                                                });
                                            }
                                        }
                                    }
                                } else if (d == '5') {
                                    // Weekly report
                                    if (!info) {
                                        bot.say({
                                            'text': 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                            'channel': team.channel
                                        });
                                    } else {
                                        var results = getWeeklyOutput(info, all_teams[i].status);
                                        if (results == 404) {
                                            bot.say({
                                                'text': 'Sorry, I need at least a day\'s worth of logs to report this - Maybe check back tomorrow? :thinking_face:\n\nIn the meantime you can check your daily results with `Daily Results`\nIf this is unusual behavior from me, email support@getinternal.co for help!',
                                                'channel': team.channel
                                            });
                                        } else {
                                            if (all_teams[i].status == 'top') {
                                                if (results[0].length == 9) {
                                                    if (typeof all_teams[i].customization.question == 'undefined') {
                                                        var topic = "Deleted Custom Topic"
                                                    } else {
                                                        var topic = all_teams[i].customization.question.topic;
                                                    }
                                                    bot.say({
                                                        text: 'Hey there! Here are your weekly organization averages...\n',
                                                        channel: team.channel,
                                                        attachments: [
                                                            {
                                                                title: 'Sleep',
                                                                color: '#02D2FF',
                                                                attachment_type: 'default',
                                                                text: results[0][0] + '\n*Perfect:* ' + results[1][0][0] + ' | *Sufficient:* ' + results[1][0][1] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Energy',
                                                                color: '#2A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][1] + '\n*Full:* ' + results[1][1][0] + ' | *Alright:* ' + results[1][1][1] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Mood',
                                                                color: '#8A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][2] + '\n*Ecstatic:* ' + results[1][2][0] + ' | *Positive:* ' + results[1][2][1] + ' | *Indifferent:* ' + results[1][2][2] + ' | *Miserable:* ' + results[1][2][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Confidence',
                                                                color: '#CF02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][3] + '\n*Crushing It:* ' + results[1][3][0] + ' | *Okay:* ' + results[1][3][1] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Efficiency',
                                                                color: '#FF029D',
                                                                attachment_type: 'default',
                                                                text: results[0][4] + '\n*Overdrive:* ' + results[1][4][0] + ' | *Normal:* ' + results[1][4][1] + ' | *Slow:* ' + results[1][4][2] + ' | *Dragging:* ' + results[1][4][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Fulfillment',
                                                                color: '#FF8402',
                                                                attachment_type: 'default',
                                                                text: results[0][5] + '\n*Complete:* ' + results[1][5][0] + ' | *Present:* ' + results[1][5][1] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][3] + '\n'
                                                            },
                                                            {
                                                                title: topic,
                                                                color: '#FDFF02',
                                                                attachment_type: 'default',
                                                                text: results[0][6] + '\n*' + info.customization.question.choices[0] + ':* ' + results[1][6][0] + ' | *' + info.customization.question.choices[1] + ':* ' + results[1][6][1] + ' | *' + info.customization.question.choices[2] + ':* ' + results[1][6][2] + ' | *' + info.customization.question.choices[3] + ':* ' + '\n'
                                                            },
                                                            {
                                                                title: 'Overall',
                                                                color: '#02FF57',
                                                                attachment_type: 'default',
                                                                text: 'Logs Completed: ' + results[2] + '\n' + results[0][7]
                                                            }
                                                        ]
                                                    });
                                                } else {
                                                    bot.say({
                                                        text: 'Hey there! Here are your weekly organization averages...\n',
                                                        channel: team.channel,
                                                        attachments: [
                                                            {
                                                                title: 'Sleep',
                                                                color: '#02D2FF',
                                                                attachment_type: 'default',
                                                                text: results[0][0] + '\n*Perfect:* ' + results[1][0][0] + ' | *Sufficient:* ' + results[1][0][1] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Energy',
                                                                color: '#2A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][1] + '\n*Full:* ' + results[1][1][0] + ' | *Alright:* ' + results[1][1][1] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Mood',
                                                                color: '#8A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][2] + '\n*Ecstatic:* ' + results[1][2][0] + ' | *Positive:* ' + results[1][2][1] + ' | *Indifferent:* ' + results[1][2][2] + ' | *Miserable:* ' + results[1][2][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Confidence',
                                                                color: '#CF02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][3] + '\n*Crushing It:* ' + results[1][3][0] + ' | *Okay:* ' + results[1][3][1] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Efficiency',
                                                                color: '#FF029D',
                                                                attachment_type: 'default',
                                                                text: results[0][4] + '\n*Overdrive:* ' + results[1][4][0] + ' | *Normal:* ' + results[1][4][1] + ' | *Slow:* ' + results[1][4][2] + ' | *Dragging:* ' + results[1][4][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Fulfillment',
                                                                color: '#FF8402',
                                                                attachment_type: 'default',
                                                                text: results[0][5] + '\n*Complete:* ' + results[1][5][0] + ' | *Present:* ' + results[1][5][1] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Overall',
                                                                color: '#02FF57',
                                                                attachment_type: 'default',
                                                                text: 'Logs Completed: ' + results[2] + '\n' + results[0][6]
                                                            }
                                                        ]
                                                    });
                                                }
                                            } else {
                                                if (results[0].length == 9) {
                                                    if (typeof all_teams[i].customization.question == 'undefined') {
                                                        var topic = "Deleted Custom Topic"
                                                    } else {
                                                        var topic = all_teams[i].customization.question.topic;
                                                    }
                                                    bot.say({
                                                        text: 'Hey there! Here are your weekly organization averages...\n',
                                                        attachments: [
                                                            {
                                                                title: 'Sleep',
                                                                color: '#02D2FF',
                                                                attachment_type: 'default',
                                                                text: results[0][1] + '\n'
                                                            },
                                                            {
                                                                title: 'Energy',
                                                                color: '#2A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][2] + '\n'
                                                            },
                                                            {
                                                                title: 'Mood',
                                                                color: '#8A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Confidence',
                                                                color: '#CF02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][4] + '\n'
                                                            },
                                                            {
                                                                title: 'Efficiency',
                                                                color: '#FF029D',
                                                                attachment_type: 'default',
                                                                text: results[0][5] + '\n'
                                                            },
                                                            {
                                                                title: 'Fulfillment',
                                                                color: '#FF8402',
                                                                attachment_type: 'default',
                                                                text: results[0][6] + '\n'
                                                            },
                                                            {
                                                                title: topic,
                                                                color: '#02FF92',
                                                                attachment_type: 'default',
                                                                text: results[0][7] + '\n'
                                                            },
                                                            {
                                                                title: 'Overall',
                                                                color: '#02FF57',
                                                                attachment_type: 'default',
                                                                text: results[0][8]
                                                            }
                                                        ],
                                                        channel: team.channel
                                                    });
                                                } else {
                                                    bot.say({
                                                        text: 'Hey there! Here are your weekly organization averages...\n',
                                                        attachments: [
                                                            {
                                                                title: 'Sleep',
                                                                color: '#02D2FF',
                                                                attachment_type: 'default',
                                                                text: results[0][1] + '\n'
                                                            },
                                                            {
                                                                title: 'Energy',
                                                                color: '#2A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][2] + '\n'
                                                            },
                                                            {
                                                                title: 'Mood',
                                                                color: '#8A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Confidence',
                                                                color: '#CF02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][4] + '\n'
                                                            },
                                                            {
                                                                title: 'Efficiency',
                                                                color: '#FF029D',
                                                                attachment_type: 'default',
                                                                text: results[0][5] + '\n'
                                                            },
                                                            {
                                                                title: 'Fulfillment',
                                                                color: '#FF8402',
                                                                attachment_type: 'default',
                                                                text: results[0][6] + '\n'
                                                            },
                                                            {
                                                                title: 'Overall',
                                                                color: '#02FF57',
                                                                attachment_type: 'default',
                                                                text: results[0][7]
                                                            }
                                                        ],
                                                        channel: team.channel
                                                    });
                                                }
                                            }
                                        }
                                    }
                                } else if (d > 0 && d < 5) {
                                    // Daily report
                                    if (!info) {
                                        bot.say({
                                            'text': 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!',
                                            'channel': team.channel
                                        });
                                    } else {
                                        var results = getDailyOutput(info, all_teams[i].status);
                                        if (percent == 404) {
                                            bot.say({
                                                'text': 'I don\'t have any results to report!\n\nI need at least one team member to do both their logs in order to properly report today\'s results\n\nIf I\'m wrong, email support@getinternal.co for help!',
                                                'channel': team.channel
                                            });
                                        } else {
                                            if (all_teams[i].status == 'top') {
                                                if (results[0].length == 9) {
                                                    if (typeof all_teams[i].customization.question == 'undefined') {
                                                        var topic = "Deleted Custom Topic"
                                                    } else {
                                                        var topic = all_teams[i].customization.question.topic;
                                                    }

                                                    bot.say({
                                                        text: 'Hey there! Here are your team results for the day...\n',
                                                        channel: team.channel,
                                                        attachments: [
                                                            {
                                                                title: 'Sleep',
                                                                color: '#02D2FF',
                                                                attachment_type: 'default',
                                                                text: results[0][0] + '\n*Perfect:* ' + results[1][0][0] + ' | *Sufficient:* ' + results[1][0][1] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Energy',
                                                                color: '#2A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][1] + '\n*Full:* ' + results[1][1][0] + ' | *Alright:* ' + results[1][1][1] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Mood',
                                                                color: '#8A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][2] + '\n*Ecstatic:* ' + results[1][2][0] + ' | *Positive:* ' + results[1][2][1] + ' | *Indifferent:* ' + results[1][2][2] + ' | *Miserable:* ' + results[1][2][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Confidence',
                                                                color: '#CF02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][3] + '\n*Crushing It:* ' + results[1][3][0] + ' | *Okay:* ' + results[1][3][1] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Efficiency',
                                                                color: '#FF029D',
                                                                attachment_type: 'default',
                                                                text: results[0][4] + '\n*Overdrive:* ' + results[1][4][0] + ' | *Normal:* ' + results[1][4][1] + ' | *Slow:* ' + results[1][4][2] + ' | *Dragging:* ' + results[1][4][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Fulfillment',
                                                                color: '#FF8402',
                                                                attachment_type: 'default',
                                                                text: results[0][5] + '\n*Complete:* ' + results[1][5][0] + ' | *Present:* ' + results[1][5][1] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][3] + '\n'
                                                            },
                                                            {
                                                                title: topic,
                                                                color: '#FDFF02',
                                                                attachment_type: 'default',
                                                                text: results[0][6] + '\n*' + info.customization.question.choices[0] + ':* ' + results[1][6][0] + ' | *' + info.customization.question.choices[1] + ':* ' + results[1][6][1] + ' | *' + info.customization.question.choices[2] + ':* ' + results[1][6][2] + ' | *' + info.customization.question.choices[3] + ':* ' + '\n'
                                                            },
                                                            {
                                                                title: 'Overall',
                                                                color: '#02FF57',
                                                                attachment_type: 'default',
                                                                text: 'Logs Completed: ' + Object.keys(input[0].logs[today]).length + '\n' + results[0][7]
                                                            }
                                                        ]
                                                    });
                                                } else {
                                                    bot.say({
                                                        text: 'Hey there! Here are your team results for the day...\n',
                                                        channel: team.channel,
                                                        attachments: [
                                                            {
                                                                title: 'Sleep',
                                                                color: '#02D2FF',
                                                                attachment_type: 'default',
                                                                text: results[0][0] + '\n*Perfect:* ' + results[1][0][0] + ' | *Sufficient:* ' + results[1][0][1] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Energy',
                                                                color: '#2A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][1] + '\n*Full:* ' + results[1][1][0] + ' | *Alright:* ' + results[1][1][1] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Mood',
                                                                color: '#8A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][2] + '\n*Ecstatic:* ' + results[1][2][0] + ' | *Positive:* ' + results[1][2][1] + ' | *Indifferent:* ' + results[1][2][2] + ' | *Miserable:* ' + results[1][2][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Confidence',
                                                                color: '#CF02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][3] + '\n*Crushing It:* ' + results[1][3][0] + ' | *Okay:* ' + results[1][3][1] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Efficiency',
                                                                color: '#FF029D',
                                                                attachment_type: 'default',
                                                                text: results[0][4] + '\n*Overdrive:* ' + results[1][4][0] + ' | *Normal:* ' + results[1][4][1] + ' | *Slow:* ' + results[1][4][2] + ' | *Dragging:* ' + results[1][4][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Fulfillment',
                                                                color: '#FF8402',
                                                                attachment_type: 'default',
                                                                text: results[0][5] + '\n*Complete:* ' + results[1][5][0] + ' | *Present:* ' + results[1][5][1] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Overall',
                                                                color: '#02FF57',
                                                                attachment_type: 'default',
                                                                text: 'Logs Completed: ' + Object.keys(input[0].logs[today]).length + '\n' + results[0][6]
                                                            }
                                                        ]
                                                    });
                                                }
                                            } else {
                                                if (results[0].length == 9) {
                                                    if (typeof all_teams[i].customization.question == 'undefined') {
                                                        var topic = "Deleted Custom Topic"
                                                    } else {
                                                        var topic = all_teams[i].customization.question.topic;
                                                    }

                                                    bot.say({
                                                        text: 'Hey there! Here are your results for the day...\n',
                                                        attachments: [
                                                            {
                                                                title: 'Sleep',
                                                                color: '#02D2FF',
                                                                attachment_type: 'default',
                                                                text: results[0][0] + '\n'
                                                            },
                                                            {
                                                                title: 'Energy',
                                                                color: '#2A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][1] + '\n'
                                                            },
                                                            {
                                                                title: 'Mood',
                                                                color: '#8A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][2] + '\n'
                                                            },
                                                            {
                                                                title: 'Confidence',
                                                                color: '#CF02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Efficiency',
                                                                color: '#FF029D',
                                                                attachment_type: 'default',
                                                                text: results[0][4] + '\n'
                                                            },
                                                            {
                                                                title: 'Fulfillment',
                                                                color: '#FF8402',
                                                                attachment_type: 'default',
                                                                text: results[0][5] + '\n'
                                                            },
                                                            {
                                                                title: topic,
                                                                color: '#02FF92',
                                                                attachment_type: 'default',
                                                                text: results[0][6] + '\n',
                                                            },
                                                            {
                                                                title: 'Overall',
                                                                color: '#02FF57',
                                                                attachment_type: 'default',
                                                                text: results[0][7]
                                                            }
                                                        ],
                                                        channel: team.channel
                                                    });
                                                } else {
                                                    bot.say({
                                                        text: 'Hey there! Here are your results for the day...\n',
                                                        attachments: [
                                                            {
                                                                title: 'Sleep',
                                                                color: '#02D2FF',
                                                                attachment_type: 'default',
                                                                text: results[0][0] + '\n'
                                                            },
                                                            {
                                                                title: 'Energy',
                                                                color: '#2A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][1] + '\n'
                                                            },
                                                            {
                                                                title: 'Mood',
                                                                color: '#8A02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][2] + '\n'
                                                            },
                                                            {
                                                                title: 'Confidence',
                                                                color: '#CF02FF',
                                                                attachment_type: 'default',
                                                                text: results[0][3] + '\n'
                                                            },
                                                            {
                                                                title: 'Efficiency',
                                                                color: '#FF029D',
                                                                attachment_type: 'default',
                                                                text: results[0][4] + '\n'
                                                            },
                                                            {
                                                                title: 'Fulfillment',
                                                                color: '#FF8402',
                                                                attachment_type: 'default',
                                                                text: results[0][5] + '\n'
                                                            },
                                                            {
                                                                title: 'Overall',
                                                                color: '#02FF57',
                                                                attachment_type: 'default',
                                                                text: results[0][6]
                                                            }
                                                        ],
                                                        channel: team.channel
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            })
                        })
                    } else {
                        // Pass
                    }
                }
            } else {
                // Pass
            }
        }
    });
}

function getWeeklyOutput(results, status) {
    const moment = require('moment');
    var startOfWeek = moment().startOf('isoWeek');
    var endOfWeek = moment().endOf('isoWeek');

    var day = startOfWeek;

    var days = [];
    while (day <= endOfWeek) {
        days.push(day.format('L'));
        day = day.clone().add(1, 'd');
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var efficiencyCount = [];
    var fulfillmentCount = [];
    var customCount = [];
    var overallCount = [];

    for (var i = 0; i < results.length; i++) {
        var instance = results[i];
        for (var j = 0; j < days.length; j++) {
            if (days[j] in instance.logs) {
                if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = results.logs[days[j]].check_in;
                    var checkOut = results.logs[days[j]].check_out;

                    sleepCount.push(checkIn[0]);
                    energyCount.push(checkIn[1]);
                    moodCount.push(checkIn[2]);
                    confidenceCount.push(checkIn[3]);
                    if (checkIn.length == 6) {
                        customCount.push(checkIn[4]);
                        overallCount.push(checkIn[5] / 5);
                    } else {
                        overallCount.push(checkIn[4] / 4);
                    }

                    efficiencyCount.push(checkOut[0]);
                    confidenceCount.push(checkOut[1]);
                    moodCount.push(checkOut[2]);
                    fulfillmentCount.push(checkOut[3]);
                    if (checkOut.length == 6) {
                        customCount.push(checkOut[4]);
                        overallCount.push(checkOut[5] / 5);
                    } else {
                        overallCount.push(checkOut[4] / 4);
                    }
                }
            }
        }
    }

    if (customCount.length > 0) {
        var countArray = [sleepCount, moodCount, confidenceCount, efficiencyCount, fulfillmentCount, customCount];

        var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var efficiency = (efficiencyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var custom = (customCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);

        var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom];
        var inDepthArray = [];
        for (val in countArray) {
            inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
        }

        var weeklyReport = [];
        weeklyReport.push(sleep);
        for (var z = 0; z < loopArray.length; z++) {
            if (loopArray[z] > 50) {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                weeklyReport.push(message);
            } else {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                weeklyReport.push(message);
            }
        }

        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
            weeklyReport.push(overallWeek);
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
            weeklyReport.push(overallWeek);
        }

        if (status == 'top') {
            var returnArray = [analysisOutcome, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];
        } else {
            var returnArray = [analysisOutcome];
        }
        return returnArray;

    } else if (customCount.length == 0) {
        var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var efficiency = (efficiencyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);

        var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment];

        var countArray = [sleepCount, moodCount, confidenceCount, efficiencyCount, fulfillmentCount];
        var inDepthArray = [];
        for (val in countArray) {
            inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
        }

        var weeklyReport = [];
        for (var z = 0; z < loopArray.length; z++) {
            if (loopArray[z] > 50) {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                weeklyReport.push(message);
            } else {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                weeklyReport.push(message);
            }
        }

        if (overall > 50) {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
            weeklyReport.push(overallWeek);
        }
        else {
            var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
            weeklyReport.push(overallWeek);
        }

        if (status == 'top') {
            var returnArray = [analysisOutcome, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];
        } else {
            var returnArray = [analysisOutcome];
        }
        return returnArray;
    } else {
        return 404;
    }
}

function getDailyOutput(input, status) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    if (input[0].logs[today].check_in.length == 6) {
        // Necessary variables
        var sleepCount = [];
        var energyCount = [];
        var moodCount = [];
        var confidenceCount = [];
        var efficiencyCount = [];
        var fulfillmentCount = [];
        var customCount = [];
        var overallCount = [];

        for (var i = 0; i < input.length; i++) {
            var instance = input[i];
            if (typeof instance.logs[today] == 'undefined') {
                var errorArray = [404]
            } else {
                var checkIn = instance.logs[today].check_in;
                var checkOut = instance.logs[today].check_out;

                if (typeof checkIn == 'undefined' || typeof checkOut == 'undefined') {
                    var errorArray = [404];
                } else {
                    sleepCount.push(checkIn[0]);
                    energyCount.push(checkIn[1]);
                    moodCount.push(checkIn[2]);
                    confidenceCount.push(checkIn[3]);
                    customCount.push(checkIn[4]);
                    overallCount.push(checkIn[5] / 5);

                    efficiencyCount.push(checkOut[0]);
                    confidenceCount.push(checkOut[1]);
                    moodCount.push(checkOut[2]);
                    fulfillmentCount.push(checkOut[3]);
                    customCount.push(checkOut[4]);
                    overallCount.push(checkOut[5] / 5);
                }
            }

        }



        if (customCount.length > 0) {
            var countArray = [sleepCount, moodCount, confidenceCount, efficiencyCount, fulfillmentCount, customCount];

            var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var efficiency = (efficiencyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var custom = (customCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);

            var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom];
            var inDepthArray = [];
            for (val in countArray) {
                inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
            }

            var weeklyReport = [];
            weeklyReport.push(sleep);
            for (var z = 0; z < loopArray.length; z++) {
                if (loopArray[z] > 50) {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                    weeklyReport.push(message);
                } else {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                    weeklyReport.push(message);
                }
            }

            if (overall > 50) {
                var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
                weeklyReport.push(overallWeek);
            }
            else {
                var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
                weeklyReport.push(overallWeek);
            }

            if (status == 'top') {
                var returnArray = [analysisOutcome, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];
            } else {
                var returnArray = [analysisOutcome];
            }
            return returnArray;

        } else if (customCount.length == 0) {
            var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var efficiency = (efficiencyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
            var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);

            var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment];

            var countArray = [sleepCount, moodCount, confidenceCount, efficiencyCount, fulfillmentCount];
            var inDepthArray = [];
            for (val in countArray) {
                inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
            }

            var dailyReport = [];
            for (var z = 0; z < loopArray.length; z++) {
                if (loopArray[z] > 50) {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                    dailyReport.push(message);
                } else {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                    dailyReport.push(message);
                }
            }

            if (overall > 50) {
                var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *positive*!';
                dailyReport.push(overallWeek);
            }
            else {
                var overallWeek = 'Score: *' + overall + '%*\nThe overall emotional fitness this week was *negative*';
                dailyReport.push(overallWeek);
            }

            if (status == 'top') {
                var returnArray = [analysisOutcome, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];
            } else {
                var returnArray = [analysisOutcome];
            }
            return returnArray;
        } else {
            return 404;
        }
    }
}

function getMonthlyOutput(results, status) {
    var moment = require('moment');
    var startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
    var endOfMonth = moment().endOf('month').format('DD-MM-YYYY');

    var day = startOfMonth;

    var days = [];
    while (day <= endOfMonth) {
        days.push(day.format('L'));
        day = day.clone().add(1, 'd');
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var efficiencyCount = [];
    var fulfillmentCount = [];
    var customCount = [];
    var overallCount = [];

    for (var i = 0; i < results.length; i++) {
        var instance = results[i];
        for (var j = 0; j < days.length; j++) {
            if (days[j] in instance.logs) {
                if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = results.logs[days[j]].check_in;
                    var checkOut = results.logs[days[j]].check_out;

                    sleepCount.push(checkIn[0]);
                    energyCount.push(checkIn[1]);
                    moodCount.push(checkIn[2]);
                    confidenceCount.push(checkIn[3]);
                    if (checkIn.length == 6) {
                        customCount.push(checkIn[4]);
                        overallCount.push(checkIn[5] / 5);
                    } else {
                        overallCount.push(checkIn[4] / 4);
                    }

                    efficiencyCount.push(checkOut[0]);
                    confidenceCount.push(checkOut[1]);
                    moodCount.push(checkOut[2]);
                    fulfillmentCount.push(checkOut[3]);
                    if (checkOut.length == 6) {
                        customCount.push(checkOut[4]);
                        overallCount.push(checkOut[5] / 5);
                    } else {
                        overallCount.push(checkOut[4] / 4);
                    }
                }
            }
        }
    }

    if (customCount.length > 0) {
        var countArray = [sleepCount, moodCount, confidenceCount, efficiencyCount, fulfillmentCount, customCount];

        var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var efficiency = (efficiencyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var custom = (customCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);

        var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment, custom];
        var inDepthArray = [];
        for (val in countArray) {
            inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
        }

        var monthlyReport = [];
        for (var z = 0; z < loopArray.length; z++) {
            if (loopArray[z] > 50) {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                monthlyReport.push(message);
            } else {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                monthlyReport.push(message);
            }
        }

        if (overall > 50) {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *positive*!';
            monthlyReport.push(overallMonth);
        }
        else {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *negative*';
            monthlyReport.push(overallMonth);
        }

        if (status == 'top') {
            var returnArray = [analysisOutcome, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];
        } else {
            var returnArray = [analysisOutcome];
        }

        return returnArray;

    } else if (customCount.length == 0) {
        var sleep = (sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var energy = (energyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var mood = (moodCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var confidence = (confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var efficiency = (efficiencyCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var fulfillment = (fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);
        var overall = (overallCount.reduce(function (a, b) { return a + b; }, 0) * 25).toFixed(2);

        var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment];

        var countArray = [sleepCount, moodCount, confidenceCount, efficiencyCount, fulfillmentCount];
        var inDepthArray = [];
        for (val in countArray) {
            inDepthArray.push(val.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {}))
        }

        var monthlyReport = [];
        monthlyReport.push(sleep);
        for (var z = 0; z < loopArray.length; z++) {
            if (loopArray[z] > 50) {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                monthlyReport.push(message);
            } else {
                var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                monthlyReport.push(message);
            }
        }

        if (overall > 50) {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *positive*!';
            monthlyReport.push(overallMonth);
        }
        else {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness this month was *negative*';
            monthlyReport.push(overallMonth);
        }

        if (status == 'top') {
            var returnArray = [analysisOutcome, inDepthArray, ((sleepCount.length + efficiencyCount) / 2)];
        } else {
            var returnArray = [analysisOutcome];
        }
        return returnArray;
    } else {
        return 404;
    }
}
