module.exports = function (controller) {
    controller.on('slash_command', function (bot, message) {
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
                                text: "Hey! This is the first time we're meeting!! Would you mind if I ask two quick questions so I can properly add you to my memory?",
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
                                                    text: "Hey! This is the first time we're meeting!! Would you mind if I ask two quick questions so I can properly add you to my memory?",
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
                                                    text: "Hey! This is the first time we're meeting!! Would you mind if I ask two quick questions so I can properly add you to my memory?",
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
                                    bot.reply(message, "Better luck next time, I suppose! Sadly, you won't really be able to use my features until you're in my memory :zipper-mouth-face:");
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
                    switch (message.command) {

                        // COMPARISONS
                        case '/compare':
                            if (message.text[0] == 'personal' || message.text[0] == 'Personal') {
                                if (err) {
                                    if (err) {
                                        console.log('error: ', err);
                                    }
                                    bot.replyPrivate(message, 'I am sorry - I do not have enough information to compute this comparison');
                                }
                                bot.startPrivateConversation({ user: user }, function (err, convo) {
                                    if (err) {
                                        console.log('error: ', err);
                                    }
                                    convo.say('I need a bit more information to compute the comparison...');

                                    var startTimeframe = [];
                                    convo.addQuestion({
                                        attachments: [
                                            {
                                                title: 'current',
                                                text: 'You want to compare...',
                                                callback_id: 'current',
                                                attachment_type: 'default',
                                                color: '#02FF92',
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
                                    convo.addQuestion({
                                        text: 'Custom Timeframe',
                                        blocks: [
                                            {
                                                "type": "section",
                                                "block_id": "section1234",
                                                "text": {
                                                    "type": "mrkdwn",
                                                    "text": "Would you be so kind as to select your custom timeframe?"
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
                                        endTimeframe.push(response.actions[0].selected_date);

                                        if (endTimeframe.length == 2) {
                                            convo.next();
                                        } else {
                                            convo.silentRepeat();
                                        }
                                    }, 'custom');

                                    convo.addQuestion({
                                        attachments: [
                                            {
                                                title: 'past',
                                                text: 'Against...',
                                                callback_id: 'past',
                                                attachment_type: 'default',
                                                color: '#02FF92',
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
                                                            {
                                                                "text": "Custom",
                                                                "value": "Custom"
                                                            },
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
                                            {
                                                pattern: "Custom",
                                                callback: function (reply, convo) {
                                                    convo.addMessage({
                                                        text: 'Please pick the dates you would like to compare against',
                                                        action: 'custom'
                                                    });
                                                    endTimeframe.push(5);
                                                    convo.next();
                                                }
                                            },
                                        ]);

                                    convo.activate();

                                    convo.on('end', function (convo) {
                                        if (convo.successful()) {
                                            var results = getPersonalComparisonOutput(user, startTimeframe, endTimeframe)

                                            bot.replyPrivate(message, {
                                                text: 'Here is ' + results[2][0] + ' compared to ' + results[2][1] + '\n',
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
                                    })
                                })
                            } else if (message.text[0] == 'team' || message.text[0] == 'Team') {
                                controller.storage.users.find({ team: message.team_id }, function (err, all_users) {
                                    if (err) {
                                        if (err) {
                                            console.log('error: ', err);
                                        }
                                        bot.replyPrivate(meaage, 'I am sorry - I do not have enough information to compute this comparison');
                                    }
                                    bot.startPrivateConversation({ user: message.user_id }, function (err, convo) {
                                        if (err) {
                                            console.log('error: ', err);
                                        }
                                        convo.say('I need a bit more information to compute the comparison...');

                                        convo.addQuestion("If you'd like this to be for a specific channel, please tell me the channel name (ex. #everyone). Otherwise, feel free to just say 'No'", function (reply, convo) {
                                            bot.api.reactions.add({
                                                name: 'thumbsup',
                                                channel: message.channel,
                                                timestamp: reply.ts
                                            })
                                            convo.next();
                                        });

                                        var startTimeframe = [];
                                        convo.addQuestion({
                                            attachments: [
                                                {
                                                    title: 'current',
                                                    text: 'You want to compare...',
                                                    callback_id: 'current',
                                                    attachment_type: 'default',
                                                    color: '#02FF92',
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
                                        convo.addQuestion({
                                            text: 'Custom Timeframe',
                                            blocks: [
                                                {
                                                    "type": "section",
                                                    "block_id": "section1234",
                                                    "text": {
                                                        "type": "mrkdwn",
                                                        "text": "Would you be so kind as to select your custom timeframe?"
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
                                            endTimeframe.push(response.actions[0].selected_date);

                                            if (endTimeframe.length == 2) {
                                                convo.next();
                                            } else {
                                                convo.silentRepeat();
                                            }
                                        }, 'custom');

                                        convo.addQuestion({
                                            attachments: [
                                                {
                                                    title: 'past',
                                                    text: 'Against...',
                                                    callback_id: 'past',
                                                    attachment_type: 'default',
                                                    color: '#02FF92',
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
                                                                {
                                                                    "text": "Custom",
                                                                    "value": "Custom"
                                                                },
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
                                                {
                                                    pattern: "Custom",
                                                    callback: function (reply, convo) {
                                                        convo.addMessage({
                                                            text: 'Please pick the dates you would like to compare against',
                                                            action: 'custom'
                                                        });
                                                        endTimeframe.push(5);
                                                        convo.next();
                                                    }
                                                },
                                            ]);

                                        convo.activate();

                                        convo.on('end', function (convo) {
                                            if (convo.successful()) {
                                                var res = convo.extractResults();
                                                if (res[Object.keys(res)[0]] && res[Object.keys(res)[0]].text[0] == '<') {
                                                    var text = res[Object.keys(res)[0]];
                                                    var channel_id = '';
                                                    for (var j = 2; j < text.length; j++) {
                                                        if (text[j] == "|") {
                                                            break;
                                                        } else {
                                                            channel_id = channel_id + text[j];
                                                        }
                                                    }
                                                    var updated_input = [];
                                                    bot.api.channels.info({ channel: channel_id }, function (err, response) {
                                                        const users = response.channel.members;
                                                        for (var j = 0; j < users.length; j++) {
                                                            for (var k = 0; k < all_users.length; k++) {
                                                                if (all_users[k].id == users[j]) {
                                                                    updated_input.push(all_users[k]);
                                                                }
                                                            }
                                                        }
                                                    });
                                                    var user_input = updated_input;
                                                } else {
                                                    var user_input = all_users;
                                                }

                                                var results = getTeamComparisonOutput(user_input, startTimeframe, endTimeframe);
                                                if (results == 404) {
                                                    bot.replyPrivate(message, "Hey, make sure your inputs are correct - It doesn't appear that you have scores dating back that far");
                                                } else {
                                                    bot.replyPrivate(message, {
                                                        text: 'Here is ' + results[2][0] + ' compared to ' + results[2][1] + '\n',
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
                                })
                            }
                            break;

                        // CHANNEL SPECIFIC REPORTING
                        case '/report':
                            if (!user && typeof user.status == 'undefined' || user.status != 'manager') {
                                if (err) {
                                    bot.replyPrivate(message, "Sorry to break it to you, but this functionality is only for managers :confused:\n\nVisit https://getinternal.co to upgrade!");
                                    console.log(err);
                                }
                                bot.replyPrivate(message, "Sorry to break it to you, but this functionality is only for managers :confused:\n\nVisit https://getinternal.co to upgrade!");

                            } else {
                                const timeframe = message.text[1];
                                var users = [];
                                var channel_id = '';
                                var channel_string = '';

                                for (var e = message.text[0].indexOf("|", 0); e < message.text[0].length - 1; j++) {
                                    channel_string = channel_string + string[e];
                                }
                                const channel_name = channel_string;

                                for (var j = 1; j < message.text[0].length; j++) {
                                    if (string[j] == "|") {
                                        break;
                                    } else {
                                        channel_id = channel_id + string[j];
                                    }
                                }

                                bot.api.channel.info({
                                    channel: channel_id
                                }, function (err, res) {
                                    if (err) {
                                        bot.say({
                                            text: "Try one more time?",
                                            channel: message.user
                                        });
                                    }
                                    users.push(res.members);
                                });

                                controller.storage.users.find({ team: message.team }, function (err, all_users) {
                                    if (err) {
                                        bot.say({
                                            text: "There's been a slight problem on my end",
                                            channel: message.user
                                        });
                                    }

                                    var data = [];
                                    for (var i = 0; i < users.length; i++) {
                                        var user = users[i];
                                        for (var j = 0; j < all_users.length; j++) {
                                            var instance = all_users[j];
                                            if (instance.id == user) {
                                                data.push(instance);
                                            }
                                        }
                                    }

                                    var output = getChannelSpecificOutput(data, timeframe);
                                    if (output == 404) {
                                        if (err) {
                                            console.log(err);
                                            bot.whisper(message, "I'm sorry, I don't appear to have sufficient info to report these metrics");
                                        }
                                        bot.replyPrivate(message, "Are you sure those dates are correct? I can't find logs back that far :thinking:");
                                    } else {
                                        if (err) {
                                            bot.whisper(message, "Sorry, fam! Something went wrong");
                                        }
                                        bot.replyPrivate(message, {
                                            text: "Here is your report for " + channel_name + "...",
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
                                                    text: results[0][2] + '\n*Happy:* ' + results[1][2][0] + ' | *Calm:* ' + results[1][2][1] + ' | *Tense:* ' + results[1][2][2] + ' | *Upset:* ' + results[1][2][3] + '\n'
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
                                                    text: 'Logs Completed: ' + results[2] + '\n' + results[0][7]
                                                }
                                            ]
                                        });
                                    }
                                });
                            }

                            break;

                        // History
                        case '/history':
                            if (message.text[0] == 'personal' || message.text[0] == 'Personal') {
                                bot.startPrivateConversation({ user: message.user }, function (err, convo) {
                                    if (err) {
                                        bot.whisper(message, "I'm so sorry! I completely missed what you said - Could you try again?");
                                    }
                                    var dates = [];
                                    convo.addQuestion({
                                        text: 'Search Timeframe',
                                        blocks: [
                                            {
                                                "type": "section",
                                                "block_id": "section1234",
                                                "text": {
                                                    "type": "mrkdwn",
                                                    "text": "Choose the historical dates, por favor"
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
                                            convo.next();
                                        } else {
                                            convo.silentRepeat();
                                        }
                                    });

                                    convo.say("One moment, computing the results...");

                                    convo.activate();

                                    convo.on('end', function (convo) {
                                        if (convo.successful()) {
                                            var results = getPersonalSearchOutput(user, dates);

                                            if (results == 404) {
                                                bot.replyPrivate(message, "Results weren't able to be computed... Are you sure you selected the correct dates?")
                                            } else {
                                                bot.replyPrivate(message, {
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
                                                            text: results[0][2] + '\n*Happy:* ' + results[1][2][0] + ' | *Calm:* ' + results[1][2][1] + ' | *Tense:* ' + results[1][2][2] + ' | *Upset:* ' + results[1][2][3] + '\n'
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
                                        }
                                    })
                                });
                            } else if (message.text[0] == 'team' || message.text[0] == 'Team') {
                                controller.storage.users.find({ team: message.team }, function (err, all_users) {
                                    if (err) {
                                        bot.whisper(message, "Ah! I'm a bit popular right now. Could you say that again? I missed it");
                                    }
                                    bot.startConversation(message, function (err, convo) {
                                        if (err) {
                                            bot.whisper(message, "Ah! I'm a bit popular right now. Could you say that again? I missed it");
                                        }

                                        convo.addQuestion("If you'd like this to be for a specific channel, please tell me the channel name (ex. #everyone). Otherwise, feel free to just say 'No'", function (reply, convo) {
                                            bot.api.reactions.add({
                                                name: 'thumbsup',
                                                channel: message.channel,
                                                timestamp: reply.ts
                                            })
                                            convo.next();
                                        });

                                        var dates = [];
                                        convo.addQuestion({
                                            text: 'Search Timeframe',
                                            blocks: [
                                                {
                                                    "type": "section",
                                                    "block_id": "section1234",
                                                    "text": {
                                                        "type": "mrkdwn",
                                                        "text": "Choose the historical dates, por favor"
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
                                                convo.next();
                                            } else {
                                                convo.silentRepeat();
                                            }
                                            });

                                        convo.say("One moment, computing the results...");

                                        convo.activate();

                                        convo.on('end', function (convo) {
                                            if (convo.successful()) {
                                                var res = convo.extractResults();
                                                if (res[Object.keys(res)[0]] && res[Object.keys(res)[0]].text[0] == '<') {
                                                    var text = res[Object.keys(res)[0]];
                                                    var channel_id = '';
                                                    for (var j = 2; j < text.length; j++) {
                                                        if (text[j] == "|") {
                                                            break;
                                                        } else {
                                                            channel_id = channel_id + text[j];
                                                        }
                                                    }
                                                    var updated_input = [];
                                                    bot.api.channels.info({ channel: channel_id }, function (err, response) {
                                                        const users = response.channel.members;
                                                        for (var j = 0; j < users.length; j++) {
                                                            for (var k = 0; k < all_users.length; k++) {
                                                                if (all_users[k].id == users[j]) {
                                                                    updated_input.push(all_users[k]);
                                                                }
                                                            }
                                                        }
                                                    });
                                                    var user_input = updated_input;
                                                } else {
                                                    var user_input = all_users;
                                                }
                                                var results = getTeamSearchOutput(user_input, dates);

                                                if (results == 404) {
                                                    bot.replyPrivate(message, "Results weren't able to be computed... Are you sure you selected the correct dates?");
                                                } else {
                                                    bot.replyPrivate(message, {
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
                                                                text: results[0][2] + '\n*Happy:* ' + results[1][2][0] + ' | *Calm:* ' + results[1][2][1] + ' | *Tense:* ' + results[1][2][2] + ' | *Upset:* ' + results[1][2][3] + '\n'
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
                                            }
                                        })
                                    });
                                })
                            }
                            break;
                    }
            }
        })
    })
}

function getTeamComparisonOutput(results, start, end) {
    var moment = require('moment');

    var timeframeMessage = [];
    // Get current timeframe
    if (start[0] == 1) {
        var currentDays = [moment().format('MM/DD/YYY')];
        timeframeMessage.push('*Today*');
    } else if (start[0] == 2) {
        var startOfWeek = moment().startOf('isoWeek');
        var endOfWeek = moment().endOf('isoWeek');

        var currentDays = [];
        while (startOfWeek <= endOfWeek) {
            currentDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('*This Week*');
    } else if (start[0] == 3) {
        var startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
        var endOfMonth = moment().endOf('month').format('DD-MM-YYYY');

        var currentDays = [];
        while (startOfMonth <= endOfMonth) {
            currentDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('*This Month*');
    } else if (start[0] == 4) {
        var startOfYear = moment().startOf('year');
        var today = moment();

        var currentDays = [];
        while (startOfYear <= today) {
            currentDays.push(startOfYear.format('L'));
            startOfYear = startOfYear.clone().add(1, 'd');
        }
        timeframeMessage.push('*This Year*');
    }

    // Get past timeframe
    if (end[0] == 1) {
        var pastDays = [moment().subtract(1, 'd').format('MM/DD/YYY')];
        timeframeMessage.push('*Yesterday*');
    } else if (end[0] == 2) {
        var startOfWeek = moment().startOf('isoWeek').subtract(7, 'd');
        var endOfWeek = moment().endOf('isoWeek').subtract(7, 'd');

        var pastDays = [];
        while (startOfWeek <= endOfWeek) {
            pastDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('*Last Week*');
    } else if (end[0] == 3) {
        var startOfMonth = moment().startOf('month').subtract(1, 'm');
        var endOfMonth = moment().endOf('month').subtract(1, 'm');

        var pastDays = [];
        while (startOfMonth <= endOfMonth) {
            pastDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('*Last Month*');
    } else if (end[0] == 4) {
        var startOfYear = moment().startOf('year').subtract(1, 'year');
        var endOfYear = moment().endOf('year').subtract(1, 'year');

        var pastDays = [];
        while (startOfYear <= endOfYear) {
            pastDays.push(startOfYear.format('L'));
            startOfYear = startOfYear.clone().add(1, 'd');
        }
        timeframeMessage.push('*Last Year*');
    } else if (end[0] == 5) {
        var customStart = end[1];
        var customEnd = end[2];

        var pastDays = [];
        while (customStart <= customEnd) {
            pastDays.push(customStart.format('L'));
            customStart = customStart.clone().add(1, 'd');
        }
        timeframeMessage.push('*' + pastDays[0] + '-' + pastDays[pastDays.length - 1] + '*');
    }

    // Tallys
    var currentCount = 0;
    var pastCount = 0;
    var currentTally = 0;
    var pastTally = 0;

    // Scores
    var currentScore = 0;
    var pastScore = 0;

    for (var i = 0; i < results.length; i++) {
        var instance = results[i];

        for (var j = 0; j < currentDays.length; j++) {
            if (currentDays[j] in instance.logs) {
                if (typeof instance.logs[currentDays[j]].check_in == 'undefined' || instance.logs[currentDays[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[currentDays[j]].check_in;
                    var checkOut = instance.logs[currentDays[j]].check_out;

                    currentCount = currentCount + (checkIn[4] / 4);
                    currentTally = currentTally + 1;

                    currentCount = currentCount + (checkOut[4] / 4);
                    currentTally = currentTally + 1;
                }
            }
        }

        for (var y = 0; y < currentDays.length; y++) {
            if (currentDays[y] in instance.logs) {
                if (typeof instance.logs[currentDays[y]].check_in == 'undefined' || instance.logs[currentDays[y]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[currentDays[y]].check_in;
                    var checkOut = instance.logs[currentDays[y]].check_out;

                    pastCount = pastCount + (checkIn[4] / 4);
                    pastTally = pastTally + 1;

                    pastCount = pastCount + (checkOut[4] / 4);
                    pastTally = pastTally + 1;
                }
            }
        }

        if (currentTally > 0) {
            var currentScore = currentScore + ((currentCount / (currentTally * 2)) * 25).toFixed(2);
        } else {
            return 404;
        }

        if (pastTally > 0) {
            var pastScore = pastScore + ((pastCount / (pastTally * 2)) * 25).toFixed(2);
        } else {
            return 404;
        }
    }

    return [currentScore, pastScore, timeframeMessage];
}

function getPersonalComparisonOutput(results, start, end) {
    var moment = require('moment');

    var timeframeMessage = [];
    // Get current timeframe
    if (start[0] == 1) {
        var currentDays = [moment().format('MM/DD/YYY')];
        timeframeMessage.push('*Today*');
    } else if (start[0] == 2) {
        var startOfWeek = moment().startOf('isoWeek');
        var endOfWeek = moment().endOf('isoWeek');

        var currentDays = [];
        while (startOfWeek <= endOfWeek) {
            currentDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('*This Week*');
    } else if (start[0] == 3) {
        var startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
        var endOfMonth = moment().endOf('month').format('DD-MM-YYYY');

        var currentDays = [];
        while (startOfMonth <= endOfMonth) {
            currentDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('*This Month*');
    } else if (start[0] == 4) {
        var startOfYear = moment().startOf('year');
        var today = moment();

        var currentDays = [];
        while (startOfYear <= today) {
            currentDays.push(startOfYear.format('L'));
            startOfYear = startOfYear.clone().add(1, 'd');
        }
        timeframeMessage.push('*This Year*');
    }

    // Get past timeframe
    if (end[0] == 1) {
        var pastDays = [moment().subtract(1, 'd').format('MM/DD/YYY')];
        timeframeMessage.push('*Yesterday*');
    } else if (end[0] == 2) {
        var startOfWeek = moment().startOf('isoWeek').subtract(7, 'd');
        var endOfWeek = moment().endOf('isoWeek').subtract(7, 'd');

        var pastDays = [];
        while (startOfWeek <= endOfWeek) {
            pastDays.push(startOfWeek.format('L'));
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }
        timeframeMessage.push('*Last Week*');
    } else if (end[0] == 3) {
        var startOfMonth = moment().startOf('month').subtract(1, 'm');
        var endOfMonth = moment().endOf('month').subtract(1, 'm');

        var pastDays = [];
        while (startOfMonth <= endOfMonth) {
            pastDays.push(startOfMonth.format('L'));
            startOfMonth = startOfMonth.clone().add(1, 'd');
        }
        timeframeMessage.push('*Last Month*');
    } else if (end[0] == 4) {
        var startOfYear = moment().startOf('year').subtract(1, 'year');
        var endOfYear = moment().endOf('year').subtract(1, 'year');

        var pastDays = [];
        while (startOfYear <= endOfYear) {
            pastDays.push(startOfYear.format('L'));
            startOfYear = startOfYear.clone().add(1, 'd');
        }
        timeframeMessage.push('*Last Year*');
    } else if (end[0] == 5) {
        var customStart = end[1];
        var customEnd = end[2];

        var pastDays = [];
        while (customStart <= customEnd) {
            pastDays.push(customStart.format('L'));
            customStart = customStart.clone().add(1, 'd');
        }
        timeframeMessage.push('*' + pastDays[0] + '-' + pastDays[pastDays.length - 1] + '*');
    }

    // Tallys
    var currentCount = 0;
    var pastCount = 0;
    var currentTally = 0;
    var pastTally = 0;

    // Scores
    var currentScore = 0;
    var pastScore = 0;

    for (var j = 0; j < currentDays.length; j++) {
        if (currentDays[j] in results.logs) {
            if (typeof results.logs[currentDays[j]].check_in == 'undefined' || results.logs[currentDays[j]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[currentDays[j]].check_in;
                var checkOut = results.logs[currentDays[j]].check_out;

                currentCount = currentCount + (checkIn[4] / 4);
                currentTally = currentTally + 1;

                currentCount = currentCount + (checkOut[4] / 4);
                currentTally = currentTally + 1;
            }
        }
    }

    for (var y = 0; y < currentDays.length; y++) {
        if (currentDays[y] in results.logs) {
            if (typeof results.logs[currentDays[y]].check_in == 'undefined' || results.logs[currentDays[y]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[currentDays[y]].check_in;
                var checkOut = results.logs[currentDays[y]].check_out;

                pastCount = pastCount + (checkIn[4] / 4);
                pastTally = pastTally + 1;

                pastCount = pastCount + (checkOut[4] / 4);
                pastTally = pastTally + 1;
            }
        }
    }

    if (currentTally > 0) {
        var currentScore = currentScore + ((currentCount / (currentTally * 2)) * 25).toFixed(2);
    } else {
        return 404;
    }

    if (pastTally > 0) {
        var pastScore = pastScore + ((pastCount / (pastTally * 2)) * 25).toFixed(2);
    } else {
        return 404;
    }


    return [currentScore, pastScore, timeframeMessage];
}

function getChannelSpecificOutput(results, timeframe) {
    var moment = require('moment');
    if (timeframe == 'monthly') {
        var start = moment().startOf('month').format('DD/MM/YYYY');
        var end = moment().endOf('month').format('DD/MM/YYYY');
        var day = start;

        var days = [];
        while (day <= end) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }
    } else if (timeframe == 'weekly') {
        var start = moment().startOf('isoWeek').format('DD/MM/YYYY');
        var end = moment().endOf('isoWeek').format('DD/MM/YYYY');
        var day = start;

        var days = [];
        while (day <= end) {
            days.push(day.format('L'));
            day = day.clone().add(1, 'd');
        }
    } else if (timeframe == 'daily') {
        days = [moment().format('DD/MM/YYY')]
    }

    var sleepCount = 0;
    var energyCount = 0;
    var moodCount = 0;
    var confidenceCount = 0;
    var efficiencyCount = 0;
    var fulfillmentCount = 0;
    var overallCount = 0;
    var tally = 0;


    for (var i = 0; i < results.length; i++) {
        var instance = results[i];


        for (var j = 0; j < days.length; j++) {
            if (days[j] in instance.logs) {
                if (typeof instance.logs[days[j]].check_in == 'undefined' || instance.logs[days[j]].check_out == 'undefined') {
                    // Pass
                } else {
                    var checkIn = instance.logs[days[j]].check_in;
                    var checkOut = instance.logs[days[j]].check_out;

                    sleepCount = sleepCount + checkIn[0];
                    energyCount = energyCount + checkIn[1];
                    moodCount = moodCount + checkIn[2];
                    confidenceCount = confidenceCount + checkIn[3];
                    overallCount = overallCount + (checkIn[4] / 4);

                    efficiencyCount = efficiencyCount + checkOut[0];
                    confidenceCount = confidenceCount + checkOut[1];
                    moodCount = moodCount + checkOut[2];
                    fulfillmentCount = fulfillmentCount + checkOut[3];
                    overallCount = overallCount + (checkOut[4] / 4);
                    tally = tally + 1;
                }
            }
        }

        if (tally > 0) {
            var sleep = ((sleepCount / tally) * 25).toFixed(2);
            var energy = ((energyCount / tally) * 25).toFixed(2);
            var mood = ((moodCount / (tally * 2)) * 25).toFixed(2);
            var confidence = ((confidenceCount / (tally * 2)) * 25).toFixed(2);
            var efficiency = ((efficiencyCount / tally) * 25).toFixed(2);
            var fulfillment = ((fulfillmentCount / tally) * 25).toFixed(2);
            var overall = ((overallCount / (tally * 2)) * 25).toFixed(2);

            var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment];

            var report = [];
            report.push(sleep);
            for (var z = 0; z < loopArray.length; z++) {
                if (loopArray[z] > 50) {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Positive*';
                    report.push(message);
                } else {
                    var message = 'Score: *' + loopArray[z] + '%*\nAverage: *Negative*';
                    report.push(message);
                }
            }

            if (overall > 50) {
                var overallResult = 'Score: *' + overall + '%*\nThe overall emotional fitness this ' + timeframe + ' was *positive*!';
                report.push(overallResult);
            }
            else {
                var overallResult = 'Score: *' + overall + '%*\nThe overall emotional fitness this ' + timeframe + ' was *negative*';
                report.push(overallResult);
            }

            return report;

        } else {
            return 404;
        }
    }
}

function getPersonalSearchOutput(results, dates) {
    var moment = require('moment');
    var startOfMonth = moment(dates[0]).format("MM/DD/YYY");
    var endOfMonth = moment(dates[1]).format("MM/DD/YYY");

    var day = startOfMonth;

    var days = [];
    while (day <= endOfMonth) {
        days.push(day.format('L'));
        day = day.clone().add(1, 'd');
    }

    var sleepCount = 0;
    var energyCount = 0;
    var moodCount = 0;
    var confidenceCount = 0;
    var efficiencyCount = 0;
    var fulfillmentCount = 0;
    var overallCount = 0;
    var tally = 0;

    for (var j = 0; j < days.length; j++) {
        if (days[j] in results.logs) {
            if (typeof insresultstance.logs[days[j]].check_in == 'undefined' || results.logs[days[j]].check_out == 'undefined') {
                // Pass
            } else {
                var checkIn = results.logs[days[j]].check_in;
                var checkOut = results.logs[days[j]].check_out;

                sleepCount = sleepCount + checkIn[0];
                energyCount = energyCount + checkIn[1];
                moodCount = moodCount + checkIn[2];
                confidenceCount = confidenceCount + checkIn[3];
                overallCount = overallCount + (checkIn[4] / 4);
                tally = tally + 1;

                efficiencyCount = efficiencyCount + checkOut[0];
                confidenceCount = confidenceCount + checkOut[1];
                moodCount = moodCount + checkOut[2];
                fulfillmentCount = fulfillmentCount + checkOut[3];
                overallCount = overallCount + (checkOut[4] / 4);
            }
        }
    }

    if (tally > 0) {
        var sleep = ((sleepCount / tally) * 25).toFixed(2);
        var energy = ((energyCount / tally) * 25).toFixed(2);
        var mood = ((moodCount / (tally * 2)) * 25).toFixed(2);
        var confidence = ((confidenceCount / (tally * 2)) * 25).toFixed(2);
        var efficiency = ((efficiencyCount / tally) * 25).toFixed(2);
        var fulfillment = ((fulfillmentCount / tally) * 25).toFixed(2);
        var overall = ((overallCount / (tally * 2)) * 25).toFixed(2);

        var loopArray = [sleep, energy, mood, confidence, efficiency, fulfillment];

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
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness between ' + startOfMonth + 'and' + endOfMonth + ' was *positive*!';
            monthlyReport.push(overallMonth);
        }
        else {
            var overallMonth = 'Score: *' + overall + '%*\nThe overall emotional fitness between ' + startOfMonth + 'and' + endOfMonth + ' was *negative*';
            monthlyReport.push(overallMonth);
        }

        return monthlyReport;

    } else {
        return 404;
    }
}