module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.actions[0].value == "Yes-CheckIn") {
            // Check in convo
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

                var message_team;
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
                                message_team = reply.team;
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
                                message_team = reply.team;
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
                                message_team = reply.team;
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
                                message_team = reply.team;
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

                const permission = [];
                convo.addQuestion({
                    attachments: [
                        {
                            callback_id: 'permission',
                            text: "Would you like to share your overall score with your teammates so that they know how you're doing today?",
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
                                                text: "Would you like to share your overall score with your teammates so that they know how you're doing today?",
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
                                                text: "Would you like to share your overall score with your teammates so that they know how you're doing today?",
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
                        // Compute score
                        var sum = score.reduce(function (a, b) { return a + b; }, 0);
                        score.push(sum);

                        controller.storage.users.get(message.user, function (err, user) {
                            console.log("User: ", user);
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
                                user.id = message.user,
                                    user.team = message.team,
                                    user.channel = message.channel
                                user.logs = {
                                    [today]: {
                                        check_in: score,
                                        permission: permission[0]
                                    }
                                };
                                controller.storage.users.save(user);
                            } else if (!user.logs) {
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
                        });

                        if (permission[0] == true) {
                            controller.storage.teams.get(message.team.id, function (err, team) {
                                console.log("Team: ", team);
                                const overall = GetOverall(score);
                                if (err) {
                                    console.log("error: ", err);
                                }
                                var error;
                                bot.say({
                                    text: "<@" + message.user + "> is feeling " + overall + "% today",
                                    channel: team.bot.channel
                                }, function(err, response) {
                                    if (err) {
                                        console.log("Erorr: ", err);
                                        error = true;
                                    }
                                });
                                if (error == true) {
                                    bot.reply(message, "Sorry!! There has been an error sharing your score. We'll just keep this one to ourselves and I'll be fixed come tomorrow!")
                                } else {
                                bot.reply(message, "Your score has been shared successfully in <#" + team.bot.channel + ">!");
                                }
                            })
                        } else {
                            // nuthin
                        }
                        bot.reply(message, 'Okay, that is all! Thank you');
                    }
                    else {
                        bot.reply(message, 'Whoops! Sorry, I wasn\'t able to record this conversation. Lets try again?')
                    }
                });
            });
        } else if (message.actions[0].value == "No-CheckIn") {
            bot.reply(message, "Okay, no worries! I'm ready when you are")
        } else {
            // Pass
        }
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