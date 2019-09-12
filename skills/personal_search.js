module.exports = function (controller) {
    controller.hears(['^historic search', '^historic Search', '^historical search', '^historical Search', '^search'], 'direct_message', function (bot, message) {
        controller.storage.users.get(message.user, function (error, user) {
            if (error) {
                bot.whisper(message, "Ah! I'm a bit popular right now. Could you say that again? I missed it");
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
            }

            else {
                bot.startConversation(message, function (err, convo) {
                    if (err) {
                        console.log("error: ", err);
                        bot.whisper(message, "I'm so sorry! I completely missed what you said - Could you try again?");
                    }
                    var dates = [];
                    convo.addQuestion({
                        text: 'Search Timeframe',
                        color: "#0294ff",
                        blocks: [
                            {
                                "type": "section",
                                "block_id": "section1234",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "Choose the date range you'd like to see"
                                }
                            },
                            {
                                "type": "actions",
                                "elements": [
                                    {
                                        "type": "datepicker",
                                        "placeholder": {
                                            "type": "plain_text",
                                            "text": "Start Date",
                                            "emoji": true
                                        }
                                    },
                                    {
                                        "type": "datepicker",
                                        "placeholder": {
                                            "type": "plain_text",
                                            "text": "End Date",
                                            "emoji": true
                                        }
                                    }
                                ]
                            }
                        ]
                    }, function (response, convo) {
                        dates.push(response.actions[0].selected_date);
                        if (dates.length == 2) {
                            bot.reply(message, "One moment, computing the results...");
                            convo.next();
                        } else {
                            convo.silentRepeat();
                        }
                    });

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            var results = getPersonalSearchOutput(user, dates);

                            if (results == 404) {
                                bot.reply(message, "Results weren't able to be computed... Are you sure you selected the correct dates?")
                            } else {
                                bot.reply(message, {
                                    text: 'Hey there! Here are your personal search results...\n',
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
                                            title: 'Efficiency',
                                            color: '#FF029D',
                                            attachment_type: 'default',
                                            text: results[0][4] + '\n*Overdrive:* ' + results[1][4][4] + ' | *Normal:* ' + results[1][4][3] + ' | *Slow:* ' + results[1][4][2] + ' | *Dragging:* ' + results[1][4][1] + '\n'
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
                    })
                });
            }
        })
    })
}

function getPersonalSearchOutput(results, dates) {
    var moment = require('moment');
    var startOfMonth = moment(dates[0]);
    var endOfMonth = moment(dates[1]);

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
    var presenceCount = [];
    var fulfillmentCount = [];
    var overallCount = [];

    for (var j = 0; j < days.length; j++) {
        if (days[j] in results.logs) {
            if (typeof results.logs[days[j]].check_in == 'undefined' || results.logs[days[j]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[days[j]].check_in;
                var checkOut = results.logs[days[j]].check_out;

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

        var loopArray = [sleep, energy, mood, confidence, presence, fulfillment];

        var searchReport = [];
        for (var z = 0; z < loopArray.length; z++) {
            var loopInstance = Math.round(loopArray[z]);
            if (loopInstance > 50) {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Positive*';
                searchReport.push(message);
            } else {
                var message = 'Score: *' + loopInstance + '%*\nAverage: *Negative*';
                searchReport.push(message);
            }
        }

        var lastDay = days.length-1
        if (overall > 50) {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness between *' + days[0] + '* and *' + days[lastDay] + '* was *positive*!';
            searchReport.push(overallMonth);
        }
        else {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness between *' + days[0] + '* and *' + days[lastDay] + '* was *negative*';
            searchReport.push(overallMonth);
        }

        return [searchReport, inDepthArray];

    } else {
        return 404;
    }
}