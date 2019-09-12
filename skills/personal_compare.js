module.exports = function (controller) {
    controller.hears(['^compare', '^comparison'], 'direct_message', function (bot, message) {
        controller.storage.users.get(message.user, function (error, user) {
            if (error) {
                bot.whisper(message, "Ah! I'm a bit popular right now. Could you say that again? I missed it");
            }
            if (!user || typeof user == 'undefined') {
                bot.startConversation(message, function (err, convo) {
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
                                    check_in_time = data.check_in_time,
                                    reflection_time = data.reflection_time
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
                bot.startConversation(message, function (err, convo) {
                    if (err) {
                        console.log('error: ', err);
                    }
                    convo.say('I need a bit more information to compute the comparison...');

                    var startTimeframe = [];
                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Current',
                                text: 'You want to compare...',
                                callback_id: 'current',
                                attachment_type: 'default',
                                color: "#0294ff",
                                actions: [
                                    {
                                        "name": "Current",
                                        "text": "Current",
                                        "type": "select",
                                        "options": [
                                            {
                                                "text": "Today",
                                                "value": "Today"
                                            },
                                            {
                                                "text": "This Week",
                                                "value": "Week"
                                            },
                                            {
                                                "text": "This Month",
                                                "value": "Month"
                                            },
                                            {
                                                "text": "This Year",
                                                "value": "Year"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, [
                            {
                                pattern: "Today",
                                callback: function (reply, convo) {
                                    startTimeframe.push(1);
                                    convo.next();
                                }
                            },
                            {
                                pattern: "Week",
                                callback: function (reply, convo) {
                                    startTimeframe.push(2);
                                    convo.next();
                                }
                            },
                            {
                                pattern: "Month",
                                callback: function (reply, convo) {
                                    startTimeframe.push(3);
                                    convo.next();
                                }
                            },
                            {
                                pattern: "Year",
                                callback: function (reply, convo) {
                                    startTimeframe.push(4);;
                                    convo.next();
                                }
                            }
                        ]);

                    // Custom Input
                    var endTimeframe = [];
                    // convo.addQuestion({
                    //     text: 'Custom Timeframe',
                    //     blocks: [
                    //         {
                    //             "type": "section",
                    //             "block_id": "section1234",
                    //             "text": {
                    //                 "type": "mrkdwn",
                    //                 "text": "Would you be so kind as to select your custom timeframe?"
                    //             }
                    //         },
                    //         {
                    //             "type": "actions",
                    //             "elements": [
                    //                 {
                    //                     "type": "datepicker",
                    //                     "placeholder": {
                    //                         "type": "plain_text",
                    //                         "text": "Start Date",
                    //                         "emoji": true
                    //                     }
                    //                 },
                    //                 {
                    //                     "type": "datepicker",
                    //                     "placeholder": {
                    //                         "type": "plain_text",
                    //                         "text": "End Date",
                    //                         "emoji": true
                    //                     }
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // }, function (response, convo) {
                    //     endTimeframe.push(response.actions[0].selected_date);

                    //     if (endTimeframe.length == 2) {
                    //         convo.next();
                    //     } else {
                    //         convo.silentRepeat();
                    //     }
                    // }, 'custom');

                    convo.addQuestion({
                        attachments: [
                            {
                                title: 'Past',
                                text: 'Against...',
                                callback_id: 'past',
                                attachment_type: 'default',
                                color: "#0294ff",
                                actions: [
                                    {
                                        "name": "Past",
                                        "text": "Past",
                                        "type": "select",
                                        "options": [
                                            {
                                                "text": "Yesterday",
                                                "value": "Yesterday"
                                            },
                                            {
                                                "text": "Last Week",
                                                "value": "Week"
                                            },
                                            {
                                                "text": "Last Month",
                                                "value": "Month"
                                            },
                                            {
                                                "text": "Last Year",
                                                "value": "Year"
                                            },
                                            {
                                                "text": "All Time",
                                                "value": "All"
                                            },
                                            // {
                                            //     "text": "Custom",
                                            //     "value": "Custom"
                                            // },
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, [
                            {
                                pattern: "Yesterday",
                                callback: function (reply, convo) {
                                    endTimeframe.push(1);
                                    convo.next();
                                }
                            },
                            {
                                pattern: "Week",
                                callback: function (reply, convo) {
                                    endTimeframe.push(2);
                                    convo.next();
                                }
                            },
                            {
                                pattern: "Month",
                                callback: function (reply, convo) {
                                    endTimeframe.push(3);
                                    convo.next();
                                }
                            },
                            {
                                pattern: "Year",
                                callback: function (reply, convo) {
                                    endTimeframe.push(4);;
                                    convo.next();
                                }
                            },
                            // {
                            //     pattern: "Custom",
                            //     callback: function (reply, convo) {
                            //         convo.addMessage({
                            //             text: 'Please pick the dates you would like to compare against',
                            //             action: 'custom'
                            //         });
                            //         endTimeframe.push(5);
                            //         convo.next();
                            //     }
                            // },
                        ]);

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            var results = getPersonalComparisonOutput(user, startTimeframe, endTimeframe);
                            if (results == 404) {
                                bot.reply(message, "Hmm... I checked my records and you don't seem to have info dating back that far");
                            } else {
                                bot.reply(message, {
                                    text: 'Here is *' + results[2][0] + '* compared to *' + results[2][1] + '*\n',
                                    attachments: [
                                        {
                                            title: results[2][0],
                                            color: '#02D2FF',
                                            attachment_type: 'default',
                                            text: 'Score: *' + results[0] + '%*' + '\n'
                                        },
                                        {
                                            title: results[2][1],
                                            color: '#2A02FF',
                                            attachment_type: 'default',
                                            text: 'Score: *' + results[1] + '%*' + '\n'
                                        },
                                        {
                                            title: 'Comparison',
                                            color: '#8A02FF',
                                            attachment_type: 'default',
                                            text: 'There has been a *' + ((results[0] - results[1]) / results[1]) * 100 + '%* change in emotional health'
                                        }
                                    ]
                                });
                            }
                        }
                    })
                })

            }
        })
    })
}

function getPersonalComparisonOutput(results, start, end) {
    var moment = require('moment');

    var timeframeMessage = [];
    var currentDays = [];
    // Get current timeframe
    if (start[0] == 1) {
        currentDays.push(moment().format('MM/DD/YYY'));
        timeframeMessage.push('Today');
    } else if (start[0] == 2) {
        var startOfWeek = moment().startOf('isoWeek');
        var endOfWeek = moment().endOf('isoWeek');

        while (startOfWeek <= endOfWeek) {
            currentDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('This Week');
    } else if (start[0] == 3) {
        var startOfMonth = moment().startOf('month');
        var endOfMonth = moment().endOf('month');

        while (startOfMonth <= endOfMonth) {
            currentDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('This Month');
    } else if (start[0] == 4) {
        var startOfYear = moment().startOf('year');
        var today = moment();

        while (startOfYear <= today) {
            currentDays.push(startOfYear.format('L'));
            startOfYear = startOfYear.clone().add(1, 'd');
        }
        timeframeMessage.push('This Year');
    }

    // Get past timeframe
    var pastDays = [];
    if (end[0] == 1) {
        pastDays.push(moment().subtract(1, 'd').format('MM/DD/YYY'));
        timeframeMessage.push('Yesterday');
    } else if (end[0] == 2) {
        var startOfWeek = moment().startOf('isoWeek').subtract(7, 'd');
        var endOfWeek = moment().endOf('isoWeek').subtract(7, 'd');

        while (startOfWeek <= endOfWeek) {
            pastDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('Last Week');
    } else if (end[0] == 3) {
        var startOfMonth = moment().startOf('month').subtract(1, 'months');
        var endOfMonth = moment().endOf('month').subtract(1, 'months');

        while (startOfMonth <= endOfMonth) {
            pastDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('Last Month');
    } else if (end[0] == 4) {
        var startOfYear = moment().startOf('year').subtract(1, 'year');
        var endOfYear = moment().endOf('year').subtract(1, 'year');

        while (startOfYear <= endOfYear) {
            pastDays.push(startOfYear.format('L'));
            startOfYear = startOfYear.clone().add(1, 'd');
        }
        timeframeMessage.push('Last Year');
    } else if (end[0] == 5) {
        var customStart = end[1];
        var customEnd = end[2];

        while (customStart <= customEnd) {
            pastDays.push(customStart.format('L'));
            customStart = customStart.clone().add(1, 'd');
        }
        timeframeMessage.push('*' + pastDays[0] + '-' + pastDays[pastDays.length - 1] + '*');
    }

    // Tallys
    var currentCount = [];
    var pastCount = [];

    for (var j = 0; j < currentDays.length; j++) {
        if (currentDays[j] in results.logs) {
            if (typeof results.logs[currentDays[j]].check_in == 'undefined' || results.logs[currentDays[j]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[currentDays[j]].check_in;
                var checkOut = results.logs[currentDays[j]].check_out;

                currentCount.push(checkIn[4] / 4);

                currentCount.push(checkOut[4] / 4);
            }
        }
    }

    for (var y = 0; y < pastDays.length; y++) {
        if (pastDays[y] in results.logs) {
            if (typeof results.logs[pastDays[y]].check_in == 'undefined' || results.logs[pastDays[y]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[pastDays[y]].check_in;
                var checkOut = results.logs[pastDays[y]].check_out;

                pastCount.push(checkIn[4] / 4);

                pastCount.push(checkOut[4] / 4);
            }
        }
    }

    if (currentCount.length > 0) {
        var currentScore = ((currentCount.reduce(function (a, b) { return a + b; }, 0) * 25) / currentCount.length).toFixed(2);
        currentScore = Math.round(currentScore);
    } else {
        return 404;
    }

    if (pastCount.length > 0) {
        var pastScore = ((pastCount.reduce(function (a, b) { return a + b; }, 0) * 25) / pastCount.length).toFixed(2);
        pastScore = Math.round(pastScore);
    } else {
        return 404;
    }


    return [currentScore, pastScore, timeframeMessage];
}