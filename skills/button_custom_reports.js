module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == "Customize-Reports") {
            controller.storage.users.get(message.user, function (error, user) {
                if (error) {
                    console.log("error: ", err);
                }
                if (!user || typeof user.customization == 'undefined' || typeof user.customization.reporting == 'undefined') {
                    bot.startConversation(message, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                            bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                        }
                        const data = {};

                        convo.say("Hey! Let's get your automatic personal reporting all set up...");

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
                            var time = reply.text;
                            data.time = time;
                            convo.next();
                        });

                        convo.activate();

                        convo.on('end', function (convo) {
                            if (convo.successful()) {

                                bot.reply(message, "Count on it! I will send personal reports on Fridays at " + data.time);

                                if (!user.customization) {
                                    user.customization = {
                                        reporting: {
                                            timezone: data.timezone,
                                            time: data.time
                                        }
                                    }
                                    controller.storage.users.save(user);
                                } else {
                                    user.customization.reporting = {
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
                } else if (typeof user.customization != 'undefined' && typeof user.customization.reporting != 'undefined') {
                    bot.startConversation(message, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                            bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                        }
                        convo.addQuestion({
                            attachments: [{
                                text: "Your personal reports are already set to be automatically sent on Fridays at " + user.customization.reporting.time + ", " + user.customization.logging.timezone + " time!\nWould you like to change this?",
                                callback_id: 'personal-reports-check',
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
                                                    text: "Your personal reports are already set to be automatically sent on Fridays at " + user.customization.reporting.time + ", " + user.customization.logging.timezone + " time!\nWould you like to change this?",
                                                    callback_id: 'personal-reports-check',
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
                                                    text: "Your personal reports are already set to be automatically sent on Fridays at " + user.customization.reporting.time + ", " + user.customization.logging.timezone + " time!\nWould you like to change this?",
                                                    callback_id: 'personal-reports-check',
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
                            var time = reply.text;
                            data.time = time;
                            convo.next();
                        });

                        convo.activate();

                        convo.on('end', function (convo) {
                            if (convo.successful()) {

                                bot.reply(message, "Count on it! I will send personal reports on Fridays at " + data.time);

                                user.customization.reporting = {
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