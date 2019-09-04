module.exports = function (controller) {
    controller.hears(['^set up logs', '^set Up Logs', '^custom logs', '^customize logs', '^set up log', '^custom log', '^customize log', '^set up check up', '^set Up Check Up', '^custom check up', '^customize Check Up', '^customize Check Ups', '^customize check ups', '^set up check up', '^custom Check Up', '^customize check up'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.users.get(message.user, function (error, user) {
            if (error) {
                console.log("error: ", err);
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
                                text: "Hey! This is the first time we're meeting!! Can I ask two quick questions so that I can properly add you to my memory?",
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
                                                    text: "Hey! This is the first time we're meeting!! Can I ask two quick questions so that I can properly add you to my memory?",
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
                                                    text: "Hey! This is the first time we're meeting!! Can I ask two quick questions so that I can properly add you to my memory?",
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
                        convo.next();
                    }, 'default');

                    convo.addQuestion("What's your role here?", function (response, convo) {
                        newUser.role = response.text;
                        convo.next();
                    }, 'default');

                    convo.say("Thanks for that!\n\nNow, what was it you were looking to do?");

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            if (typeof newUser.name != 'undefined') {
                                controller.storage.users.save(newUser);
                            }
                        }

                    })
                })

            }

            else {
                if (!user || typeof user.customization == 'undefined' || typeof user.customization.logging == 'undefined') {
                    bot.startConversation(message, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                            bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                        }
                        var data = {};

                        convo.say("Hey! Let's get your automatic reporting all set up...");

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
                                                "text": 'Time',
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
                                var reflection_time = reply.text;
                                data.reflection_time = reflection_time;
                                convo.next();
                            });

                            convo.activate();

                            convo.on('end', function (convo) {
                                if (convo.successful()) {

                                    bot.reply(message, "Roger that! I will send check in logs on weekdays at " + data.check_in_time + " and reflections on weekdays at " + data.reflection_time);

                                    if (!user.customization) {
                                        user.customization = {
                                            logging: {
                                                timezone: data.timezone,
                                                check_in_time: data.check_in_time,
                                                reflection_time: data.reflection_time,
                                                channel: message.channel
                                            }
                                        }
                                        controller.storage.users.save(user);
                                    } else {
                                        user.customization.logging = {
                                            timezone: data.timezone,
                                            check_in_time: data.check_in_time,
                                            reflection_time: data.reflection_time,
                                            channel: message.channel
                                        };
                                        controller.storage.users.save(user);
                                    }
                                } else {
                                    bot.reply(message, "Whoops! I wasn't able to save this. Would you mind trying again?");
                                }
                            });
                        });
                    }
                    else if (typeof user.customization != 'undefined' && typeof user.customization.logging != 'undefined') {
                        bot.startConversation(message, function (err, convo) {
                            if (err) {
                                console.log("error: ", err);
                                bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                            }
                            convo.addQuestion({
                                attachments: [{
                                    text: "Your logs are already set to be automatically sent at " + user.customization.logging.check_in_time + " and " + user.customization.logging.reflection_time + ", " + user.customization.logging.timezone + " time!\nWould you like to change this?",
                                    callback_id: 'automatic-logs-check',
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
                                                        text: "Your logs are already set to be automatically sent at " + user.customization.logging.check_in_time + " and " + user.customization.logging.reflection_time + ", " + user.customization.logging.timezone + " time!\nWould you like to change this?",
                                                        callback_id: 'automatic-logs-check',
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
                                                        text: "Your logs are already set to be automatically sent at " + user.customization.logging.check_in_time + " and " + user.customization.logging.reflection_time + ", " + user.customization.logging.timezone + " time!\nWould you like to change this?",
                                                        callback_id: 'automatic-logs-check',
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

                            var data = {};

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
                                var timezone = reply.text
                                data.timezone = timezone;
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
                                var check_in_time = reply.text;
                                data.check_in_time = check_in_time;
                                convo.next();
                            });

                            convo.addQuestion({
                                attachments: [
                                    {
                                        title: 'Reflection Time',
                                        text: 'What time would be best for reflections?',
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
                                var reflection_time = reply.text;
                                data.reflection_time = reflection_time;
                                convo.next();
                            });

                            convo.activate();

                            convo.on('end', function (convo) {
                                if (convo.successful()) {

                                    bot.reply(message, "Roger that! I will send check in logs on weekdays at " + data.check_in_time + " and reflections on weekdays at " + data.reflection_time);

                                    user.customization.logging = {
                                        timezone: data.timezone,
                                        check_in_time: data.check_in_time,
                                        reflection_time: data.reflection_time
                                    };
                                    controller.storage.users.save(user);

                                } else {
                                    // Pass
                                }
                            });

                        });
                    } else {
                        bot.reply(message, "Let's give that another shot");
                    }
            }
        })
    })
}