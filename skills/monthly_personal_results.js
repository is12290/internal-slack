module.exports = function (controller) {
    controller.hears(['^monthly result', '^monthly results', '^monthly Results', '^monthly Result', '^monthly report', '^monthly Report', '^monthly Report'], 'direct_message', function (bot, message) {
        controller.storage.users.get(message.user, function (error, user) {
            if (error) {
                console.log("error: ", error);
                bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
            }
            if (!user || typeof user == 'undefined') {
                bot.startPrivateConversation({ user: message.user }, function (err, convo) {
                    if (err) {
                        console.log("error: ", err);
                        bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                    }
                    const newUser = {};

                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'new-user',
                                color: "#0294ff",
                                text: "This is the first time we're meeting!! Would you mind telling me a bit about yourself?",
                                attachment_type: 'default',
                                actions: [
                                    {
                                        'name': 'yes-button',
                                        'value': 'Yes',
                                        'text': 'Yes',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'no-button',
                                        'value': 'No',
                                        'text': 'No',
                                        'type': 'button'
                                    }
                                ]
                            }
                        ]
                    }, [
                            {
                                pattern: 'Yes',
                                callback: function (reply, convo) {
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'new-user',
                                                    color: "#0294ff",
                                                    text: "This is the first time we're meeting!! Would you mind telling me a bit about yourself?",
                                                    attachment_type: 'default',
                                                    actions: [
                                                        {
                                                            'name': 'yes-button',
                                                            'value': 'Yes',
                                                            'style': 'primary',
                                                            'text': 'Yes',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'no-button',
                                                            'value': 'No',
                                                            'text': 'No',
                                                            'type': 'button'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    )
                                    convo.next()
                                }
                            },
                            {
                                pattern: 'No',
                                callback: function (reply, convo) {
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'new-user',
                                                    color: "#0294ff",
                                                    text: "This is the first time we're meeting!! Would you mind telling me a bit about yourself?",
                                                    attachment_type: 'default',
                                                    actions: [
                                                        {
                                                            'name': 'yes-button',
                                                            'value': 'Yes',
                                                            'text': 'Yes',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'no-button',
                                                            'value': 'No',
                                                            'style': 'danger',
                                                            'text': 'No',
                                                            'type': 'button'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    bot.reply(message, "Better luck next time, I suppose! Sadly, you won't really be able to use my features until you're in my memory :zipper_mouth_face:");
                                    convo.stop();
                                }
                            }
                        ]
                    );

                    convo.addQuestion("What's your favorite book?", function (response, convo) {
                        bot.api.users.info({ user: response.user }, (error, response) => {
                            if (error) {
                                console.log("error: ", error);
                            }
                            let { name, real_name } = response.user;
                            newUser.name = real_name;
                            newUser.email = response.user.profile.email;
                        })
                        newUser.channel = message.channel;
                        newUser.team = message.team;
                        newUser.status = 'employee';
                        newUser.id = message.user;
                        newUser.token = bot.config.token;
                        convo.next();
                    }, 'default');

                    convo.addQuestion("What's your role here?", function (response, convo) {
                        newUser.role = response.text;
                        convo.next();
                    }, 'default');

                    convo.say("The most important part of having me around is completing your daily questionnaires because, without your questionnaires filled out, nothing else matters! It's sometimes difficult to remember to carry them out, so let's set up a time for me to send them automatically everyday...");

                    var data = {};
                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Timezone',
                                text: 'What timezone are you in?',
                                callback_id: 'timezone',
                                attachment_type: 'default',
                                color: "#0294ff",
                                actions: [
                                    {
                                        "name": "timezone",
                                        "text": "Timezone",
                                        "type": "select",
                                        "options": [
                                            {
                                                "text": "America Eastern Time",
                                                "value": "America/New_York"
                                            },
                                            {
                                                "text": "America Central Time",
                                                "value": "America/Mexico_City",
                                            },
                                            {
                                                "text": "America Mountain Time",
                                                "value": "America/Denver",
                                            },
                                            {
                                                "text": "America Pacific Time",
                                                "value": "America/Los_Angeles",
                                            },
                                            {
                                                "text": "Australia Eastern Time",
                                                "value": "Australia/Sydney",
                                            },
                                            {
                                                "text": "Australia Western Time",
                                                "value": "Australia/Perth",
                                            },
                                            {
                                                "text": "Hong Kong Time",
                                                "value": "Asia/Hong_Kong",
                                            },
                                            {
                                                "text": "Korea Time",
                                                "value": "Asia/Seoul",
                                            },
                                            {
                                                "text": "Europe British Time",
                                                "value": "Europe/London",
                                            },
                                            {
                                                "text": "Central European Time",
                                                "value": "Europe/Madrid",
                                            },
                                            {
                                                "text": "Eastern European Time",
                                                "value": "Europe/Kiev",
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, function (reply, convo) {
                        data.timezone = reply.text;
                        convo.next();
                    });

                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Check In Time',
                                text: 'What time would be best for check ins?',
                                callback_id: 'time',
                                attachment_type: 'default',
                                color: "#0294ff",
                                actions: [
                                    {
                                        "name": "time",
                                        "text": "Time",
                                        "type": "select",
                                        "options": [
                                            {
                                                "text": "12:00 am",
                                                "value": "00:00"
                                            },
                                            {
                                                "text": "12:30 am",
                                                "value": "00:30"
                                            },
                                            {
                                                "text": "1:00 am",
                                                "value": "01:00"
                                            },
                                            {
                                                "text": "1:30 am",
                                                "value": "01:30"
                                            },
                                            {
                                                "text": "2:00 am",
                                                "value": "02:00"
                                            },
                                            {
                                                "text": "2:30 am",
                                                "value": "02:30"
                                            },
                                            {
                                                "text": "3:00 am",
                                                "value": "03:00"
                                            },
                                            {
                                                "text": "3:30 am",
                                                "value": "03:30"
                                            },
                                            {
                                                "text": "4:00 am",
                                                "value": "04:00"
                                            },
                                            {
                                                "text": "4:30 am",
                                                "value": "04:30"
                                            },
                                            {
                                                "text": "5:00 am",
                                                "value": "05:00"
                                            },
                                            {
                                                "text": "5:30 am",
                                                "value": "05:30"
                                            },
                                            {
                                                "text": "6:00 am",
                                                "value": "06:00"
                                            },
                                            {
                                                "text": "6:30 am",
                                                "value": "06:30"
                                            },
                                            {
                                                "text": "7:00 am",
                                                "value": "07:00"
                                            },
                                            {
                                                "text": "7:30 am",
                                                "value": "07:30"
                                            },
                                            {
                                                "text": "8:00 am",
                                                "value": "08:00"
                                            },
                                            {
                                                "text": "8:30 am",
                                                "value": "08:30"
                                            },
                                            {
                                                "text": "9:00 am",
                                                "value": "09:00"
                                            },
                                            {
                                                "text": "9:30 am",
                                                "value": "09:30"
                                            },
                                            {
                                                "text": "10:00 am",
                                                "value": "10:00"
                                            },
                                            {
                                                "text": "10:30 am",
                                                "value": "10:30"
                                            },
                                            {
                                                "text": "11:00 am",
                                                "value": "11:00"
                                            },
                                            {
                                                "text": "11:30 am",
                                                "value": "11:30"
                                            },
                                            {
                                                "text": "12:00 pm",
                                                "value": "12:00"
                                            },
                                            {
                                                "text": "12:30 pm",
                                                "value": "12:30"
                                            },
                                            {
                                                "text": "1:00 pm",
                                                "value": "13:00"
                                            },
                                            {
                                                "text": "1:30 pm",
                                                "value": "13:30"
                                            },
                                            {
                                                "text": "2:00 pm",
                                                "value": "14:00"
                                            },
                                            {
                                                "text": "2:30 pm",
                                                "value": "14:30"
                                            },
                                            {
                                                "text": "3:00 pm",
                                                "value": "15:00"
                                            },
                                            {
                                                "text": "3:30 pm",
                                                "value": "15:30"
                                            },
                                            {
                                                "text": "4:00 pm",
                                                "value": "16:00"
                                            },
                                            {
                                                "text": "4:30 pm",
                                                "value": "16:30"
                                            },
                                            {
                                                "text": "5:00 pm",
                                                "value": "17:00"
                                            },
                                            {
                                                "text": "5:30 pm",
                                                "value": "17:30"
                                            },
                                            {
                                                "text": "6:00",
                                                "value": "18:00"
                                            },
                                            {
                                                "text": "6:30 pm",
                                                "value": "18:30"
                                            },
                                            {
                                                "text": "7:00 pm",
                                                "value": "19:00"
                                            },
                                            {
                                                "text": "7:30 pm",
                                                "value": "19:30"
                                            },
                                            {
                                                "text": "8:00 pm",
                                                "value": "20:00"
                                            },
                                            {
                                                "text": "8:30 pm",
                                                "value": "20:30"
                                            },
                                            {
                                                "text": "9:00 pm",
                                                "value": "21:00"
                                            },
                                            {
                                                "text": "9:30 pm",
                                                "value": "21:30"
                                            },
                                            {
                                                "text": "10:00 pm",
                                                "value": "22:00"
                                            },
                                            {
                                                "text": "10:30 pm",
                                                "value": "22:30"
                                            },
                                            {
                                                "text": "11:00 pm",
                                                "value": "23:00"
                                            },
                                            {
                                                "text": "11:30 pm",
                                                "value": "23:30"
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, function (reply, convo) {
                        var check_in_time = reply.text;
                        data.check_in_time = check_in_time;
                        convo.next();
                    });

                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Reflection Time',
                                text: "What time would be best for reflections?",
                                callback_id: 'time',
                                attachment_type: 'default',
                                color: "#0294ff",
                                actions: [
                                    {
                                        "name": "time",
                                        "text": "Time",
                                        "type": "select",
                                        "options": [
                                            {
                                                "text": "12:00 am",
                                                "value": "00:00"
                                            },
                                            {
                                                "text": "12:30 am",
                                                "value": "00:30"
                                            },
                                            {
                                                "text": "1:00 am",
                                                "value": "01:00"
                                            },
                                            {
                                                "text": "1:30 am",
                                                "value": "01:30"
                                            },
                                            {
                                                "text": "2:00 am",
                                                "value": "02:00"
                                            },
                                            {
                                                "text": "2:30 am",
                                                "value": "02:30"
                                            },
                                            {
                                                "text": "3:00 am",
                                                "value": "03:00"
                                            },
                                            {
                                                "text": "3:30 am",
                                                "value": "03:30"
                                            },
                                            {
                                                "text": "4:00 am",
                                                "value": "04:00"
                                            },
                                            {
                                                "text": "4:30 am",
                                                "value": "04:30"
                                            },
                                            {
                                                "text": "5:00 am",
                                                "value": "05:00"
                                            },
                                            {
                                                "text": "5:30 am",
                                                "value": "05:30"
                                            },
                                            {
                                                "text": "6:00 am",
                                                "value": "06:00"
                                            },
                                            {
                                                "text": "6:30 am",
                                                "value": "06:30"
                                            },
                                            {
                                                "text": "7:00 am",
                                                "value": "07:00"
                                            },
                                            {
                                                "text": "7:30 am",
                                                "value": "07:30"
                                            },
                                            {
                                                "text": "8:00 am",
                                                "value": "08:00"
                                            },
                                            {
                                                "text": "8:30 am",
                                                "value": "08:30"
                                            },
                                            {
                                                "text": "9:00 am",
                                                "value": "09:00"
                                            },
                                            {
                                                "text": "9:30 am",
                                                "value": "09:30"
                                            },
                                            {
                                                "text": "10:00 am",
                                                "value": "10:00"
                                            },
                                            {
                                                "text": "10:30 am",
                                                "value": "10:30"
                                            },
                                            {
                                                "text": "11:00 am",
                                                "value": "11:00"
                                            },
                                            {
                                                "text": "11:30 am",
                                                "value": "11:30"
                                            },
                                            {
                                                "text": "12:00 pm",
                                                "value": "12:00"
                                            },
                                            {
                                                "text": "12:30 pm",
                                                "value": "12:30"
                                            },
                                            {
                                                "text": "1:00 pm",
                                                "value": "13:00"
                                            },
                                            {
                                                "text": "1:30 pm",
                                                "value": "13:30"
                                            },
                                            {
                                                "text": "2:00 pm",
                                                "value": "14:00"
                                            },
                                            {
                                                "text": "2:30 pm",
                                                "value": "14:30"
                                            },
                                            {
                                                "text": "3:00 pm",
                                                "value": "15:00"
                                            },
                                            {
                                                "text": "3:30 pm",
                                                "value": "15:30"
                                            },
                                            {
                                                "text": "4:00 pm",
                                                "value": "16:00"
                                            },
                                            {
                                                "text": "4:30 pm",
                                                "value": "16:30"
                                            },
                                            {
                                                "text": "5:00 pm",
                                                "value": "17:00"
                                            },
                                            {
                                                "text": "5:30 pm",
                                                "value": "17:30"
                                            },
                                            {
                                                "text": "6:00",
                                                "value": "18:00"
                                            },
                                            {
                                                "text": "6:30 pm",
                                                "value": "18:30"
                                            },
                                            {
                                                "text": "7:00 pm",
                                                "value": "19:00"
                                            },
                                            {
                                                "text": "7:30 pm",
                                                "value": "19:30"
                                            },
                                            {
                                                "text": "8:00 pm",
                                                "value": "20:00"
                                            },
                                            {
                                                "text": "8:30 pm",
                                                "value": "20:30"
                                            },
                                            {
                                                "text": "9:00 pm",
                                                "value": "21:00"
                                            },
                                            {
                                                "text": "9:30 pm",
                                                "value": "21:30"
                                            },
                                            {
                                                "text": "10:00 pm",
                                                "value": "22:00"
                                            },
                                            {
                                                "text": "10:30 pm",
                                                "value": "22:30"
                                            },
                                            {
                                                "text": "11:00 pm",
                                                "value": "23:00"
                                            },
                                            {
                                                "text": "11:30 pm",
                                                "value": "23:30"
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, function (reply, convo) {
                        var reflection_time = reply.text;
                        data.reflection_time = reflection_time;
                        bot.api.reactions.add({
                            name: 'thumbsup',
                            channel: reply.channel,
                            timestamp: reply.ts
                        });
                        convo.next();
                    });

                    convo.say("We're all set! Thanks for humoring my shenanigans. Now the fun part...");

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            newUser.customization = {
                                logging: {
                                    timezone: data.timezone,
                                    check_in_time: data.check_in_time,
                                    reflection_time: data.reflection_time
                                }
                            }
                            controller.storage.users.save(newUser);

                            bot.say({
                                channel: convo.context.channel,
                                text: "Choose what feature you'd like to check out! You can see this message when ever you want by sending me a message saying `Help`",
                                attachments: [
                                    {
                                        title: 'Questionnaires',
                                        color: '#02D2FF',
                                        callback_id: 'questionnaire',
                                        attachment_type: 'default',
                                        text: "Record your headspace at the beginning and end of your workday",
                                        actions: [
                                            {
                                                'name': 'checkin-button',
                                                'value': 'Yes-CheckIn',
                                                'text': 'Check In',
                                                'type': 'button'
                                            },
                                            {
                                                'name': 'reflect-button',
                                                'value': 'Yes-Reflect',
                                                'text': 'Reflect',
                                                'type': 'button'
                                            }
                                        ]
                                    },
                                    {
                                        title: 'Reports',
                                        color: '#2A02FF',
                                        attachment_type: 'default',
                                        callback_id: 'report',
                                        text: "Monitor your emotional well-being overtime",
                                        actions: [
                                            {
                                                'name': 'Weekly-Report-button',
                                                'value': 'Weekly-Report',
                                                'text': 'Weekly Report',
                                                'type': 'button'
                                            },
                                            {
                                                'name': 'Monthly-Report-button',
                                                'value': 'Monthly-Report',
                                                'text': 'Monthly Report',
                                                'type': 'button'
                                            }
                                        ]
                                    },
                                    {
                                        title: 'Special Actions',
                                        color: '#8A02FF',
                                        callback_id: 'special',
                                        attachment_type: 'default',
                                        text: "Get the insights you're curious about",
                                        actions: [
                                            {
                                                'name': 'Compare-Scores-button',
                                                'value': 'Compare-Scores',
                                                'text': 'Compare Scores',
                                                'type': 'button'
                                            },
                                            {
                                                'name': 'Historic-Search-button',
                                                'value': 'Historic-Search',
                                                'text': 'Historic Search',
                                                'type': 'button'
                                            }
                                        ]
                                    },
                                    {
                                        title: 'Customizations',
                                        color: '#CF02FF',
                                        callback_id: 'custom',
                                        attachment_type: 'default',
                                        text: "Choose times to be automatically sent reports and questionnaires",
                                        actions: [
                                            {
                                                'name': 'Customize-Questionnaires-button',
                                                'value': 'Customize-Questionnaires',
                                                'text': 'Customize Questionnaires',
                                                'type': 'button'
                                            },
                                            {
                                                'name': 'Customize-Reports-button',
                                                'value': 'Customize-Reports',
                                                'text': 'Customize Reports',
                                                'type': 'button'
                                            }
                                        ]
                                    }
                                ]
                            })
                        }
                    })
                })
            } else {
                if (!user) {
                    bot.reply(message, 'Nothing to report! I don\'t seem to have any logs to report from :thinking_face:\nTry doing your `Check In` and `Check Out` logs or email support@getinternal.co for help!');
                } else {
                    results = getMonthlyOutput(user);
                    if (results == 404) {
                        bot.reply(message, 'I apologize, but I do not have anything to report - I need at least one day\'s worth of logs to report results\nIf I\'m wrong, please email support@getinternal.co for help!');
                    } else {
                        bot.reply(message, {
                            text: 'Hey there! Here is your personal monthly report. Scores are out of 100%...\n',
                            attachments: [
                                {
                                    title: 'Sleep',
                                    color: '#02D2FF',
                                    attachment_type: 'default',
                                    text: results[0][0] + '\n*Perfect:* ' + results[1][0][4] + ' | *Sufficient:* ' + results[1][0][3] + ' | *Restless:* ' + results[1][0][2] + ' | *Terrible:* ' + results[1][0][1] + '\n'
                                },
                                {
                                    title: 'Energy',
                                    color: '#2A02FF',
                                    attachment_type: 'default',
                                    text: results[0][1] + '\n*Full:* ' + results[1][1][4] + ' | *Alright:* ' + results[1][1][3] + ' | *Hanging On:* ' + results[1][1][2] + ' | *Dead:* ' + results[1][1][1] + '\n'
                                },
                                {
                                    title: 'Mood',
                                    color: '#8A02FF',
                                    attachment_type: 'default',
                                    text: results[0][2] + '\n*Happy:* ' + results[1][2][4] + ' | *Calm:* ' + results[1][2][3] + ' | *Tense:* ' + results[1][2][2] + ' | *Upset:* ' + results[1][2][1] + '\n'
                                },
                                {
                                    title: 'Confidence',
                                    color: '#CF02FF',
                                    attachment_type: 'default',
                                    text: results[0][3] + '\n*Crushing It:* ' + results[1][3][4] + ' | *Okay:* ' + results[1][3][3] + ' | *Managing:* ' + results[1][3][2] + ' | *Overwhelmed:* ' + results[1][3][1] + '\n'
                                },
                                {
                                    title: 'Presence',
                                    color: '#FF029D',
                                    attachment_type: 'default',
                                    text: results[0][4] + '\n*Grounded:* ' + results[1][4][4] + ' | *Aware:* ' + results[1][4][3] + ' | *Out of It:* ' + results[1][4][2] + ' | *Disconnected:* ' + results[1][4][1] + '\n'
                                },
                                {
                                    title: 'Fulfillment',
                                    color: '#FF8402',
                                    attachment_type: 'default',
                                    text: results[0][5] + '\n*Complete:* ' + results[1][5][4] + ' | *Present:* ' + results[1][5][3] + ' | *Searching:* ' + results[1][5][2] + ' | *Non-Existent:* ' + results[1][5][1] + '\n'
                                },
                                {
                                    title: 'Overall',
                                    color: '#02FF57',
                                    attachment_type: 'default',
                                    text: results[0][6]
                                }
                            ]
                        });
                    }
                }
            }
        })
    });
}

function getMonthlyOutput(results) {
    var moment = require('moment');
    var startOfMonth = moment().startOf('month');
    var endOfMonth = moment().endOf('month');

    var day = startOfMonth;

    var days = [];
    while (day <= endOfMonth) {
        days.push(day.format('L'));
        day = day.clone().add(1, 'd');
    }

    var startOfLastMonth = startOfMonth.subtract(1, 'months');
    var endOfLastMonth = endOfMonth.subtract(1, 'months');

    var lastMonthDay = startOfLastMonth;

    var lastMonthDays = [];
    while (lastMonthDay <= endOfLastMonth) {
        lastMonthDays.push(lastMonthDay.format('L'));
        lastMonthDay = lastMonthDay.clone().add(1, 'd');
    }

    var sleepCount = [];
    var energyCount = [];
    var moodCount = [];
    var confidenceCount = [];
    var presenceCount = [];
    var fulfillmentCount = [];
    var overallCount = [];

    var lastMonthCount = [];

    for (var a = 0; a < days.length; a++) {
        if (days[a] in results.logs) {
            if (typeof results.logs[days[a]].check_in == 'undefined' || typeof results.logs[days[a]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[days[a]].check_in;
                var checkOut = results.logs[days[a]].check_out;

                sleepCount.push(checkIn[0]);
                energyCount.push(checkIn[1]);
                moodCount.push(checkIn[2]);
                confidenceCount.push(checkIn[3]);
                overallCount.push(checkIn[4] / 4);

                presenceCount.push(checkOut[0]);
                energyCount.push(checkOut[1]);
                moodCount.push(checkOut[2]);
                fulfillmentCount.push(checkOut[3]);
                overallCount.push(checkOut[4] / 4);

            }
        }
    }

    for (var k = 0; k < lastMonthDays.length; k++) {
        if (lastMonthDays[k] in results.logs) {
            if (typeof results.logs[lastMonthDays[k]].check_in == 'undefined' || results.logs[lastMonthDays[k]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[lastMonthDays[k]].check_in;
                var checkOut = results.logs[lastMonthDays[k]].check_out;

                lastMonthCount.push(checkIn[4] / 4);

                lastMonthCount.push(checkOut[4] / 4);

            }
        }
    }

    if (overallCount.length > 0) {
        var sleep = ((sleepCount.reduce(function (a, b) { return a + b; }, 0) * 25) / sleepCount.length).toFixed(2);
        var energy = ((energyCount.reduce(function (a, b) { return a + b; }, 0) * 25) / energyCount.length).toFixed(2);
        var mood = ((moodCount.reduce(function (a, b) { return a + b; }, 0) * 25) / moodCount.length).toFixed(2);
        var confidence = ((confidenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / confidenceCount.length).toFixed(2);
        var presence = ((presenceCount.reduce(function (a, b) { return a + b; }, 0) * 25) / presenceCount.length).toFixed(2);
        var fulfillment = ((fulfillmentCount.reduce(function (a, b) { return a + b; }, 0) * 25) / fulfillmentCount.length).toFixed(2);
        var overall = ((overallCount.reduce(function (a, b) { return a + b; }, 0) * 25) / overallCount.length).toFixed(2);
        overall = Math.round(overall);

        var countArray = [sleepCount, energyCount, moodCount, confidenceCount, presenceCount, fulfillmentCount];
        var inDepthArray = [];
        for (var i = 0; i < countArray.length; i++) {
            var insight = countArray[i];
            var map = { '1': 0, '2': 0, '3': 0, '4': 0 }
            for (var x = 0; x < insight.length; x++) {
                map[insight[x]] = map[insight[x]] + 1
            }
            inDepthArray.push(map);
        }

        var analysisOutcome = [];
        var analysisArray = [sleep, energy, mood, confidence, presence, fulfillment];
        for (var a = 0; a < analysisArray.length; a++) {
            var analysisInstance = Math.round(analysisArray[a]);
            if (analysisArray[a] < 50) {
                var message = 'Score: *' + analysisInstance + '%*\nAverage: *Positive*';
                analysisOutcome.push(message);
            } else {
                var message = 'Score: *' + analysisInstance + '%*\nAverage: *Negative*';
                analysisOutcome.push(message);
            }
        }

        if (lastMonthCount.length > 0) {
            var lastMonth = ((lastMonthCount.reduce(function (a, b) { return a + b; }, 0) * 25) / lastMonthCount.length).toFixed(2);
        }

        if (overall < 50) {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this month was *negative*';
            if (!lastMonth || typeof lastMonth == 'undefined' || lastMonth == 0) {
                overallAnalysis = overallAnalysis +'\nNo logs last month to compare against :rowboat:';
            } else if (overall > lastMonth) {
                var difference = overall - lastMonth;
                overallAnalysis = overallAnalysis + '\This month is up ' + difference + '% compared to last week';
            } else if (overall < lastMonth) {
                var difference = overall - lastMonth;
                overallAnalysis = overallAnalysis + '\This month is down ' + difference + '% compared to last week';
            }
            analysisOutcome.push(overallAnalysis);
        } else {
            var overallAnalysis = 'Score: ' + overall + '%\nYour overall emotional fitness this month was *positive*!';
            if (!lastMonth || typeof lastMonth == 'undefined' || lastMonth == 0) {
                overallAnalysis = overallAnalysis +'\nNo logs last month to compare against :rowboat:';
            } else if (overall > lastMonth) {
                var difference = overall - lastMonth;
                overallAnalysis = overallAnalysis + '\This month is up ' + difference + '% compared to last week';
            } else if (overall < lastMonth) {
                var difference = overall - lastMonth;
                overallAnalysis = overallAnalysis + '\This month is down ' + difference + '% compared to last week';
            }
            analysisOutcome.push(overallAnalysis);
        }

        var returnArray = [analysisOutcome, inDepthArray];

        return returnArray;
    } else {
        return 404;
    }
}