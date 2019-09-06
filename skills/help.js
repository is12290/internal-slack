module.exports = function (controller) {
    controller.hears(['^help', '^info'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.users.get(message.user, function (error, user) {
            if (error) {
                console.log("error: ", error);
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

            } else {
                if (user.status == 'manager') {
                    bot.say({
                        text: "I'm here to help!",
                        channel: message.channel,
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
                                callback_id: 'report',
                                attachment_type: 'default',
                                text: "Monitor you and your team's emotional well-being overtime",
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
                                    },
                                    {
                                        'name': 'Daily-Team-Report-button',
                                        'value': 'Daily-Team-Report',
                                        'text': 'Daily Team Report',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'Weekly-Team-Report-button',
                                        'value': 'Weekly-Team-Report',
                                        'text': 'Weekly Team Report',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'Monthly-Team-Report-button',
                                        'value': 'Monthly-Team-Report',
                                        'text': 'Monthly Team Report',
                                        'type': 'button'
                                    }
                                ]
                            },
                            {
                                title: 'Special Actions',
                                color: '#8A02FF',
                                callback_id: 'actions',
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
                                    },
                                    {
                                        'name': 'Compare-Team-Scores-button',
                                        'value': 'Compare-Team-Scores',
                                        'text': 'Compare Team Scores',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'Historic-Team-Search-button',
                                        'value': 'Historic-Team-Search',
                                        'text': 'Historic Team Search',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'Channel-Specific-Report-button',
                                        'value': 'Channel-Specific-Report',
                                        'text': 'Channel-Specific Report',
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
                                    },
                                    {
                                        'name': 'Customize-Team-Reports-button',
                                        'value': 'Customize-Team-Reports',
                                        'text': 'Customize Team Reports',
                                        'type': 'button'
                                    }
                                ]
                            },
                        ]
                    });
                } else if (user.status != 'manager') {
                    bot.reply(message, {
                        text: "I'm here to help!",
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
                            },
                            {
                                title: 'Subscribe',
                                callback_id: 'subscribe',
                                color: '#FF029D',
                                attachment_type: 'default',
                                text: "Upgrade to manager status to view team emotional trends",
                                actions: [
                                    {
                                        'name': 'subscribe-button',
                                        'url': 'https://getinternal.co/#pricing',
                                        'text': 'Upgrade',
                                        'type': 'button'
                                    }
                                ]
                            }
                        ]
                    })
                }
            }
        })
    });
};