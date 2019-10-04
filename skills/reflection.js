module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == "Yes-Reflect") {
            controller.storage.teams.get(message.team.id, function (err, team) {
                if (err) {
                    console.log("error: ", err);
                }
                if (team.status.subscription.status == 'inactive' && team.status.trial.status == 'inactive') {
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
                                    'text': 'Yes',
                                    'type': 'button',
                                    'url': 'https://getinternal.co/subscribe'
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
                        if (response.text == 'No-Subscribe') {
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
                    // Reflection convo
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

                        // relationships
                        convo.addQuestion({
                            attachments: [
                                {
                                    title: "Relationships",
                                    callback_id: 'reflection-relationships',
                                    attachment_type: 'default',
                                    color: '#FF029D',
                                    actions: [
                                        {
                                            'name': 'fulfilled-button',
                                            'value': 'Fulfilled',
                                            'text': 'Fulfilled',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'connected-button',
                                            'value': 'Connected',
                                            'text': 'Connected',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'unsatisfied-button',
                                            'value': 'Unsatisfied',
                                            'text': 'Unsatisfied',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'lonely-button',
                                            'value': 'Lonely',
                                            'text': 'Lonely',
                                            'type': 'button'
                                        },
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'Fulfilled',
                                    callback: function (reply, convo) {
                                        score.push(4);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Relationships",
                                                        callback_id: 'reflection-relationships',
                                                        attachment_type: 'default',
                                                        color: '#FF029D',
                                                        actions: [
                                                            {
                                                                'name': 'fulfilled-button',
                                                                'value': 'Fulfilled',
                                                                'style': 'primary',
                                                                'text': 'Fulfilled',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'connected-button',
                                                                'value': 'Connected',
                                                                'text': 'Connected',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'unsatisfied-button',
                                                                'value': 'Unsatisfied',
                                                                'text': 'Unsatisfied',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'lonely-button',
                                                                'value': 'Lonely',
                                                                'text': 'Lonely',
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
                                    pattern: 'Connected',
                                    callback: function (reply, convo) {
                                        score.push(3);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Relationships",
                                                        callback_id: 'reflection-relationships',
                                                        attachment_type: 'default',
                                                        color: '#FF029D',
                                                        actions: [
                                                            {
                                                                'name': 'fulfilled-button',
                                                                'value': 'Fulfilled',
                                                                'text': 'Fulfilled',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'connected-button',
                                                                'value': 'Connected',
                                                                'style': 'primary',
                                                                'text': 'Connected',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'unsatisfied-button',
                                                                'value': 'Unsatisfied',
                                                                'text': 'Unsatisfied',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'lonely-button',
                                                                'value': 'Lonely',
                                                                'text': 'Lonely',
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
                                    pattern: 'Unsatisfied',
                                    callback: function (reply, convo) {
                                        score.push(2);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Relationships",
                                                        callback_id: 'reflection-relationships',
                                                        attachment_type: 'default',
                                                        color: '#FF029D',
                                                        actions: [
                                                            {
                                                                'name': 'fulfilled-button',
                                                                'value': 'Fulfilled',
                                                                'text': 'Fulfilled',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'connected-button',
                                                                'value': 'Connected',
                                                                'text': 'Connected',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'unsatisfied-button',
                                                                'value': 'Unsatisfied',
                                                                'style': 'primary',
                                                                'text': 'Unsatisfied',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'lonely-button',
                                                                'value': 'Lonely',
                                                                'text': 'Lonely',
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
                                    pattern: 'Lonely',
                                    callback: function (reply, convo) {
                                        score.push(1);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Relationships",
                                                        callback_id: 'reflection-relationships',
                                                        attachment_type: 'default',
                                                        color: '#FF029D',
                                                        actions: [
                                                            {
                                                                'name': 'fulfilled-button',
                                                                'value': 'Fulfilled',
                                                                'text': 'Fulfilled',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'connected-button',
                                                                'value': 'Connected',
                                                                'text': 'Connected',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'unsatisfied-button',
                                                                'value': 'Unsatisfied',
                                                                'text': 'Unsatisfied',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'lonely-button',
                                                                'value': 'Lonely',
                                                                'text': 'Lonely',
                                                                'style': 'primary',
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

                        convo.addMessage("Reflection complete!", {}, 'default');

                        convo.activate();


                        // capture the results of the conversation and see what happened...
                        convo.on('end', function (convo) {

                            if (convo.successful()) {
                                // Compute score
                                var sum = score.reduce(function (a, b) { return a + b; }, 0);
                                score.push(sum);

                                controller.storage.users.get(message.user, function (err, user) {
                                    if (err) {
                                        console.log("error: ", err);
                                        convo.say("I'm so sorry, I don't remember what you said. Would you mind reflecting again? :grimacing:")
                                    }
                                    var today = new Date();
                                    var dd = String(today.getDate()).padStart(2, '0');
                                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                    var yyyy = today.getFullYear();

                                    today = mm + '/' + dd + '/' + yyyy;

                                    if (!user) {
                                        user = {};
                                        bot.api.users.info({ user: message.user }, (error, response) => {
                                            if (error) {
                                                console.log("error: ", error);
                                            }
                                            let { name, real_name } = response.user;
                                            user.name = real_name;
                                            user.email = response.user.profile.email;
                                            user.timezone = response.user.tz
                                            user.id = message.user,
                                            user.team = message.team,
                                            user.channel = message.channel
                                            user.logs = {
                                                [today]: {
                                                    check_out: score,
                                                    permission: permission[0]
                                                }
                                            };
                                        })
                                        controller.storage.users.save(user);
                                    } else if (!user.logs) {
                                        user.logs = {
                                            [today]: {
                                                check_out: score
                                            }
                                        }
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
                                });

                                bot.reply(message, 'Thanks for reflecting!');
                            }
                            else {
                                bot.reply(message, 'Whoops! Sorry, I wasn\'t able to record this conversation. Lets try again?')
                            }
                        });
                    });
                }
            })
        } else if (message.actions[0].value == "No-Reflect") {
            bot.reply(message, "Okay, no worries! I'm ready when you are")
        } else {
            // Pass
        }
    })
}