module.exports = function (controller) {
    controller.on('app_home_opened', function (bot, message) {
        bot.api.users.info({ user: message.user }, function (err, api_user) {
            if (err) {
                console.log("error: ", err);
            }
            controller.storage.teams.get(api_user.team, function (err, team) {
                if (err) {
                    console.log("error: ", err);
                }
                if (team.status.subscription.status == 'inactive' && team.status.trial.status == 'inactive') {
                    // Subscribe message
                    if (team.status.trial.status == 'inactive' && team.status.subscription.seats_used == 0) {
                        var text = "Your trial is up! Would you like to purchase a subscription?"
                    } else if (team.status.subscription.status == 'inactive' && team.status.subscription.seats_used > 0) {
                        var text = "It looks like your subscription is up! Would you like to renew?"
                    }
                    bot.reply(message, {
                        attachments: [{
                            title: "Subscribe",
                            text: text,
                            callback_id: 'subscribe',
                            color: "#0294ff",
                            attachment_type: 'default',
                            actions: [
                                {
                                    'name': 'yes-button',
                                    'value': 'Yes-Subscribe',
                                    'text': 'Yes',
                                    'type': 'button'
                                },
                                {
                                    'name': 'no-button',
                                    'value': 'No-Subscribe',
                                    'text': 'No',
                                    'type': 'button'
                                }
                            ]
                        }]
                    }, function (err, response) {
                        if (response.text == 'Yes-Subscribe') {
                            bot.replyInteractive(response, {
                                attachments: [{
                                    title: "Subscribe",
                                    text: text,
                                    callback_id: 'subscribe',
                                    color: "#0294ff",
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'yes-button',
                                            'value': 'Yes-Subscribe',
                                            'style': 'primary',
                                            'text': 'Yes',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'no-button',
                                            'value': 'No-Subscribe',
                                            'text': 'No',
                                            'type': 'button'
                                        }
                                    ]
                                }]
                            })
                        } else if (response.text == 'No-Subscribe') {
                            bot.replyInteractive(response, {
                                attachments: [{
                                    title: "Subscribe",
                                    text: text,
                                    callback_id: 'subscribe',
                                    color: "#0294ff",
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'yes-button',
                                            'value': 'Yes-Subscribe',
                                            'text': 'Yes',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'no-button',
                                            'value': 'No-Subscribe',
                                            'style': 'danger',
                                            'text': 'No',
                                            'type': 'button'
                                        }
                                    ]
                                }]
                            })
                        }
                    })
                } else {
                    bot.api.conversations.history({ token: bot.config.token, channel: message.channel }, function (err, response) {
                        if (err) {
                            console.log("Error: ", err);
                        }
                        if (response.messages.length < 2) {
                            controller.storage.users.get(message.user, function (err, user) {
                                if (err) {
                                    console.log("error: ", err);
                                    convo.say("I'm so sorry, I don't remember what you said. Would you mind reflecting again? :grimacing:")
                                }
                                // Tutorial
                                if (team.status.subscription.status == 'active') {
                                    team.status.subscription.seats_used = team.status.subscription.seats_used + 1;
                                    controller.storage.teams.save(team);
                                }
                                bot.startConversation(message, function (err, convo) {
                                    if (err) {
                                        console.log("error: ", err);
                                    }

                                    if (!user) {
                                        user = {};
                                        let { name, real_name } = api_user.user;
                                        user.name = real_name;
                                        user.email = api_user.user.profile.email;
                                        user.timezone = api_user.user.tz
                                        user.id = message.user,
                                        user.team = api_user.team,
                                        user.channel = message.channel
                                        
                                        
                                    }

                                    var conversation = '';
                                    convo.addQuestion({
                                        attachments: [
                                            {
                                                title: 'Tutorial',
                                                color: '#02D2FF',
                                                callback_id: 'tutorial',
                                                text: 'Nice to meet you <@' + message.user + '>! Would you like to learn how I work?',
                                                attachment_type: 'default',
                                                actions: [
                                                    {
                                                        'name': 'tutorial-button',
                                                        'value': 'Yes-Tutorial',
                                                        'text': 'Tutorial',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'no-button',
                                                        'value': 'No-Tutorial',
                                                        'text': 'No Thanks',
                                                        'type': 'button'
                                                    }
                                                ]
                                            }
                                        ]
                                    }, [
                                            {
                                                pattern: 'Yes-Tutorial',
                                                callback: function (reply, convo) {
                                                    bot.replyInteractive(reply, {
                                                        attachments: [
                                                            {
                                                                title: 'Tutorial',
                                                                color: '#02D2FF',
                                                                callback_id: 'tutorial',
                                                                text: 'Nice to meet you <@' + message.user + '>! Would you like to learn how I work?',
                                                                attachment_type: 'default',
                                                                actions: [
                                                                    {
                                                                        'name': 'tutorial-button',
                                                                        'value': 'Yes-Tutorial',
                                                                        'style': 'primary',
                                                                        'text': 'Tutorial',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'no-button',
                                                                        'value': 'No-Tutorial',
                                                                        'text': 'No Thanks',
                                                                        'type': 'button'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    })
                                                    conversation = conversation + 'Yes';
                                                    convo.next();
                                                }
                                            },
                                            {
                                                pattern: 'No-Tutorial',
                                                callback: function (reply, convo) {
                                                    bot.replyInteractive(reply, {
                                                        attachments: [
                                                            {
                                                                title: 'Tutorial',
                                                                color: '#02D2FF',
                                                                callback_id: 'tutorial',
                                                                text: 'Nice to meet you <@' + message.user + '>! Would you like to learn how I work?',
                                                                attachment_type: 'default',
                                                                actions: [
                                                                    {
                                                                        'name': 'tutorial-button',
                                                                        'value': 'Yes-Tutorial',
                                                                        'text': 'Tutorial',
                                                                        'type': 'button'
                                                                    },
                                                                    {
                                                                        'name': 'no-button',
                                                                        'value': 'No-Tutorial',
                                                                        'style': 'danger',
                                                                        'text': 'No Thanks',
                                                                        'type': 'button'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    })
                                                    bot.reply(message, "Oh, okay!")
                                                    controller.storage.users.save(user);
                                                    convo.stop();
                                                }
                                            }
                                        ])

                                    convo.say("Perfect! To start off, the source of all the value that I can create is dependent upon your ability to carry out two super fast logs at the beginning and end of your day. We're going to run through checking in right now...");

                                    // Keep Score
                                    const score = [];

                                    convo.addMessage({
                                        text: "Here's your check in questionnaire! Just log which option vibes best for each of the 4 topics"
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

                                    convo.addMessage("That's it for the check in log - pretty easy, right? The reflection log is just as simple and completed at the end of the day. I know it's hard to remember to carry them out yourself so I send reminders every weekday morning and evening in your local time");


                                    const permission = [];
                                    convo.addQuestion({
                                        attachments: [
                                            {
                                                callback_id: 'permission',
                                                text: "Would you like to share your overall score with your teammates so that they know how you're doing today? This score is shared in the public Internal channel",
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
                                                                    text: "Would you like to share your overall score with your teammates so that they know how you're doing today? This score is shared in the public Internal channel",
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
                                                                }
                                                            ]
                                                        }
                                                    )
                                                    permission.push(true);
                                                    bot.api.reactions.add({
                                                        name: 'thumbsup',
                                                        channel: reply.channel,
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
                                                                    text: "Would you like to share your overall score with your teammates so that they know how you're doing today? This score is shared in the public Internal channel",
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
                                                                }
                                                            ]
                                                        }
                                                    );
                                                    permission.push(false);
                                                    bot.api.reactions.add({
                                                        name: 'thumbsup',
                                                        channel: reply.channel,
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
                                            if (conversation == 'Yes') {
                                            // Compute score
                                            var sum = score.reduce(function (a, b) { return a + b; }, 0);
                                            score.push(sum);

                                            var today = new Date();
                                            var dd = String(today.getDate()).padStart(2, '0');
                                            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                            var yyyy = today.getFullYear();

                                            today = mm + '/' + dd + '/' + yyyy;

                                            if (!user.logs) {
                                                user.logs = {
                                                    [today]: {
                                                        check_in: score,
                                                        permission: permission[0]
                                                    }
                                                };
                                                controller.storage.users.save(user);
                                            } else {
                                                user.logs[today] = {
                                                    check_in: score,
                                                    permission: permission[0],
                                                }
                                                controller.storage.users.save(user);
                                            }


                                            if (permission[0] == true) {
                                                const overall = GetOverall(score);
                                                if (err) {
                                                    console.log("error: ", err);
                                                }
                                                var error;
                                                if (overall > 90) {
                                                    bot.say({
                                                        text: "<@" + message.user + "> is feeling " + overall + "% today :rocket:",
                                                        channel: team.bot.channel
                                                    }, function (err, response) {
                                                        if (err) {
                                                            console.log("Erorr: ", err);
                                                            error = true;
                                                        }
                                                    });
                                                } else {
                                                    bot.say({
                                                        text: "<@" + message.user + "> is feeling " + overall + "% today",
                                                        channel: team.bot.channel
                                                    }, function (err, response) {
                                                        if (err) {
                                                            console.log("Erorr: ", err);
                                                            error = true;
                                                        }
                                                    });
                                                }
                                                if (error == true) {
                                                    bot.reply(message, "Sorry!! There has been an error sharing your score. We'll just keep this one to ourselves and I'll be fixed come tomorrow!")
                                                } else {
                                                    bot.reply(message, "Your score of " + overall + "% has been shared successfully in <#" + team.bot.channel + ">!");
                                                    bot.reply(message, "And that's it! I'll automatically send you all of your weekly and monthly emotional reports I gather at the end of every week and month. I also send weekly and monthly team reports to <#" + team.bot.channel + "> for you to get a feeling of how your team is doing!");
                                                }
                                            } else {
                                                bot.reply(message, 'Okay, no problem! Your score of ' + overall + "% has been recorded");
                                            }
                                            }
                                        }
                                        else {
                                            bot.reply(message, 'Whoops! Something has gone awry')
                                        }
                                    });


                                })
                            });
                        } else if (response.messages[0].text == 'Ready to check in?' || response.messages[0].text == 'Ready to reflect?' || response.message[0].text == 'Hiya! What are you looking to do?' || response.message[0].text == 'Whoops! Subscribe for continued access') {
                            // Pass
                        } else {
                            // Show help message
                            bot.reply(message, {
                                text: "Hiya! What are you looking to do?",
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
                                        text: "Monitor your or your team's emotional well-being overtime",
                                        actions: [
                                            {
                                                'name': 'Report-button',
                                                'value': 'Generate-Report',
                                                'text': 'Generate Report',
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
                                    }
                                ]
                            })
                        }
                    });
                }
            })
        })
    })
}


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