module.exports = function (controller) {

    controller.hears(['^reflect', '^reflection'], 'direct_message', function (bot, message) {
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
                                text: "Hey! This is the first time we're meeting!! Can I ask two quick questions so that I can properly add you to my memory?",
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
                                                    callback_id: 'new-user',
                                                    text: "Hey! This is the first time we're meeting!! Can I ask two quick questions so that I can properly add you to my memory?",
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
                                                    text: "Hey! This is the first time we're meeting!! Can I ask two quick questions so that I can properly add you to my memory?",
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
                        text: "Hey, here's your end of day reflection! Just choose which option vibes best for each of the 4 topics..."
                    });

                    // Presence
                    convo.addQuestion({
                        attachments: [
                            {
                                title: "Presence",
                                callback_id: 'reflection-presence',
                                attachment_type: 'default',
                                color: '#02D2FF',
                                actions: [
                                    {
                                        'name': 'grounded-button',
                                        'value': 'Grounded',
                                        'text': 'Grounded',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'aware-button',
                                        'value': 'Aware',
                                        'text': 'Aware',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'outOfIt-button',
                                        'value': 'Out-of-It',
                                        'text': 'Out of It',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'disconnected-button',
                                        'value': 'Disconnected',
                                        'text': 'Disconnected',
                                        'type': 'button'
                                    },
                                ]
                            }
                        ]
                    }, [
                            {
                                pattern: 'Grounded',
                                callback: function (reply, convo) {
                                    score.push(4);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Presence",
                                                    callback_id: 'reflection-presence',
                                                    attachment_type: 'default',
                                                    color: '#02D2FF',
                                                    actions: [
                                                        {
                                                            'name': 'grounded-button',
                                                            'value': 'Grounded',
                                                            'style': 'primary',
                                                            'text': 'Grounded',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'aware-button',
                                                            'value': 'Aware',
                                                            'text': 'Aware',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'outOfIt-button',
                                                            'value': 'Out-of-It',
                                                            'text': 'Out of It',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'disconnected-button',
                                                            'value': 'Disconnected',
                                                            'text': 'Disconnected',
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
                                pattern: 'Aware',
                                callback: function (reply, convo) {
                                    score.push(3);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Presence",
                                                    callback_id: 'reflection-presence',
                                                    attachment_type: 'default',
                                                    color: '#02D2FF',
                                                    actions: [
                                                        {
                                                            'name': 'grounded-button',
                                                            'value': 'Grounded',
                                                            'text': 'Grounded',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'aware-button',
                                                            'style': 'primary',
                                                            'value': 'Aware',
                                                            'text': 'Aware',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'outOfIt-button',
                                                            'value': 'Out-of-It',
                                                            'text': 'Out of It',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'disconnected-button',
                                                            'value': 'Disconnected',
                                                            'text': 'Disconnected',
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
                                pattern: 'Out-of-It',
                                callback: function (reply, convo) {
                                    score.push(2);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Presence",
                                                    callback_id: 'reflection-presence',
                                                    attachment_type: 'default',
                                                    color: '#02D2FF',
                                                    actions: [
                                                        {
                                                            'name': 'grounded-button',
                                                            'value': 'Grounded',
                                                            'text': 'Grounded',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'aware-button',
                                                            'value': 'Aware',
                                                            'text': 'Aware',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'outOfIt-button',
                                                            'style': 'primary',
                                                            'value': 'Out-of-It',
                                                            'text': 'Out of It',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'disconnected-button',
                                                            'value': 'Disconnected',
                                                            'text': 'Disconnected',
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
                                pattern: 'Disconnected',
                                callback: function (reply, convo) {
                                    score.push(1);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Presence",
                                                    callback_id: 'reflection-presence',
                                                    attachment_type: 'default',
                                                    color: '#02D2FF',
                                                    actions: [
                                                        {
                                                            'name': 'grounded-button',
                                                            'value': 'Grounded',
                                                            'text': 'Grounded',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'aware-button',
                                                            'value': 'Aware',
                                                            'text': 'Aware',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'outOfIt-button',
                                                            'value': 'Out-of-It',
                                                            'text': 'Out of It',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'disconnected-button',
                                                            'value': 'Disconnected',
                                                            'style': 'primary',
                                                            'text': 'Disconnected',
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
                                callback_id: 'reflection-energy',
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
                                                    callback_id: 'reflection-energy',
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
                                                    callback_id: 'reflection-energy',
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
                                                    callback_id: 'reflection-energy',
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
                                                    callback_id: 'reflection-energy',
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
                                callback_id: 'reflection-mood',
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
                                                    callback_id: 'reflection-mood',
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
                                                    callback_id: 'reflection-mood',
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
                                                    callback_id: 'reflection-mood',
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
                                                    callback_id: 'reflection-mood',
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

                    // fulfillment
                    convo.addQuestion({
                        attachments: [
                            {
                                title: "Fulfillment",
                                callback_id: 'reflection-fulfillment',
                                attachment_type: 'default',
                                color: '#CF02FF',
                                actions: [
                                    {
                                        'name': 'complete-button',
                                        'value': 'Complete',
                                        'text': 'Complete',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'present-button',
                                        'value': 'Present',
                                        'text': 'Present',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'searching-button',
                                        'value': 'Searching',
                                        'text': 'Searching',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'nonExistent-button',
                                        'value': 'Non-Existent',
                                        'text': 'Non-Existent',
                                        'type': 'button'
                                    },
                                ]
                            }
                        ]
                    }, [
                            {
                                pattern: 'Complete',
                                callback: function (reply, convo) {
                                    score.push(4);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Fulfillment",
                                                    callback_id: 'reflection-fulfillment',
                                                    attachment_type: 'default',
                                                    color: '#CF02FF',
                                                    actions: [
                                                        {
                                                            'name': 'complete-button',
                                                            'value': 'Complete',
                                                            'style': 'primary',
                                                            'text': 'Complete',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'present-button',
                                                            'value': 'Present',
                                                            'text': 'Present',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'searching-button',
                                                            'value': 'Searching',
                                                            'text': 'Searching',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'nonExistent-button',
                                                            'value': 'Non-Existent',
                                                            'text': 'Non-Existent',
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
                                pattern: 'Present',
                                callback: function (reply, convo) {
                                    score.push(3);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Fulfillment",
                                                    callback_id: 'reflection-fulfillment',
                                                    attachment_type: 'default',
                                                    color: '#CF02FF',
                                                    actions: [
                                                        {
                                                            'name': 'complete-button',
                                                            'value': 'Complete',
                                                            'text': 'Complete',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'present-button',
                                                            'value': 'Present',
                                                            'style': 'primary',
                                                            'text': 'Present',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'searching-button',
                                                            'value': 'Searching',
                                                            'text': 'Searching',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'nonExistent-button',
                                                            'value': 'Non-Existent',
                                                            'text': 'Non-Existent',
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
                                pattern: 'Searching',
                                callback: function (reply, convo) {
                                    score.push(2);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Fulfillment",
                                                    callback_id: 'reflection-fulfillment',
                                                    attachment_type: 'default',
                                                    color: '#CF02FF',
                                                    actions: [
                                                        {
                                                            'name': 'complete-button',
                                                            'value': 'Complete',
                                                            'text': 'Complete',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'present-button',
                                                            'value': 'Present',
                                                            'text': 'Present',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'searching-button',
                                                            'value': 'Searching',
                                                            'style': 'primary',
                                                            'text': 'Searching',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'nonExistent-button',
                                                            'value': 'Non-Existent',
                                                            'text': 'Non-Existent',
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
                                pattern: 'Non-Existent',
                                callback: function (reply, convo) {
                                    score.push(1);
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    title: "Fulfillment",
                                                    callback_id: 'reflection-fulfillment',
                                                    attachment_type: 'default',
                                                    color: '#CF02FF',
                                                    actions: [
                                                        {
                                                            'name': 'complete-button',
                                                            'value': 'Complete',
                                                            'text': 'Complete',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'present-button',
                                                            'value': 'Present',
                                                            'text': 'Present',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'searching-button',
                                                            'value': 'Searching',
                                                            'text': 'Searching',
                                                            'type': 'button'
                                                        },
                                                        {
                                                            'name': 'nonExistent-button',
                                                            'value': 'Non-Existent',
                                                            'style': 'primary',
                                                            'text': 'Non-Existent',
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
                                        check_out: score,
                                        permission: permission
                                    }
                                };
                                controller.storage.users.save(user);
                            } else if (!user.logs[today]) {
                                user.logs[today] = {
                                    check_out: score,
                                };
                                controller.storage.users.save(user);
                            } else {
                                user.logs[today].check_out = score;
                                controller.storage.users.save(user);
                            }

                            bot.reply(message, "Reflection complete!");
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