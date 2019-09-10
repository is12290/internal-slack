module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == "Customize-Team_reports") {
            controller.storage.users.get(message.user, function (error, user) {
                if (error) {
                    console.log("error: ", err);
                }
                if (!user || typeof user.customization == 'undefined' || typeof user.customization.team_reporting == 'undefined') {
                    bot.startConversation(message, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                            bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                        }
                        const data = {};

                        convo.say("Hey! Let's get your automatic team reports all set up...");

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
                                    title: 'Report Time',
                                    text: 'What time would be best for sending the team reports?',
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
                                                    "text": "00:00",
                                                    "value": "00:00"
                                                },
                                                {
                                                    "text": "00:30",
                                                    "value": "00:30"
                                                },
                                                {
                                                    "text": "01:00",
                                                    "value": "01:00"
                                                },
                                                {
                                                    "text": "01:30",
                                                    "value": "01:30"
                                                },
                                                {
                                                    "text": "02:00",
                                                    "value": "02:00"
                                                },
                                                {
                                                    "text": "02:30",
                                                    "value": "02:30"
                                                },
                                                {
                                                    "text": "03:00",
                                                    "value": "03:00"
                                                },
                                                {
                                                    "text": "03:30",
                                                    "value": "03:30"
                                                },
                                                {
                                                    "text": "04:00",
                                                    "value": "04:00"
                                                },
                                                {
                                                    "text": "04:30",
                                                    "value": "04:30"
                                                },
                                                {
                                                    "text": "05:00",
                                                    "value": "05:00"
                                                },
                                                {
                                                    "text": "05:30",
                                                    "value": "05:30"
                                                },
                                                {
                                                    "text": "06:00",
                                                    "value": "06:00"
                                                },
                                                {
                                                    "text": "06:30",
                                                    "value": "06:30"
                                                },
                                                {
                                                    "text": "07:00",
                                                    "value": "07:00"
                                                },
                                                {
                                                    "text": "07:30",
                                                    "value": "07:30"
                                                },
                                                {
                                                    "text": "08:00",
                                                    "value": "08:00"
                                                },
                                                {
                                                    "text": "08:30",
                                                    "value": "08:30"
                                                },
                                                {
                                                    "text": "09:00",
                                                    "value": "09:00"
                                                },
                                                {
                                                    "text": "09:30",
                                                    "value": "09:30"
                                                },
                                                {
                                                    "text": "10:00",
                                                    "value": "10:00"
                                                },
                                                {
                                                    "text": "10:30",
                                                    "value": "10:30"
                                                },
                                                {
                                                    "text": "11:00",
                                                    "value": "11:00"
                                                },
                                                {
                                                    "text": "11:30",
                                                    "value": "11:30"
                                                },
                                                {
                                                    "text": "12:00",
                                                    "value": "12:00"
                                                },
                                                {
                                                    "text": "12:30",
                                                    "value": "12:30"
                                                },
                                                {
                                                    "text": "13:00",
                                                    "value": "13:00"
                                                },
                                                {
                                                    "text": "13:30",
                                                    "value": "13:30"
                                                },
                                                {
                                                    "text": "14:00",
                                                    "value": "14:00"
                                                },
                                                {
                                                    "text": "14:30",
                                                    "value": "14:30"
                                                },
                                                {
                                                    "text": "15:00",
                                                    "value": "15:00"
                                                },
                                                {
                                                    "text": "15:30",
                                                    "value": "15:30"
                                                },
                                                {
                                                    "text": "16:00",
                                                    "value": "16:00"
                                                },
                                                {
                                                    "text": "16:30",
                                                    "value": "16:30"
                                                },
                                                {
                                                    "text": "17:00",
                                                    "value": "17:00"
                                                },
                                                {
                                                    "text": "17:30",
                                                    "value": "17:30"
                                                },
                                                {
                                                    "text": "18:00",
                                                    "value": "18:00"
                                                },
                                                {
                                                    "text": "18:30",
                                                    "value": "18:30"
                                                },
                                                {
                                                    "text": "19:00",
                                                    "value": "19:00"
                                                },
                                                {
                                                    "text": "19:30",
                                                    "value": "19:30"
                                                },
                                                {
                                                    "text": "20:00",
                                                    "value": "20:00"
                                                },
                                                {
                                                    "text": "20:30",
                                                    "value": "20:30"
                                                },
                                                {
                                                    "text": "21:00",
                                                    "value": "21:00"
                                                },
                                                {
                                                    "text": "21:30",
                                                    "value": "21:30"
                                                },
                                                {
                                                    "text": "22:00",
                                                    "value": "22:00"
                                                },
                                                {
                                                    "text": "22:30",
                                                    "value": "22:30"
                                                },
                                                {
                                                    "text": "23:00",
                                                    "value": "23:00"
                                                },
                                                {
                                                    "text": "23:30",
                                                    "value": "23:30"
                                                },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }, function (reply, convo) {
                            var time = reply.text;
                            data.time = time;
                            convo.next();
                        });

                        convo.activate();

                        convo.on('end', function (convo) {
                            if (convo.successful()) {

                                bot.reply(message, "You got it! I will send team reports on weekdays at " + data.time);

                                if (!user.customization) {
                                    user.customization = {
                                        team_reporting: {
                                            timezone: data.timezone,
                                            time: data.time
                                        }
                                    }
                                    controller.storage.users.save(user);
                                } else {
                                    user.customization.team_reporting = {
                                        timezone: data.timezone,
                                        time: data.time
                                    };
                                    controller.storage.users.save(user);
                                }
                            } else {
                                bot.reply(message, "Whoops! I wasn't able to save this. Would you mind trying again?");
                            }
                        });
                    });
                } else if (typeof user.customization != 'undefined' && typeof user.customization.team_reporting != 'undefined') {
                    bot.startConversation(message, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                            bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                        }
                        convo.addQuestion({
                            attachments: [{
                                text: "Team reports are already set to be automatically sent on weekdays at " + user.customization.team_reporting.time + ", " + user.customization.team_reporting.timezone + " time!\nWould you like to change this?",
                                callback_id: 'team-reports-check',
                                color: "#0294ff",
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
                            }]
                        },
                            [
                                {
                                    pattern: 'Yes',
                                    callback: function (reply, convo) {
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [{
                                                    text: "Team reports are already set to be automatically sent on weekdays at " + user.customization.team_reporting.time + ", " + user.customization.team_reporting.timezone + " time!\nWould you like to change this?",
                                                    callback_id: 'team-reports-check',
                                                    color: "#0294ff",
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
                                                }]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'No',
                                    callback: function (reply, convo) {
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [{
                                                    text: "Team reports are already set to be automatically sent on weekdays at " + user.customization.team_reporting.time + ", " + user.customization.team_reporting.timezone + " time!\nWould you like to change this?",
                                                    callback_id: 'team-reports-check',
                                                    color: "#0294ff",
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
                                                }]
                                            }
                                        );
                                        bot.reply(message, "Well, okay then... Enjoy the rest of your day! :sunglasses:");
                                        convo.stop();
                                    }
                                }
                            ]);

                        const data = {};

                        convo.say("Okay, let's reset your preferences...");

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
                                                    "text": "America/New York",
                                                    "value": "America/New_York"
                                                },
                                                {
                                                    "text": "America/Los Angeles",
                                                    "value": "America/Los_Angeles",
                                                },
                                                {
                                                    "text": "America/Denver",
                                                    "value": "America/Denver",
                                                },
                                                {
                                                    "text": "Australia/Sydney",
                                                    "value": "Australia/Sydney",
                                                },
                                                {
                                                    "text": "Australia/Perth",
                                                    "value": "Australia/Perth",
                                                },
                                                {
                                                    "text": "Asia/Hong Kong",
                                                    "value": "Asia/Hong_Kong",
                                                },
                                                {
                                                    "text": "Asia/Seoul",
                                                    "value": "Asia/Seoul",
                                                },
                                                {
                                                    "text": "Europe/London",
                                                    "value": "Europe/London",
                                                },
                                                {
                                                    "text": "Europe/Madrid",
                                                    "value": "Europe/Madrid",
                                                },
                                                {
                                                    "text": "Europe/Kiev",
                                                    "value": "Europe/Kiev",
                                                },
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
                                    title: 'Report Time',
                                    text: 'What time would be best for sending reports?',
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
                                                    "text": "00:00",
                                                    "value": "00:00"
                                                },
                                                {
                                                    "text": "00:30",
                                                    "value": "00:30"
                                                },
                                                {
                                                    "text": "01:00",
                                                    "value": "01:00"
                                                },
                                                {
                                                    "text": "01:30",
                                                    "value": "01:30"
                                                },
                                                {
                                                    "text": "02:00",
                                                    "value": "02:00"
                                                },
                                                {
                                                    "text": "02:30",
                                                    "value": "02:30"
                                                },
                                                {
                                                    "text": "03:00",
                                                    "value": "03:00"
                                                },
                                                {
                                                    "text": "03:30",
                                                    "value": "03:30"
                                                },
                                                {
                                                    "text": "04:00",
                                                    "value": "04:00"
                                                },
                                                {
                                                    "text": "04:30",
                                                    "value": "04:30"
                                                },
                                                {
                                                    "text": "05:00",
                                                    "value": "05:00"
                                                },
                                                {
                                                    "text": "05:30",
                                                    "value": "05:30"
                                                },
                                                {
                                                    "text": "06:00",
                                                    "value": "06:00"
                                                },
                                                {
                                                    "text": "06:30",
                                                    "value": "06:30"
                                                },
                                                {
                                                    "text": "07:00",
                                                    "value": "07:00"
                                                },
                                                {
                                                    "text": "07:30",
                                                    "value": "07:30"
                                                },
                                                {
                                                    "text": "08:00",
                                                    "value": "08:00"
                                                },
                                                {
                                                    "text": "08:30",
                                                    "value": "08:30"
                                                },
                                                {
                                                    "text": "09:00",
                                                    "value": "09:00"
                                                },
                                                {
                                                    "text": "09:30",
                                                    "value": "09:30"
                                                },
                                                {
                                                    "text": "10:00",
                                                    "value": "10:00"
                                                },
                                                {
                                                    "text": "10:30",
                                                    "value": "10:30"
                                                },
                                                {
                                                    "text": "11:00",
                                                    "value": "11:00"
                                                },
                                                {
                                                    "text": "11:30",
                                                    "value": "11:30"
                                                },
                                                {
                                                    "text": "12:00",
                                                    "value": "12:00"
                                                },
                                                {
                                                    "text": "12:30",
                                                    "value": "12:30"
                                                },
                                                {
                                                    "text": "13:00",
                                                    "value": "13:00"
                                                },
                                                {
                                                    "text": "13:30",
                                                    "value": "13:30"
                                                },
                                                {
                                                    "text": "14:00",
                                                    "value": "14:00"
                                                },
                                                {
                                                    "text": "14:30",
                                                    "value": "14:30"
                                                },
                                                {
                                                    "text": "15:00",
                                                    "value": "15:00"
                                                },
                                                {
                                                    "text": "15:30",
                                                    "value": "15:30"
                                                },
                                                {
                                                    "text": "16:00",
                                                    "value": "16:00"
                                                },
                                                {
                                                    "text": "16:30",
                                                    "value": "16:30"
                                                },
                                                {
                                                    "text": "17:00",
                                                    "value": "17:00"
                                                },
                                                {
                                                    "text": "17:30",
                                                    "value": "17:30"
                                                },
                                                {
                                                    "text": "18:00",
                                                    "value": "18:00"
                                                },
                                                {
                                                    "text": "18:30",
                                                    "value": "18:30"
                                                },
                                                {
                                                    "text": "19:00",
                                                    "value": "19:00"
                                                },
                                                {
                                                    "text": "19:30",
                                                    "value": "19:30"
                                                },
                                                {
                                                    "text": "20:00",
                                                    "value": "20:00"
                                                },
                                                {
                                                    "text": "20:30",
                                                    "value": "20:30"
                                                },
                                                {
                                                    "text": "21:00",
                                                    "value": "21:00"
                                                },
                                                {
                                                    "text": "21:30",
                                                    "value": "21:30"
                                                },
                                                {
                                                    "text": "22:00",
                                                    "value": "22:00"
                                                },
                                                {
                                                    "text": "22:30",
                                                    "value": "22:30"
                                                },
                                                {
                                                    "text": "23:00",
                                                    "value": "23:00"
                                                },
                                                {
                                                    "text": "23:30",
                                                    "value": "23:30"
                                                },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }, function (reply, convo) {
                            var time = reply.text;
                            data.time = time;
                            convo.next();
                        });

                        convo.activate();

                        convo.on('end', function (convo) {
                            if (convo.successful()) {

                                bot.reply(message, "Count on it! I will send team reports on weekdays at " + data.time);

                                user.customization.team_reporting = {
                                    timezone: data.timezone,
                                    time: data.time,
                                };
                                controller.storage.users.save(user);

                            }
                        });
                    });
                } else {
                    bot.reply(message, "Could you actually try sending me that message again?");
                }
            })
        }
    })
}