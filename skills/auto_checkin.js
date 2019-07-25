module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.actions[0].value == "Yes-CheckIn") {
            // Check in convo
            bot.startConversation(message, function (err, convo) {

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
                                    'name': 'ecstatic-button',
                                    'value': 'Ecstatic',
                                    'text': 'Ecstatic',
                                    'type': 'button'
                                },
                                {
                                    'name': 'positive-button',
                                    'value': 'Positive',
                                    'text': 'Positive',
                                    'type': 'button'
                                },
                                {
                                    'name': 'indifferent-button',
                                    'value': 'Indifferent',
                                    'text': 'Indifferent',
                                    'type': 'button'
                                },
                                {
                                    'name': 'miserable-button',
                                    'value': 'Miserable',
                                    'text': 'Miserable',
                                    'type': 'button'
                                },
                            ]
                        }
                    ]
                }, [
                        {
                            pattern: 'Ecstatic',
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
                                                        'name': 'ecstatic-button',
                                                        'value': 'Ecstatic',
                                                        'style': 'primary',
                                                        'text': 'Ecstatic',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'positive-button',
                                                        'value': 'Positive',
                                                        'text': 'Positive',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'indifferent-button',
                                                        'value': 'Indifferent',
                                                        'text': 'Indifferent',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'miserable-button',
                                                        'value': 'Miserable',
                                                        'text': 'Miserable',
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
                            pattern: 'Positive',
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
                                                        'name': 'ecstatic-button',
                                                        'value': 'Ecstatic',
                                                        'text': 'Ecstatic',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'positive-button',
                                                        'value': 'Positive',
                                                        'style': 'primary',
                                                        'text': 'Positive',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'indifferent-button',
                                                        'value': 'Indifferent',
                                                        'text': 'Indifferent',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'miserable-button',
                                                        'value': 'Miserable',
                                                        'text': 'Miserable',
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
                            pattern: 'Indifferent',
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
                                                        'name': 'ecstatic-button',
                                                        'value': 'Ecstatic',
                                                        'text': 'Ecstatic',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'positive-button',
                                                        'value': 'Positive',
                                                        'text': 'Positive',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'indifferent-button',
                                                        'value': 'Indifferent',
                                                        'style': 'primary',
                                                        'text': 'Indifferent',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'miserable-button',
                                                        'value': 'Miserable',
                                                        'text': 'Miserable',
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
                            pattern: 'Miserable',
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
                                                        'name': 'ecstatic-button',
                                                        'value': 'Ecstatic',
                                                        'text': 'Ecstatic',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'positive-button',
                                                        'value': 'Positive',
                                                        'text': 'Positive',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'indifferent-button',
                                                        'value': 'Indifferent',
                                                        'text': 'Indifferent',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'miserable-button',
                                                        'value': 'Miserable',
                                                        'style': 'primary',
                                                        'text': 'Miserable',
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
                            callback: function (reply, convo) {
                                score.push(1);
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
                                convo.next();
                            }
                        }
                    ]);

                controller.storage.teams.get(message.team, function (err, info) {
                    if (typeof info.customization != 'undefined' && typeof info.customization.question != 'undefined') {
                        var custom = info.customization.question;
                        // Confidence
                        convo.addQuestion({
                            attachments: [
                                {
                                    title: custom.topic,
                                    callback_id: 'checkin-' + custom.topic,
                                    attachment_type: 'default',
                                    color: '#02FF92',
                                    actions: [
                                        {
                                            'name': custom.choices[0] + '-button',
                                            'value': custom.choices[0],
                                            'text': custom.choices[0],
                                            'type': 'button'
                                        },
                                        {
                                            'name': custom.choices[1] + '-button',
                                            'value': custom.choices[1],
                                            'text': custom.choices[1],
                                            'type': 'button'
                                        },
                                        {
                                            'name': custom.choices[2] + '-button',
                                            'value': custom.choices[2],
                                            'text': custom.choices[2],
                                            'type': 'button'
                                        },
                                        {
                                            'name': custom.choices[3] + '-button',
                                            'value': custom.choices[3],
                                            'text': custom.choices[3],
                                            'type': 'button'
                                        },
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: custom.choices[0],
                                    callback: function (reply, convo) {
                                        score.push(4);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: custom.topic,
                                                        callback_id: 'checkin-' + custom.topic,
                                                        attachment_type: 'default',
                                                        color: '#02FF92',
                                                        actions: [
                                                            {
                                                                'name': custom.choices[0] + '-button',
                                                                'value': custom.choices[0],
                                                                'style': 'primary',
                                                                'text': custom.choices[0],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[1] + '-button',
                                                                'value': custom.choices[1],
                                                                'text': custom.choices[1],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[2] + '-button',
                                                                'value': custom.choices[2],
                                                                'text': custom.choices[2],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[3] + '-button',
                                                                'value': custom.choices[3],
                                                                'text': custom.choices[3],
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
                                    pattern: custom.choices[1],
                                    callback: function (reply, convo) {
                                        score.push(3);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: custom.topic,
                                                        callback_id: 'checkin-' + custom.topic,
                                                        attachment_type: 'default',
                                                        color: '#02FF92',
                                                        actions: [
                                                            {
                                                                'name': custom.choices[0] + '-button',
                                                                'value': custom.choices[0],
                                                                'text': custom.choices[0],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[1] + '-button',
                                                                'value': custom.choices[1],
                                                                'style': 'primary',
                                                                'text': custom.choices[1],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[2] + '-button',
                                                                'value': custom.choices[2],
                                                                'text': custom.choices[2],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[3] + '-button',
                                                                'value': custom.choices[3],
                                                                'text': custom.choices[3],
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
                                    pattern: custom.choices[2],
                                    callback: function (reply, convo) {
                                        score.push(2);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: custom.topic,
                                                        callback_id: 'checkin-' + custom.topic,
                                                        attachment_type: 'default',
                                                        color: '#02FF92',
                                                        actions: [
                                                            {
                                                                'name': custom.choices[0] + '-button',
                                                                'value': custom.choices[0],
                                                                'text': custom.choices[0],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[1] + '-button',
                                                                'value': custom.choices[1],
                                                                'text': custom.choices[1],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[2] + '-button',
                                                                'value': custom.choices[2],
                                                                'style': 'primary',
                                                                'text': custom.choices[2],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[3] + '-button',
                                                                'value': custom.choices[3],
                                                                'text': custom.choices[3],
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
                                    pattern: custom.choices[3],
                                    callback: function (reply, convo) {
                                        score.push(1);
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        title: custom.topic,
                                                        callback_id: 'checkin-' + custom.topic,
                                                        attachment_type: 'default',
                                                        color: '#02FF92',
                                                        actions: [
                                                            {
                                                                'name': custom.choices[0] + '-button',
                                                                'value': custom.choices[0],
                                                                'text': custom.choices[0],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[1] + '-button',
                                                                'value': custom.choices[1],
                                                                'text': custom.choices[1],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[2] + '-button',
                                                                'value': custom.choices[2],
                                                                'text': custom.choices[2],
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': custom.choices[3] + '-button',
                                                                'value': custom.choices[3],
                                                                'style': 'primary',
                                                                'text': custom.choices[3],
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
                    } else {
                        // Pass
                    }

                });



                convo.activate();


                // capture the results of the conversation and see what happened...
                convo.on('end', function (convo) {

                    if (convo.successful()) {
                        // Compute score
                        var sum = score.reduce(function (a, b) { return a + b; }, 0);
                        score.push(sum);

                        controller.storage.users.get(message.user, function (err, user) {
                            var today = new Date();
                            var dd = String(today.getDate()).padStart(2, '0');
                            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = today.getFullYear();

                            today = mm + '/' + dd + '/' + yyyy;

                            if (!user) {
                                user = {};
                                user.id = message.user,
                                    user.team = message.team,
                                    user.channels = [message.channel]
                                user.logs = {
                                    [today]: {
                                        check_in: score,
                                    }
                                };
                                controller.storage.users.save(user);
                            } else if (!user.logs[today]) {
                                user.logs[today] = {
                                    check_in: score,
                                };
                                controller.storage.users.save(user);
                            } else {
                                user.logs[today].check_in = score;
                                controller.storage.users.save(user);
                            }
                        });

                        bot.reply(message, 'Thanks for checking in!');
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