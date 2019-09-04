module.exports = function (controller) {
    controller.hears(['check in', 'Check in', 'check In', 'Check In'], 'direct_message', function (bot, message) {
        controller.storage.users.get(message.user, function (error, user) {
            if (error) {
                console.log("error: ", err);
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
                                text: "This is the first time we're meeting!! Can I ask two quick questions so that I can properly add you to my memory?",
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
                                                    text: "Would you like to share your overall score with your teammates on the public channel so that they know how you're doing today?",
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
                                    permission: permission[0],
                                }
                                controller.storage.users.save(user);
                            }

                            if (permission == true) {
                                controller.storage.teams.get(message.team, function (err, team) {
                                    console.log("team: ", team);
                                    console.log("Channel: ", team.bot.channel);
                                    console.log("Name: ", user.name);
                                    const overall = GetOverall(score);
                                    if (err) {
                                        console.log("error: ", err);
                                    }
                                    bot.say({
                                        text: user.name + " is feeling around " + overall + "% today",
                                        channel: team.bot.channel
                                    }, function(err, response) {
                                        console.log("Erorr: ", err);
                                    });
                                    bot.reply(message, 'Okay, that is all!');
                                })
                            } else {
                                bot.reply(message, 'Okay, no problem. That is all!');
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
