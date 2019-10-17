module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == "Yes-Reflect") {
            controller.storage.teams.get(message.team.id, function (err, team) {
                if (err) {
                    console.log("error: ", err);
                }
                if (team.subscription.status == 'inactive') {
                    
                    var text = "It looks like your subscription is up! Would you like to renew?"
                    
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
                                    'url': 'https://getinternal.co/#pricing'
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

                        // Progress
                        convo.addQuestion({
                            attachments: [
                                {
                                    title: "Progress",
                                    callback_id: 'reflection-progress',
                                    attachment_type: 'default',
                                    color: '#02D2FF',
                                    actions: [
                                        {
                                            'name': 'substantial-button',
                                            'value': 'Substantial',
                                            'text': 'Substantial',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'acceptable-button',
                                            'value': 'Acceptable',
                                            'text': 'Acceptable',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'minimal-button',
                                            'value': 'Minimal',
                                            'text': 'Minimal',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'stagnant-button',
                                            'value': 'Stagnant',
                                            'text': 'Stagnant',
                                            'type': 'button'
                                        },
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'Substantial',
                                    callback: function (reply, convo) {
                                        score.push(4);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Progress",
                                                        callback_id: 'reflection-progress',
                                                        attachment_type: 'default',
                                                        color: '#02D2FF',
                                                        actions: [
                                                            {
                                                                'name': 'substantial-button',
                                                                'value': 'Substantial',
                                                                'style': 'primary',
                                                                'text': 'Substantial',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'acceptable-button',
                                                                'value': 'Acceptable',
                                                                'text': 'Acceptable',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'minimal-button',
                                                                'value': 'Minimal',
                                                                'text': 'Minimal',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'stagnant-button',
                                                                'value': 'Stagnant',
                                                                'text': 'Stagnant',
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
                                    pattern: 'Acceptable',
                                    callback: function (reply, convo) {
                                        score.push(3);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Progress",
                                                        callback_id: 'reflection-progress',
                                                        attachment_type: 'default',
                                                        color: '#02D2FF',
                                                        actions: [
                                                            {
                                                                'name': 'substantial-button',
                                                                'value': 'Substantial',
                                                                'text': 'Substantial',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'acceptable-button',
                                                                'value': 'Acceptable',
                                                                'style': 'primary',
                                                                'text': 'Acceptable',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'minimal-button',
                                                                'value': 'Minimal',
                                                                'text': 'Minimal',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'stagnant-button',
                                                                'value': 'Stagnant',
                                                                'text': 'Stagnant',
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
                                    pattern: 'Minimal',
                                    callback: function (reply, convo) {
                                        score.push(2);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Progress",
                                                        callback_id: 'reflection-progress',
                                                        attachment_type: 'default',
                                                        color: '#02D2FF',
                                                        actions: [
                                                            {
                                                                'name': 'substantial-button',
                                                                'value': 'Substantial',
                                                                'text': 'Substantial',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'acceptable-button',
                                                                'value': 'Acceptable',
                                                                'text': 'Acceptable',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'minimal-button',
                                                                'value': 'Minimal',
                                                                'style': 'primary',
                                                                'text': 'Minimal',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'stagnant-button',
                                                                'value': 'Stagnant',
                                                                'text': 'Stagnant',
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
                                    pattern: 'Stagnant',
                                    callback: function (reply, convo) {
                                        score.push(1);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Progress",
                                                        callback_id: 'reflection-progress',
                                                        attachment_type: 'default',
                                                        color: '#02D2FF',
                                                        actions: [
                                                            {
                                                                'name': 'substantial-button',
                                                                'value': 'Substantial',
                                                                'text': 'Substantial',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'acceptable-button',
                                                                'value': 'Acceptable',
                                                                'text': 'Acceptable',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'minimal-button',
                                                                'value': 'Minimal',
                                                                'text': 'Minimal',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'stagnant-button',
                                                                'value': 'Stagnant',
                                                                'style': 'primary',
                                                                'text': 'Stagnant',
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

                        // Frustration
                        convo.addQuestion({
                            attachments: [
                                {
                                    title: "Frustration",
                                    callback_id: 'reflection-frustration',
                                    attachment_type: 'default',
                                    color: '#2A02FF',
                                    actions: [
                                        {
                                            'name': 'nonexistent-button',
                                            'value': 'Nonexistent',
                                            'text': 'Nonexistent',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'present-button',
                                            'value': 'Present',
                                            'text': 'Present',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'considerable-button',
                                            'value': 'Considerable',
                                            'text': 'Considerable',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'peak-button',
                                            'value': 'Peak',
                                            'text': 'Peak',
                                            'type': 'button'
                                        },
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'Nonexistent',
                                    callback: function (reply, convo) {
                                        score.push(4);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Frustration",
                                                        callback_id: 'reflection-frustration',
                                                        attachment_type: 'default',
                                                        color: '#2A02FF',
                                                        actions: [
                                                            {
                                                                'name': 'nonexistent-button',
                                                                'value': 'Nonexistent',
                                                                'style': 'primary',
                                                                'text': 'Nonexistent',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'present-button',
                                                                'value': 'Present',
                                                                'text': 'Present',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'considerable-button',
                                                                'value': 'Considerable',
                                                                'text': 'Considerable',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'peak-button',
                                                                'value': 'Peak',
                                                                'text': 'Peak',
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
                                                        title: "Frustration",
                                                        callback_id: 'reflection-frustration',
                                                        attachment_type: 'default',
                                                        color: '#2A02FF',
                                                        actions: [
                                                            {
                                                                'name': 'nonexistent-button',
                                                                'value': 'Nonexistent',
                                                                'text': 'Nonexistent',
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
                                                                'name': 'considerable-button',
                                                                'value': 'Considerable',
                                                                'text': 'Considerable',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'peak-button',
                                                                'value': 'Peak',
                                                                'text': 'Peak',
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
                                    pattern: 'Considerable',
                                    callback: function (reply, convo) {
                                        score.push(2);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Frustration",
                                                        callback_id: 'reflection-frustration',
                                                        attachment_type: 'default',
                                                        color: '#2A02FF',
                                                        actions: [
                                                            {
                                                                'name': 'nonexistent-button',
                                                                'value': 'Nonexistent',
                                                                'text': 'Nonexistent',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'present-button',
                                                                'value': 'Present',
                                                                'text': 'Present',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'considerable-button',
                                                                'value': 'Considerable',
                                                                'style': 'primary',
                                                                'text': 'Considerable',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'peak-button',
                                                                'value': 'Peak',
                                                                'text': 'Peak',
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
                                    pattern: 'Peak',
                                    callback: function (reply, convo) {
                                        score.push(1);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Frustration",
                                                        callback_id: 'reflection-frustration',
                                                        attachment_type: 'default',
                                                        color: '#2A02FF',
                                                        actions: [
                                                            {
                                                                'name': 'nonexistent-button',
                                                                'value': 'Nonexistent',
                                                                'text': 'Nonexistent',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'present-button',
                                                                'value': 'Present',
                                                                'text': 'Present',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'considerable-button',
                                                                'value': 'Considerable',
                                                                'text': 'Considerable',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'peak-button',
                                                                'value': 'Peak',
                                                                'style': 'primary',
                                                                'text': 'Peak',
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

                        // Work Distribution
                        convo.addQuestion({
                            attachments: [
                                {
                                    title: "Work Distribution",
                                    callback_id: 'reflection-workDistribution',
                                    attachment_type: 'default',
                                    color: '#8A02FF',
                                    actions: [
                                        {
                                            'name': 'equal-button',
                                            'value': 'Equal',
                                            'text': 'Equal',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'fair-button',
                                            'value': 'Fair',
                                            'text': 'Fair',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'me-button',
                                            'value': 'Mostly-Me',
                                            'text': 'Mostly Me',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'them-button',
                                            'value': 'Mostly-Them',
                                            'text': 'Mostly-Them',
                                            'type': 'button'
                                        },
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'Equal',
                                    callback: function (reply, convo) {
                                        score.push(4);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Work Distribution",
                                                        callback_id: 'reflection-workDistribution',
                                                        attachment_type: 'default',
                                                        color: '#8A02FF',
                                                        actions: [
                                                            {
                                                                'name': 'equal-button',
                                                                'value': 'Equal',
                                                                'style': 'primary',
                                                                'text': 'Equal',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'fair-button',
                                                                'value': 'Fair',
                                                                'text': 'Fair',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'me-button',
                                                                'value': 'Mostly-Me',
                                                                'text': 'Mostly Me',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'them-button',
                                                                'value': 'Mostly-Them',
                                                                'text': 'Mostly-Them',
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
                                    pattern: 'Fair',
                                    callback: function (reply, convo) {
                                        score.push(3);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Work Distribution",
                                                        callback_id: 'reflection-workDistribution',
                                                        attachment_type: 'default',
                                                        color: '#8A02FF',
                                                        actions: [
                                                            {
                                                                'name': 'equal-button',
                                                                'value': 'Equal',
                                                                'text': 'Equal',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'fair-button',
                                                                'value': 'Fair',
                                                                'style': 'primary',
                                                                'text': 'Fair',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'me-button',
                                                                'value': 'Mostly-Me',
                                                                'text': 'Mostly Me',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'them-button',
                                                                'value': 'Mostly-Them',
                                                                'text': 'Mostly-Them',
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
                                    pattern: 'Mostly-Me',
                                    callback: function (reply, convo) {
                                        score.push(2);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Work Distribution",
                                                        callback_id: 'reflection-workDistribution',
                                                        attachment_type: 'default',
                                                        color: '#8A02FF',
                                                        actions: [
                                                            {
                                                                'name': 'equal-button',
                                                                'value': 'Equal',
                                                                'text': 'Equal',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'fair-button',
                                                                'value': 'Fair',
                                                                'text': 'Fair',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'me-button',
                                                                'value': 'Mostly-Me',
                                                                'style': 'primary',
                                                                'text': 'Mostly Me',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'them-button',
                                                                'value': 'Mostly-Them',
                                                                'text': 'Mostly-Them',
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
                                    pattern: 'Mostly-Them',
                                    callback: function (reply, convo) {
                                        score.push(1);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Work Distribution",
                                                        callback_id: 'reflection-workDistribution',
                                                        attachment_type: 'default',
                                                        color: '#8A02FF',
                                                        actions: [
                                                            {
                                                                'name': 'equal-button',
                                                                'value': 'Equal',
                                                                'text': 'Equal',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'fair-button',
                                                                'value': 'Fair',
                                                                'text': 'Fair',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'me-button',
                                                                'value': 'Mostly-Me',
                                                                'text': 'Mostly Me',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'them-button',
                                                                'value': 'Mostly-Them',
                                                                'style': 'primary',
                                                                'text': 'Mostly-Them',
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
                                    callback_id: 'reflection-confidence',
                                    attachment_type: 'default',
                                    color: '#CF02FF',
                                    actions: [
                                        {
                                            'name': 'certain-button',
                                            'value': 'Certain',
                                            'text': 'Certain',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'hopeful-button',
                                            'value': 'Hopeful',
                                            'text': 'Hopeful',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'dwindling-button',
                                            'value': 'Dwindling',
                                            'text': 'Dwindling',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'lost-button',
                                            'value': 'Lost',
                                            'text': 'Lost',
                                            'type': 'button'
                                        },
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'Certain',
                                    callback: function (reply, convo) {
                                        score.push(4);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Confidence",
                                                        callback_id: 'reflection-confidence',
                                                        attachment_type: 'default',
                                                        color: '#CF02FF',
                                                        actions: [
                                                            {
                                                                'name': 'certain-button',
                                                                'value': 'Certain',
                                                                'style': 'primary',
                                                                'text': 'Certain',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'hopeful-button',
                                                                'value': 'Hopeful',
                                                                'text': 'Hopeful',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'dwindling-button',
                                                                'value': 'Dwindling',
                                                                'text': 'Dwindling',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'lost-button',
                                                                'value': 'Lost',
                                                                'text': 'Lost',
                                                                'type': 'button'
                                                            },
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        bot.api.reactions.add({
                                            name: 'thumbsup',
                                            channel: reply.channel,
                                            timestamp: reply.ts
                                        });
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'Hopeful',
                                    callback: function (reply, convo) {
                                        score.push(3);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Confidence",
                                                        callback_id: 'reflection-confidence',
                                                        attachment_type: 'default',
                                                        color: '#CF02FF',
                                                        actions: [
                                                            {
                                                                'name': 'certain-button',
                                                                'value': 'Certain',
                                                                'text': 'Certain',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'hopeful-button',
                                                                'value': 'Hopeful',
                                                                'style': 'primary',
                                                                'text': 'Hopeful',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'dwindling-button',
                                                                'value': 'Dwindling',
                                                                'text': 'Dwindling',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'lost-button',
                                                                'value': 'Lost',
                                                                'text': 'Lost',
                                                                'type': 'button'
                                                            },
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        bot.api.reactions.add({
                                            name: 'thumbsup',
                                            channel: reply.channel,
                                            timestamp: reply.ts
                                        });
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'Dwindling',
                                    callback: function (reply, convo) {
                                        score.push(2);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Confidence",
                                                        callback_id: 'reflection-confidence',
                                                        attachment_type: 'default',
                                                        color: '#CF02FF',
                                                        actions: [
                                                            {
                                                                'name': 'certain-button',
                                                                'value': 'Certain',
                                                                'text': 'Certain',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'hopeful-button',
                                                                'value': 'Hopeful',
                                                                'text': 'Hopeful',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'dwindling-button',
                                                                'value': 'Dwindling',
                                                                'style': 'primary',
                                                                'text': 'Dwindling',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'lost-button',
                                                                'value': 'Lost',
                                                                'text': 'Lost',
                                                                'type': 'button'
                                                            },
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        bot.api.reactions.add({
                                            name: 'thumbsup',
                                            channel: reply.channel,
                                            timestamp: reply.ts
                                        });
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'Lost',
                                    callback: function (reply, convo) {
                                        score.push(1);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: "Confidence",
                                                        callback_id: 'reflection-confidence',
                                                        attachment_type: 'default',
                                                        color: '#CF02FF',
                                                        actions: [
                                                            {
                                                                'name': 'certain-button',
                                                                'value': 'Certain',
                                                                'text': 'Certain',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'hopeful-button',
                                                                'value': 'Hopeful',
                                                                'text': 'Hopeful',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'dwindling-button',
                                                                'value': 'Dwindling',
                                                                'text': 'Dwindling',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'lost-button',
                                                                'value': 'Lost',
                                                                'text': 'Lost',
                                                                'style': 'primary',
                                                                'type': 'button'
                                                            },
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        bot.api.reactions.add({
                                            name: 'thumbsup',
                                            channel: reply.channel,
                                            timestamp: reply.ts
                                        });
                                        convo.next();
                                    }
                                }
                            ]);

                        convo.addMessage("Reflection complete!");

                        convo.activate();


                        // capture the results of the conversation and see what happened...
                        convo.on('end', function (convo) {

                            if (convo.successful()) {
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
                                        bot.api.users.info({ user: message.user }, function (error, response) {
                                            if (error) {
                                                console.log("error: ", error);
                                            }
                                            let { name, real_name } = response.user;
                                            user.name = real_name;
                                            user.email = response.user.profile.email;
                                            user.timezone = response.user.tz
                                            user.id = message.user,
                                            user.team = message.team.id,
                                            user.channel = message.channel
                                            user.logs = {
                                                [today]: {
                                                    check_out: score
                                                }
                                            };
                                            controller.storage.users.save(user);
                                        })
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

                                const snapshot = GetSnapshot(score, message.user);
                            if (typeof snapshot != 'undefined') {
                                var error;
                                    bot.say({
                                        attachments: [snapshot],
                                        channel: team.bot.channel
                                    }, function (err, response) {
                                        if (err) {
                                            console.log("Erorr: ", err);
                                            error = true;
                                        }
                                    });
                                if (error == true) {
                                    bot.reply(message, "Sorry!! There has been an error sharing your snapshot. We'll just keep this one to ourselves and I'll be fixed come tomorrow!")
                                } else {
                                    bot.reply(message, "Your snapshot has been recorded and shared successfully!");
                                }
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
        } else if (message.actions[0].value == "No-Reflect") {
            bot.reply(message, "Okay, no worries! I'm ready when you are")
        } else {
            // Pass
        }
    })
}

function GetSnapshot(input, user) {
    // Get qualitative snapshot
    var overview = {
        0: {
            4: 'Substantial',
            3: 'Acceptable',
            2: 'Minimal',
            1: 'Stagnant',
            0: 'Progress'
        },
        1: {
            4: 'Nonexistent',
            3: 'Present',
            2: 'Considerable',
            1: 'Peak',
            0: 'Frustration'
        },
        2: {
            4: 'Equal',
            3: 'Fair',
            2: 'Mostly Me',
            1: 'Mostly Them',
            0: 'Work Distribution'
        },
        3: {
            4: 'Certain',
            3: 'Hopeful',
            2: 'Dwindling',
            1: 'Lost',
            0: 'Confidence'
        }
    };

    var qualitative = [];
    for (var l = 0; l < input.length; l++) {
        qualitative.push(overview[l][input[l]]);
    }

    // Get quantitative overall score
    var scores = [];
    for (var j = 0; j < input.length; j++) {
        if (j == 0) {
            // Progress
            scores.push((input[j] * 25) * 1.2);
        } else if (j == 1) {
            // Frustration
            scores.push((input[j] * 25) * 0.8);
        } else if (j == 2) {
            // Work Distribution
            scores.push((input[j] * 25) * 1.1);
        } else if (j == 2) {
            // Confidence
            scores.push((input[j] * 25) * 0.9);
        }
        
    }
    var sum = scores.reduce(function (a, b) { return a + b; }, 0);
    var overall = sum / scores.length;
    overall = Math.round(overall);

    var colors = ['#02FF57', '#FFE602', '#FF8402', '#FF029D', '#CF02FF', '#2A02FF', '#02D2FF'];
    var attachments = {
        title: '<@' + user + '>\'s End of Day Snapshot',
        color: colors[getRandomInt(0, 6)],
        attachment_type: 'default',
        text: 'Progress: *' + qualitative[0] + '*\nFrustration: *' + qualitative[1] + '*\nWork Distribution: *' + qualitative[2] + '*\nConfidence: *' + qualitative[3] + '*\nScore: *' + overall + '%*'
    };

    return attachments;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}