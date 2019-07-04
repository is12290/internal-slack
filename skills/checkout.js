module.exports = function (controller) {

    controller.hears(['check out', 'Check out', 'check Out', 'Check Out'], 'direct_message', function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            // Keep Score
            const score = [];

            convo.addMessage({
                text: "Hey, here's your check out questionnaire! Just choose which option vibes best for each of the 4 topics..."
            });

            // Efficiency
            convo.addQuestion({
                attachments: [
                    {
                        title: "Efficiency",
                        callback_id: 'checkout-efficiency',
                        attachment_type: 'default',
                        color: '#FF029D',
                        actions: [
                            {
                                'name': 'overdrive-button',
                                'value': 'Overdrive',
                                'text': 'Overdrive',
                                'type': 'button'
                            },
                            {
                                'name': 'normal-button',
                                'value': 'Normal',
                                'text': 'Normal',
                                'type': 'button'
                            },
                            {
                                'name': 'slow-button',
                                'value': 'Slow',
                                'text': 'Slow',
                                'type': 'button'
                            },
                            {
                                'name': 'dragging-button',
                                'value': 'Dragging',
                                'text': 'Dragging',
                                'type': 'button'
                            },
                        ]
                    }
                ]
            }, [
                    {
                        pattern: 'Overdrive',
                        callback: function (reply, convo) {
                            score.push(4);
                            bot.replyInteractive(reply,
                                {
                                    attachments: [
                                        {
                                            title: "Efficiency",
                                            callback_id: 'checkout-efficiency',
                                            attachment_type: 'default',
                                            color: '#FF029D',
                                            actions: [
                                                {
                                                    'name': 'overdrive-button',
                                                    'value': 'Overdrive',
                                                    'style': 'primary',
                                                    'text': 'Overdrive',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'normal-button',
                                                    'value': 'Normal',
                                                    'text': 'Normal',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'slow-button',
                                                    'value': 'Slow',
                                                    'text': 'Slow',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'dragging-button',
                                                    'value': 'Dragging',
                                                    'text': 'Dragging',
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
                        pattern: 'Normal',
                        callback: function (reply, convo) {
                            score.push(3);
                            bot.replyInteractive(reply,
                                {
                                    attachments: [
                                        {
                                            title: "Efficiency",
                                            callback_id: 'checkout-efficiency',
                                            attachment_type: 'default',
                                            color: '#FF029D',
                                            actions: [
                                                {
                                                    'name': 'overdrive-button',
                                                    'value': 'Overdrive',
                                                    'text': 'Overdrive',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'normal-button',
                                                    'value': 'Normal',
                                                    'style': 'primary',
                                                    'text': 'Normal',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'slow-button',
                                                    'value': 'Slow',
                                                    'text': 'Slow',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'dragging-button',
                                                    'value': 'Dragging',
                                                    'text': 'Dragging',
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
                        pattern: 'Slow',
                        callback: function (reply, convo) {
                            score.push(2);
                            bot.replyInteractive(reply,
                                {
                                    attachments: [
                                        {
                                            title: "Efficiency",
                                            callback_id: 'checkout-efficiency',
                                            attachment_type: 'default',
                                            color: '#FF029D',
                                            actions: [
                                                {
                                                    'name': 'overdrive-button',
                                                    'value': 'Overdrive',
                                                    'text': 'Overdrive',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'normal-button',
                                                    'value': 'Normal',
                                                    'text': 'Normal',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'slow-button',
                                                    'value': 'Slow',
                                                    'style': 'primary',
                                                    'text': 'Slow',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'dragging-button',
                                                    'value': 'Dragging',
                                                    'text': 'Dragging',
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
                        pattern: 'Dragging',
                        callback: function (reply, convo) {
                            score.push(1);
                            bot.replyInteractive(reply,
                                {
                                    attachments: [
                                        {
                                            title: "Efficiency",
                                            callback_id: 'checkout-efficiency',
                                            attachment_type: 'default',
                                            color: '#FF029D',
                                            actions: [
                                                {
                                                    'name': 'overdrive-button',
                                                    'value': 'Overdrive',
                                                    'text': 'Overdrive',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'normal-button',
                                                    'value': 'Normal',
                                                    'text': 'Normal',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'slow-button',
                                                    'value': 'Slow',
                                                    'text': 'Slow',
                                                    'type': 'button'
                                                },
                                                {
                                                    'name': 'dragging-button',
                                                    'value': 'Dragging',
                                                    'style': 'primary',
                                                    'text': 'Dragging',
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

            // Mood
            convo.addQuestion({
                attachments: [
                    {
                        title: "Mood",
                        callback_id: 'checkout-mood',
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
                                            callback_id: 'checkout-mood',
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
                                            callback_id: 'checkout-mood',
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
                                            callback_id: 'checkout-mood',
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
                                            callback_id: 'checkout-mood',
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

            // Fulfillment
            convo.addQuestion({
                attachments: [
                    {
                        title: "Fulfillment",
                        callback_id: 'checkin-motivation',
                        attachment_type: 'default',
                        color: '#FF8402',
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
                                            callback_id: 'checkin-motivation',
                                            attachment_type: 'default',
                                            color: '#FF8402',
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
                                            callback_id: 'checkin-motivation',
                                            attachment_type: 'default',
                                            color: '#FF8402',
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
                                            callback_id: 'checkin-motivation',
                                            attachment_type: 'default',
                                            color: '#FF8402',
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
                                            callback_id: 'checkin-motivation',
                                            attachment_type: 'default',
                                            color: '#FF8402',
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
                                    check_out: score,
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
                    });

                    bot.reply(message, 'Thanks for checking out!');


                }


            });
        });

    });

};