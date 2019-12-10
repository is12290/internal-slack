module.exports = function (controller) {
    controller.on("interactive_message_callback", function (bot, message) {
        if (message.text == 'self-test') {
            controller.storage.users.get(message.user, function (err, user) {
                if (err) {
                    console.log("error: ", err);
                }
                if (!user) {
                    // Check in convo
                    bot.startConversation(message, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                        }

                        // Keep Score
                        const outcome = {
                            warmth: {},
                            dominance: {},
                            sensitivity: {},
                            stability: {},
                            privateness: {}
                        };

                        convo.addMessage({
                            text: "Cueing the self perception test!"
                        });

                        // Warmth 3
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'warmth-3',
                                    title: '(1/15) I know how to comfort others',
                                    color: '#2F4DED',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.warmth[3] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'warmth-3',
                                                        title: '(1/15) I know how to comfort others',
                                                        color: '#2F4DED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.warmth[3] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'warmth-3',
                                                        title: '(1/15) I know how to comfort others',
                                                        color: '#2F4DED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Sensitivity 2
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'sensitivity-2',
                                    title: '(2/15) I spend time thinking about past mistakes',
                                    color: '#2FC2ED',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.sensitivity[2] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'sensitivity-2',
                                                        title: '(2/15) I spend time thinking about past mistakes',
                                                        color: '#2FC2ED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.sensitivity[2] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'sensitivity-2',
                                                        title: '(2/15) I spend time thinking about past mistakes',
                                                        color: '#2FC2ED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Privateness 3
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'privateness-3',
                                    title: '(3/15) I don\'t talk a lot',
                                    color: '#762FED',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.privateness[3] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'privateness-3',
                                                        title: '(3/15) I don\'t talk a lot',
                                                        color: '#762FED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.privateness[3] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'privateness-3',
                                                        title: '(3/15) I don\'t talk a lot',
                                                        color: '#762FED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Sensitivity 1
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'sensitivity-1',
                                    title: '(4/15) I don\'t worry about things that have already happened',
                                    color: '#C12FED',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.sensitivity[1] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'sensitivity-1',
                                                        title: '(4/15) I don\'t worry about things that have already happened',
                                                        color: '#C12FED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.sensitivity[1] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'sensitivity-1',
                                                        title: '(4/15) I don\'t worry about things that have already happened',
                                                        color: '#C12FED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Stability 3
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'stability-3',
                                    title: '(5/15) I rarely notice my emotional reactions',
                                    color: '#2FEDA8',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.stability[3] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'stability-3',
                                                        title: '(5/15) I rarely notice my emotional reactions',
                                                        color: '#2FEDA8',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.stability[2] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'stability-3',
                                                        title: '(5/15) I rarely notice my emotional reactions',
                                                        color: '#2FEDA8',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Privateness 1
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'privateness-1',
                                    title: '(6/15) I enjoy my privacy',
                                    color: '#2FDCED',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.privateness[1] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'privateness-1',
                                                        title: '(6/15) I enjoy my privacy',
                                                        color: '#2FDCED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.privateness[1] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'privateness-1',
                                                        title: '(6/15) I enjoy my privacy',
                                                        color: '#2FDCED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Warmth 1
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'warmth-1',
                                    title: '(7/15) I try not to think about the needy',
                                    color: '#BAED2F',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.warmth[1] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'warmth-1',
                                                        title: '(7/15) I try not to think about the needy',
                                                        color: '#BAED2F',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.warmth[1] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'warmth-1',
                                                        title: '(7/15) I try not to think about the needy',
                                                        color: '#BAED2F',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Dominance 1
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'dominance-1',
                                    title: '(8/15) I feel uncomfortable giving orders to others',
                                    color: '#EDE62F',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.dominance[1] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'dominance-1',
                                                        title: '(8/15) I feel uncomfortable giving orders to others',
                                                        color: '#EDE62F',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.dominance[1] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'dominance-1',
                                                        title: '(8/15) I feel uncomfortable giving orders to others',
                                                        color: '#EDE62F',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Stability 1
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'stability-1',
                                    title: '(9/15) I am comfortable with myself',
                                    color: '#ED2F2F',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.stability[1] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'stability-1',
                                                        title: '(9/15) I am comfortable with myself',
                                                        color: '#ED2F2F',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.stability[1] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'stability-1',
                                                        title: '(9/15) I am comfortable with myself',
                                                        color: '#ED2F2F',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Privateness 2
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'privateness-2',
                                    title: '(10/15) I read a lot',
                                    color: '#B72FED',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.privateness[2] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'privateness-2',
                                                        title: '(10/15) I read a lot',
                                                        color: '#B72FED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.privateness[2] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'privateness-2',
                                                        title: '(10/15) I read a lot',
                                                        color: '#B72FED',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Dominance 3
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'dominance-3',
                                    title: '(11/15) I feel guilty when I say "no"',
                                    color: '#ED2F74',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.dominance[3] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'dominance-3',
                                                        title: '(11/15) I feel guilty when I say "no"',
                                                        color: '#ED2F74',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.dominance[3] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'dominance-3',
                                                        title: '(11/15) I feel guilty when I say "no"',
                                                        color: '#ED2F74',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Warmth 2
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'warmth-2',
                                    title: '(12/15) I feel others\'s emotions',
                                    color: '#EDD72F',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.warmth[2] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'warmth-2',
                                                        title: '(12/15) I feel others\'s emotions',
                                                        color: '#EDD72F',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.warmth[2] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'warmth-2',
                                                        title: '(12/15) I feel others\'s emotions',
                                                        color: '#EDD72F',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Stability 2
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'stability-2',
                                    title: '(13/15) I get irritated easily',
                                    color: '#ED2F5B',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.stability[2] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'stability-2',
                                                        title: '(13/15) I get irritated easily',
                                                        color: '#ED2F5B',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.stability[2] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'stability-2',
                                                        title: '(13/15) I get irritated easily',
                                                        color: '#ED2F5B',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        // Sensitivity 3
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'sensitivity-3',
                                    title: '(14/15) I cry during movies',
                                    color: '#75ED2F',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.sensitivity[3] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'sensitivity-3',
                                                        title: '(14/15) I cry during movies',
                                                        color: '#75ED2F',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.sensitivity[3] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'sensitivity-3',
                                                        title: '(14/15) I cry during movies',
                                                        color: '#75ED2F',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);


                        // Dominance 2
                        convo.addQuestion({
                            attachments: [
                                {
                                    callback_id: 'dominance-2',
                                    title: '(15/15) I take control of things',
                                    color: '#ED2FCA',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'true-button',
                                            'value': 'True',
                                            'text': 'True',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'false-button',
                                            'value': 'False',
                                            'text': 'False',
                                            'type': 'button'
                                        }
                                    ]
                                }
                            ]
                        }, [
                                {
                                    pattern: 'True',
                                    callback: function (reply, convo) {
                                        outcome.dominance[2] = 1;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'dominance-2',
                                                        title: '(15/15) I take control of things',
                                                        color: '#ED2FCA',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'style': 'primary',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                },
                                {
                                    pattern: 'False',
                                    callback: function (reply, convo) {
                                        outcome.dominance[2] = 0;
                                        bot.replyInteractive(reply,
                                            {
                                                attachments: [
                                                    {
                                                        callback_id: 'dominance-2',
                                                        title: '(15/15) I take control of things',
                                                        color: '#ED2FCA',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'true-button',
                                                                'value': 'True',
                                                                'text': 'True',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'false-button',
                                                                'value': 'False',
                                                                'style': 'danger',
                                                                'text': 'False',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        );
                                        convo.next();
                                    }
                                }]);

                        convo.activate();

                        // capture the results of the conversation and see what happened...
                        convo.on('end', function (convo) {
                            if (convo.successful()) {
                                for (var key in outcome) {
                                    var scores = [outcome[key][1], outcome[key][2], outcome[key][3]];
                                    var overall = (scores.reduce(function (a, b) { return a + b; }, 0) / 3);
                                    outcome[key].score = overall;
                                }

                                controller.storage.users.get(message.user, function (err, user) {
                                    if (err) {
                                        console.log("error: ", err);
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
                                            user.timezone = response.user.tz;
                                            user.id = message.user;
                                            user.team = message.team.id;
                                            user.channel = message.channel;
                                            user.status = {
                                                self: {
                                                    warmth: outcome.warmth.score,
                                                    dominance: outcome.dominance.score,
                                                    sensitivity: outcome.sensitivity.score,
                                                    stability: outcome.stability.score,
                                                    privateness: outcome.privateness.score
                                                }
                                            };
                                            user.history = {
                                                self: {
                                                    [today]: {
                                                        status: {
                                                            warmth: outcome.warmth.score,
                                                            dominance: outcome.dominance.score,
                                                            sensitivity: outcome.sensitivity.score,
                                                            stability: outcome.stability.score,
                                                            privateness: outcome.privateness.score
                                                        }
                                                    }
                                                }
                                            };
                                            controller.storage.users.save(user);
                                        })

                                    } else if (!user.status && !user.history) {
                                        user.status = {
                                            self: {
                                                warmth: outcome.warmth.score,
                                                dominance: outcome.dominance.score,
                                                sensitivity: outcome.sensitivity.score,
                                                stability: outcome.stability.score,
                                                privateness: outcome.privateness.score
                                            }
                                        };
                                        user.history = {
                                            self: {
                                                [today]: {
                                                    status: {
                                                        warmth: outcome.warmth.score,
                                                        dominance: outcome.dominance.score,
                                                        sensitivity: outcome.sensitivity.score,
                                                        stability: outcome.stability.score,
                                                        privateness: outcome.privateness.score
                                                    }
                                                }
                                            }
                                        };
                                        controller.storage.users.save(user);
                                    } else {
                                        user.status.self = {
                                            warmth: (user.status.self.warmth + outcome.warmth.score) / 2,
                                            dominance: (user.status.self.dominance + outcome.dominance.score) / 2,
                                            sensitivity: (user.status.self.sensitivity + outcome.sensitivity.score) / 2,
                                            stability: (user.status.self.stability + outcome.stability.score) / 2,
                                            privateness: (user.status.self.privateness + outcome.privateness.score) / 2,
                                        }
                                        user.history.self[today] = {
                                            warmth: outcome.warmth.score,
                                            dominance: outcome.dominance.score,
                                            sensitivity: outcome.sensitivity.score,
                                            stability: outcome.stability.score,
                                            privateness: outcome.privateness.score
                                        }
                                        controller.storage.users.save(user);
                                    }
                                })

                                // Introversion/Extroversion
                                if (outcome.warmth.score <= 0.5 && outcome.privateness.score >= 0.5) {
                                    var introversion = 'introvert';
                                } else if (outcome.warmth.score > 0.5 && outcome.privateness.score < 0.5) {
                                    var introversion = 'extrovert';
                                } else {
                                    var introversion = 'ambivert';
                                }

                                // Low Anxiety/High Anxiety
                                if (outcome.stability.score > 0.5) {
                                    var anxiety = 'low';
                                } else if (outcome.stability.score < 0.5) {
                                    var anxiety = 'high';
                                } else {
                                    var anxiety = 'moderate';
                                }

                                // Receptiviity/Tough-Mindedness
                                if (outcome.warmth.score > 0.5 && outcome.sensitivity.score > 0.5) {
                                    var receptivity = 'receptive';
                                } else if (outcome.warmth.score < 0.5 && outcome.sensitivity.score < 0.5) {
                                    var receptivity = 'tough-minded';
                                } else {
                                    var receptivity = 'objective';
                                }

                                // Accomodation/Independence
                                if (outcome.dominance.score > 0.5) {
                                    var accommodation = 'independent';
                                } else if (outcome.dominance.score < 0.5) {
                                    var accommodation = 'accommodative';
                                } else {
                                    var accommodation = 'indifferent';
                                }

                                bot.reply(message, "Thanks for letting me get to know you!\nYou're a *" + anxiety + " anxiety " + introversion + "* who tends to be *" + receptivity + "* and *" + accommodation + "*");
                            }
                            else {
                                bot.reply(message, 'Whoops! Sorry, I wasn\'t able to record this conversation. Lets try again?')
                            }
                        });
                    });
                } else {
                    bot.reply(message, "Hey, <@" + message.user + ">! You only need to take your self test once. I'll intermittently ask you questions about yourself to see if your perceptions change :+1:");
                }
            })
        }
    })
}