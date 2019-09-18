module.exports = function (controller) {
    controller.hears(['check in', 'Check in', 'check In', 'Check In'], 'direct_message', function (bot, message) {
        controller.storage.users.get(message.user, function (error, user) {
            if (error) {
                console.log("error: ", err);
                bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
            }
            if (!user || typeof user == 'undefined') {
                controller.storage.teams.get(message.team, function (err, team) {
                    if (err) {
                        console.log(err);
                    }
                    bot.startPrivateConversation({ user: message.user }, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                            bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                        }
                        const newUser = {};
    
                        convo.addMessage("Greetings, <@" + message.user + ">! This is the first time we're meeting, so just give me a quick second to set you up on my end...", function (response, convo) {
                            bot.api.users.info({ user: reply.user }, (error, response) => {
                                if (error) {
                                    console.log("error: ", error);
                                }
                                let { name, real_name } = response.user;
                                newUser.name = real_name;
                                newUser.email = response.user.profile.email;
                                newUser.timezone = response.user.tz
                            })
                            bot.api.channels.invite({ token: bot.config.bot.app_token, channel: team.bot.channel, user: message.user }, function (err, outcome) {
                                if (err) {
                                    console.log("error: ", err);
                                }
                            });
                            newUser.channel = message.channel;
                            newUser.team = message.team;
                            newUser.status = 'employee';
                            newUser.id = message.user;
                            newUser.token = bot.config.token;
                        });
    
                        convo.addQuestion("All done! I've just got one quick question - what's your role here?", function (response, convo) {
                            newUser.role = response.text;
                            convo.next();
                        }, 'default');
    
                        convo.say("Cool! Thanks for humoring my shenanigans. Now the fun part...");
    
                        convo.activate();
    
                        convo.on('end', function (convo) {
                            if (convo.successful()) {
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
                })
            }
            else {
                bot.startConversation(message, function (err, convo) {
                    if (err) {
                        console.log("error: ", err);
                        bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                    }

                    // Keep Score
                    const score = [];

                    convo.addMessage({
                        text: "Hey, here's your check in questionnaire! Just choose which option vibes best for each of the 4 topics..."
                    });

                    // Sleep
                    convo.addQuestion({
                        attachments: [
                            {
                                title: "Sleep",
                                callback_id: 'checkin-sleep',
                                attachment_type: 'default',
                                color: '#02D2FF',
                                actions: [
                                    {
                                        'name': 'perfect-button',
                                        'value': 'Perfect',
                                        'text': 'Perfect',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'sufficient-button',
                                        'value': 'Sufficient',
                                        'text': 'Sufficient',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'restless-button',
                                        'value': 'Restless',
                                        'text': 'Restless',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'terrible-button',
                                        'value': 'Terrible',
                                        'text': 'Terrible',
                                        'type': 'button'
                                    },
                                ]
                            }
                        ]
                    }, [
                            {
                                pattern: 'Perfect',
                                callback: function (reply, convo) {
                                    score.push(4);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Sleep",
                                                    callback_id: 'checkin-sleep',
                                                    attachment_type: 'default',
                                                    color: '#02D2FF',
                                                    actions: [
                                                        {
                                                            'name': 'perfect-button',
                                                            'value': 'Perfect',
                                                            'style': 'primary',
                                                            'text': 'Perfect',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'sufficient-button',
                                                            'value': 'Sufficient',
                                                            'text': 'Sufficient',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'restless-button',
                                                            'value': 'Restless',
                                                            'text': 'Restless',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'terrible-button',
                                                            'value': 'Terrible',
                                                            'text': 'Terrible',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Sufficient',
                                callback: function (reply, convo) {
                                    score.push(3);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Sleep",
                                                    callback_id: 'checkin-sleep',
                                                    attachment_type: 'default',
                                                    color: '#02D2FF',
                                                    actions: [
                                                        {
                                                            'name': 'perfect-button',
                                                            'value': 'Perfect',
                                                            'text': 'Perfect',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'sufficient-button',
                                                            'value': 'Sufficient',
                                                            'style': 'primary',
                                                            'text': 'Sufficient',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'restless-button',
                                                            'value': 'Restless',
                                                            'text': 'Restless',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'terrible-button',
                                                            'value': 'Terrible',
                                                            'text': 'Terrible',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Restless',
                                callback: function (reply, convo) {
                                    score.push(2);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Sleep",
                                                    callback_id: 'checkin-sleep',
                                                    attachment_type: 'default',
                                                    color: '#02D2FF',
                                                    actions: [
                                                        {
                                                            'name': 'perfect-button',
                                                            'value': 'Perfect',
                                                            'text': 'Perfect',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'sufficient-button',
                                                            'value': 'Sufficient',
                                                            'text': 'Sufficient',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'restless-button',
                                                            'value': 'Restless',
                                                            'style': 'primary',
                                                            'text': 'Restless',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'terrible-button',
                                                            'value': 'Terrible',
                                                            'text': 'Terrible',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Terrible',
                                callback: function (reply, convo) {
                                    score.push(1);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Sleep",
                                                    callback_id: 'checkin-sleep',
                                                    attachment_type: 'default',
                                                    color: '#02D2FF',
                                                    actions: [
                                                        {
                                                            'name': 'perfect-button',
                                                            'value': 'Perfect',
                                                            'text': 'Perfect',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'sufficient-button',
                                                            'value': 'Sufficient',
                                                            'text': 'Sufficient',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'restless-button',
                                                            'value': 'Restless',
                                                            'text': 'Restless',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'terrible-button',
                                                            'value': 'Terrible',
                                                            'style': 'primary',
                                                            'text': 'Terrible',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            }
                        ]);

                    // Energy
                    convo.addQuestion({
                        attachments: [
                            {
                                title: "Energy",
                                callback_id: 'checkin-energy',
                                attachment_type: 'default',
                                color: '#2A02FF',
                                actions: [
                                    {
                                        'name': 'full-button',
                                        'value': 'Full',
                                        'text': 'Full',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'alright-button',
                                        'value': 'Alright',
                                        'text': 'Alright',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'hangingOn-button',
                                        'value': 'Hanging-On',
                                        'text': 'Hanging On',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'dead-button',
                                        'value': 'Dead',
                                        'text': 'Dead',
                                        'type': 'button'
                                    },
                                ]
                            }
                        ]
                    }, [
                            {
                                pattern: 'Full',
                                callback: function (reply, convo) {
                                    score.push(4);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Energy",
                                                    callback_id: 'checkin-energy',
                                                    attachment_type: 'default',
                                                    color: '#2A02FF',
                                                    actions: [
                                                        {
                                                            'name': 'full-button',
                                                            'value': 'Full',
                                                            'style': 'primary',
                                                            'text': 'Full',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'alright-button',
                                                            'value': 'Alright',
                                                            'text': 'Alright',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'hangingOn-button',
                                                            'value': 'Hanging-On',
                                                            'text': 'Hanging On',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'dead-button',
                                                            'value': 'Dead',
                                                            'text': 'Dead',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Alright',
                                callback: function (reply, convo) {
                                    score.push(3);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Energy",
                                                    callback_id: 'checkin-energy',
                                                    attachment_type: 'default',
                                                    color: '#2A02FF',
                                                    actions: [
                                                        {
                                                            'name': 'full-button',
                                                            'value': 'Full',
                                                            'text': 'Full',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'alright-button',
                                                            'value': 'Alright',
                                                            'style': 'primary',
                                                            'text': 'Alright',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'hangingOn-button',
                                                            'value': 'Hanging-On',
                                                            'text': 'Hanging On',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'dead-button',
                                                            'value': 'Dead',
                                                            'text': 'Dead',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Hanging-On',
                                callback: function (reply, convo) {
                                    score.push(2);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Energy",
                                                    callback_id: 'checkin-energy',
                                                    attachment_type: 'default',
                                                    color: '#2A02FF',
                                                    actions: [
                                                        {
                                                            'name': 'full-button',
                                                            'value': 'Full',
                                                            'text': 'Full',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'alright-button',
                                                            'value': 'Alright',
                                                            'text': 'Alright',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'hangingOn-button',
                                                            'value': 'Hanging-On',
                                                            'style': 'primary',
                                                            'text': 'Hanging On',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'dead-button',
                                                            'value': 'Dead',
                                                            'text': 'Dead',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Dead',
                                callback: function (reply, convo) {
                                    score.push(1);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Energy",
                                                    callback_id: 'checkin-energy',
                                                    attachment_type: 'default',
                                                    color: '#2A02FF',
                                                    actions: [
                                                        {
                                                            'name': 'full-button',
                                                            'value': 'Full',
                                                            'text': 'Full',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'alright-button',
                                                            'value': 'Alright',
                                                            'text': 'Alright',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'hangingOn-button',
                                                            'value': 'Hanging-On',
                                                            'text': 'Hanging On',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'dead-button',
                                                            'value': 'Dead',
                                                            'style': 'primary',
                                                            'text': 'Dead',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            }
                        ]);

                    // Mood
                    convo.addQuestion({
                        attachments: [
                            {
                                title: "Mood",
                                callback_id: 'checkin-mood',
                                attachment_type: 'default',
                                color: '#8A02FF',
                                actions: [
                                    {
                                        'name': 'happy-button',
                                        'value': 'Happy',
                                        'text': 'Happy',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'calm-button',
                                        'value': 'Calm',
                                        'text': 'Calm',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'tense-button',
                                        'value': 'Tense',
                                        'text': 'Tense',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'upset-button',
                                        'value': 'Upset',
                                        'text': 'Upset',
                                        'type': 'button'
                                    },
                                ]
                            }
                        ]
                    }, [
                            {
                                pattern: 'Happy',
                                callback: function (reply, convo) {
                                    score.push(4);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Mood",
                                                    callback_id: 'checkin-mood',
                                                    attachment_type: 'default',
                                                    color: '#8A02FF',
                                                    actions: [
                                                        {
                                                            'name': 'happy-button',
                                                            'style': 'primary',
                                                            'value': 'Happy',
                                                            'text': 'Happy',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'calm-button',
                                                            'value': 'Calm',
                                                            'text': 'Calm',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'tense-button',
                                                            'value': 'Tense',
                                                            'text': 'Tense',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'upset-button',
                                                            'value': 'Upset',
                                                            'text': 'Upset',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Calm',
                                callback: function (reply, convo) {
                                    score.push(3);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Mood",
                                                    callback_id: 'checkin-mood',
                                                    attachment_type: 'default',
                                                    color: '#8A02FF',
                                                    actions: [
                                                        {
                                                            'name': 'happy-button',
                                                            'value': 'Happy',
                                                            'text': 'Happy',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'calm-button',
                                                            'style': 'primary',
                                                            'value': 'Calm',
                                                            'text': 'Calm',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'tense-button',
                                                            'value': 'Tense',
                                                            'text': 'Tense',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'upset-button',
                                                            'value': 'Upset',
                                                            'text': 'Upset',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Tense',
                                callback: function (reply, convo) {
                                    score.push(2);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Mood",
                                                    callback_id: 'checkin-mood',
                                                    attachment_type: 'default',
                                                    color: '#8A02FF',
                                                    actions: [
                                                        {
                                                            'name': 'happy-button',
                                                            'value': 'Happy',
                                                            'text': 'Happy',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'calm-button',
                                                            'value': 'Calm',
                                                            'text': 'Calm',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'tense-button',
                                                            'value': 'Tense',
                                                            'style': 'primary',
                                                            'text': 'Tense',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'upset-button',
                                                            'value': 'Upset',
                                                            'text': 'Upset',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Upset',
                                callback: function (reply, convo) {
                                    score.push(1);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Mood",
                                                    callback_id: 'checkin-mood',
                                                    attachment_type: 'default',
                                                    color: '#8A02FF',
                                                    actions: [
                                                        {
                                                            'name': 'happy-button',
                                                            'value': 'Happy',
                                                            'text': 'Happy',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'calm-button',
                                                            'value': 'Calm',
                                                            'text': 'Calm',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'tense-button',
                                                            'value': 'Tense',
                                                            'text': 'Tense',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'upset-button',
                                                            'style': 'primary',
                                                            'value': 'Upset',
                                                            'text': 'Upset',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            }
                        ]);

                    // Confidence
                    convo.addQuestion({
                        attachments: [
                            {
                                title: "Confidence",
                                callback_id: 'checkin-confidence',
                                attachment_type: 'default',
                                color: '#CF02FF',
                                actions: [
                                    {
                                        'name': 'crushing-button',
                                        'value': 'Crushing-It',
                                        'text': 'Crushing It',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'okay-button',
                                        'value': 'Okay',
                                        'text': 'Okay',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'managing-button',
                                        'value': 'Managing',
                                        'text': 'Managing',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'overwhelmed-button',
                                        'value': 'Overwhelmed',
                                        'text': 'Overwhelmed',
                                        'type': 'button'
                                    },
                                ]
                            }
                        ]
                    }, [
                            {
                                pattern: 'Crushing-It',
                                callback: function (reply, convo) {
                                    score.push(4);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Confidence",
                                                    callback_id: 'checkin-confidence',
                                                    attachment_type: 'default',
                                                    color: '#CF02FF',
                                                    actions: [
                                                        {
                                                            'name': 'crushing-button',
                                                            'value': 'Crushing-It',
                                                            'style': 'primary',
                                                            'text': 'Crushing It',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'okay-button',
                                                            'value': 'Okay',
                                                            'text': 'Okay',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'managing-button',
                                                            'value': 'Managing',
                                                            'text': 'Managing',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'overwhelmed-button',
                                                            'value': 'Overwhelmed',
                                                            'text': 'Overwhelmed',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Okay',
                                callback: function (reply, convo) {
                                    score.push(3);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Confidence",
                                                    callback_id: 'checkin-confidence',
                                                    attachment_type: 'default',
                                                    color: '#CF02FF',
                                                    actions: [
                                                        {
                                                            'name': 'crushing-button',
                                                            'value': 'Crushing-It',
                                                            'text': 'Crushing It',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'okay-button',
                                                            'value': 'Okay',
                                                            'style': 'primary',
                                                            'text': 'Okay',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'managing-button',
                                                            'value': 'Managing',
                                                            'text': 'Managing',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'overwhelmed-button',
                                                            'value': 'Overwhelmed',
                                                            'text': 'Overwhelmed',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Managing',
                                callback: function (reply, convo) {
                                    score.push(2);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Confidence",
                                                    callback_id: 'checkin-confidence',
                                                    attachment_type: 'default',
                                                    color: '#CF02FF',
                                                    actions: [
                                                        {
                                                            'name': 'crushing-button',
                                                            'value': 'Crushing-It',
                                                            'text': 'Crushing It',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'okay-button',
                                                            'value': 'Okay',
                                                            'text': 'Okay',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'managing-button',
                                                            'value': 'Managing',
                                                            'style': 'primary',
                                                            'text': 'Managing',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'overwhelmed-button',
                                                            'value': 'Overwhelmed',
                                                            'text': 'Overwhelmed',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'Overwhelmed',
                                callback: function (response, convo) {
                                    score.push(1);
                                    bot.replyInteractive(response,
                                        {
                                            attachments: [
                                                {
                                                    title: "Confidence",
                                                    callback_id: 'checkin-confidence',
                                                    attachment_type: 'default',
                                                    color: '#CF02FF',
                                                    actions: [
                                                        {
                                                            'name': 'crushing-button',
                                                            'value': 'Crushing-It',
                                                            'text': 'Crushing It',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'okay-button',
                                                            'value': 'Okay',
                                                            'text': 'Okay',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'managing-button',
                                                            'value': 'Managing',
                                                            'text': 'Managing',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'overwhelmed-button',
                                                            'value': 'Overwhelmed',
                                                            'style': 'primary',
                                                            'text': 'Overwhelmed',
                                                            'type': 'button'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    );
                                    bot.reply(response, "Thanks for checking in!");
                                    convo.next();
                                }
                            }
                        ]);

                    var permission;
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'permission',
                                color: "#0294ff",
                                text: "Would you like to share your overall score with your teammates so that they know how you're doing today?",
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
                                                    callback_id: 'permission',
                                                    color: "#0294ff",
                                                    text: "Would you like to share your overall score with your teammates so that they know how you're doing today?",
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
                                    permission = true;
                                    bot.api.reactions.add({
                                        name: 'thumbsup',
                                        channel: message.channel,
                                        timestamp: reply.ts
                                    });
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'No',
                                callback: function (reply, convo) {
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'permission',
                                                    color: "#0294ff",
                                                    text: "Would you like to share your overall score with your teammates so that they know how you're doing today?",
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
                                    permission = false;
                                    bot.api.reactions.add({
                                        name: 'thumbsup',
                                        channel: message.channel,
                                        timestamp: reply.ts
                                    });
                                    convo.next();
                                }
                            }
                        ]
                    );


                    convo.activate();


                    // capture the results of the conversation and see what happened...
                    convo.on('end', function (convo) {

                        if (convo.successful()) {
                            // Compute score
                            var sum = score.reduce(function (a, b) { return a + b; }, 0);
                            score.push(sum);

                            var today = new Date();
                            var dd = String(today.getDate()).padStart(2, '0');
                            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = today.getFullYear();

                            today = mm + '/' + dd + '/' + yyyy;

                            if (!user) {
                                user = {};
                                user.id = message.user,
                                    user.team = message.team,
                                    user.channel = message.channel
                                user.logs = {
                                    [today]: {
                                        check_in: score,
                                        permission: permission
                                    }
                                };
                                controller.storage.users.save(user);
                            } else if (!user.logs) {
                                user.logs = {
                                    [today]:  {
                                        check_in: score,
                                        permission: permission
                                    }
                                };
                                controller.storage.users.save(user);
                            } else {
                                user.logs[today] = {
                                    check_in: score,
                                    permission: permission,
                                }
                                controller.storage.users.save(user);
                            }

                            const overall = GetOverall(score);
                            if (permission == true) {
                                controller.storage.teams.get(message.team, function (err, team) {
                                    if (err) {
                                        console.log("error: ", err);
                                    }
                                    if (overall == 100) {
                                        bot.say({
                                            text: "<@" + message.user + "> is feeling " + overall + "% today :rocket:",
                                            channel: team.bot.channel
                                        }, function(err, response) {
                                            if (err) {
                                                console.log("Erorr: ", err);
                                                error = true;
                                            }
                                        });
                                    } else {
                                        bot.say({
                                            text: "<@" + message.user + "> is feeling " + overall + "% today",
                                            channel: team.bot.channel
                                        }, function(err, response) {
                                            if (err) {
                                                console.log("Erorr: ", err);
                                                error = true;
                                            }
                                        });
                                    }
                                    bot.reply(message, "Your score of " + overall + "% has been shared successfully in <#" + team.bot.channel + ">!");
                                    bot.reply(message, 'Okay, that is all!');
                                })
                            } else {
                                bot.reply(message, 'Okay, no problem! Your score of ' + overall + "% has been recorded");
                            }
                        }
                        else {
                            bot.reply(message, 'Whoops! Sorry, I wasn\'t able to record this conversation. Lets try again?')
                        }
                    });
                });
            }
        })
    });
};

function GetOverall(score) {
    var scores = [];
    for (var j = 0; j < score.length - 1; j++) {
        scores.push(score[j] * 25);
    }
    var sum = scores.reduce(function (a, b) { return a + b; }, 0);
    var overall = sum / scores.length;
    overall = Math.round(overall);
    return overall
}
