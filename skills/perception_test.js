module.exports = function (controller) {
    controller.on("interactive_message_callback", function (bot, message) {
        if (message.text == "peer-test") {
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

                var workspace_members = [];
                bot.api.users.list({ token: bot.config.token }, function (err, api_response) {
                    if (err) {
                        console.log("error: ", err);
                    }

                    convo.addMessage({
                        text: "Cueing the peer perception test! None of your answers are shared with anyone but me."
                    });

                    var member_directory = {};

                    for (var l = 0; l < api_response.members.length; l++) {
                        var instance = api_response.members[l];
                        workspace_members.push({ "text": instance.real_name, "value": instance.id });
                        member_directory[instance.id] = instance.real_name;
                    };

                    var subject = '';
                    var peer_name = '';
                    convo.addQuestion({
                        attachments: [
                            {
                                text: "This is in regards to your perception of...",
                                callback_id: "user",
                                attachment_type: "default",
                                color: '#ED462F',
                                actions: [
                                    {
                                        "name": "Peer",
                                        "text": "Peer",
                                        "type": "select",
                                        "options": workspace_members
                                    }
                                ]
                            }
                        ]
                    }, function (response, convo) {
                        subject = subject + response.text;
                        peer_name = peer_name + member_directory[subject];
                        convo.next();
                    })

                    // Dominance 3
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'dominance-3',
                                title: '(1/15) Coworker can take strong measures',
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
                                    outcome.dominance[3] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'dominance-3',
                                                    title: '(1/15) ' + peer_name + ' can take strong measures',
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
                                    outcome.dominance[3] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'dominance-3',
                                                    title: '(1/15) ' + peer_name + ' can take strong measures',
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

                    // Warmth 2
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'warmth-2',
                                title: '(2/15) Coworker doesn\'t like to get involved in other\'s problems',
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
                                    outcome.warmth[2] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'warmth-2',
                                                    title: '(2/15) ' + peer_name + ' doesn\'t like to get involved in other\'s problems',
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
                                    outcome.warmth[2] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'warmth-2',
                                                    title: '(2/15) ' + peer_name + ' doesn\'t like to get involved in other\'s problems',
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
                                title: '(3/15) Coworker reveals little about themself',
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
                                                    title: '(3/15) ' + peer_name + ' reveals little about themself',
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
                                                    title: '(3/15) ' + peer_name + ' reveals little about themself',
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

                    // Sensitivity 2
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'sensitivity-2',
                                title: '(4/15) Coworker is easily put out',
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
                                    outcome.sensitivity[2] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'sensitivity-2',
                                                    title: '(4/15) ' + peer_name + ' is easily put out',
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
                                    outcome.sensitivity[2] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'sensitivity-2',
                                                    title: '(4/15) ' + peer_name + ' is easily put out',
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

                    // Stability 1
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'stability-1',
                                title: '(5/15) Coworker is not easily annoyed',
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
                                    outcome.stability[1] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'stability-1',
                                                    title: '(5/15) ' + peer_name + ' is not easily annoyed',
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
                                    outcome.stability[1] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'stability-1',
                                                    title: '(5/15) ' + peer_name + ' is not easily annoyed',
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

                    // Warmth 3
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'warmth-3',
                                title: '(6/15) Coworker knows how to comfort others',
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
                                    outcome.warmth[3] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'warmth-3',
                                                    title: '(6/15) ' + peer_name + ' knows how to comfort others',
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
                                    outcome.warmth[3] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'warmth-3',
                                                    title: '(6/15) ' + peer_name + ' knows how to comfort others',
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

                    // Sensitivity 1
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'sensitivity-1',
                                title: '(7/15) Coworker shows their feelings',
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
                                    outcome.sensitivity[1] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'sensitivity-1',
                                                    title: '(7/15) ' + peer_name + ' shows their feelings',
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
                                    outcome.sensitivity[1] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'sensitivity-1',
                                                    title: '(7/15) ' + peer_name + ' shows their feelings',
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

                    // Privateness 2
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'privateness-2',
                                title: '(8/15) Coworker is hard to get to know',
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
                                    outcome.privateness[2] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'privateness-2',
                                                    title: '(8/15) ' + peer_name + ' is hard to get to know',
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
                                    outcome.privateness[2] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'privateness-2',
                                                    title: '(8/15) ' + peer_name + ' is hard to get to know',
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

                    // Dominance 1
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'dominance-1',
                                title: '(9/15) Coworker lets others make the decisions',
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
                                    outcome.dominance[1] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'dominance-1',
                                                    title: '(9/15) ' + peer_name + ' lets others make the decisions',
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
                                    outcome.dominance[1] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'dominance-1',
                                                    title: '(9/15) ' + peer_name + ' lets others make the decisions',
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

                    // Warmth 1
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'warmth-1',
                                title: '(10/15) Coworker makes people feel at ease',
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
                                    outcome.warmth[1] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'warmth-1',
                                                    title: '(10/15) ' + peer_name + ' makes people feel at ease',
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
                                    outcome.warmth[1] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'warmth-1',
                                                    title: '(10/15) ' + peer_name + ' makes people feel at ease',
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

                    // Stability 3
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'stability-3',
                                title: '(11/15) Coworker has frequent mood swings',
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
                                    outcome.stability[3] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'stability-3',
                                                    title: '(11/15) ' + peer_name + ' has frequent mood swings',
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
                                    outcome.stability[2] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'stability-3',
                                                    title: '(11/15) ' + peer_name + ' has frequent mood swings',
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

                    // Dominance 2
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'dominance-2',
                                title: '(12/15) Coworker takes charge',
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
                                    outcome.dominance[2] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'dominance-2',
                                                    title: '(12/15) ' + peer_name + ' takes charge',
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
                                    outcome.dominance[2] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'dominance-2',
                                                    title: '(12/15) ' + peer_name + ' takes charge',
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

                    // Privateness 1
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'privateness-1',
                                title: '(13/15) Coworker doesn\'t talk a lot',
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
                                    outcome.privateness[1] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'privateness-1',
                                                    title: '(13/15) ' + peer_name + ' doesn\'t talk a lot',
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
                                    outcome.privateness[1] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'privateness-1',
                                                    title: '(13/15) ' + peer_name + ' doesn\'t talk a lot',
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
                                title: '(14/15) Coworker is easily discouraged',
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
                                                    title: '(14/15) ' + peer_name + ' is easily discouraged',
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
                                                    title: '(14/15) ' + peer_name + ' is easily discouraged',
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

                    // Stability 2
                    convo.addQuestion({
                        attachments: [
                            {
                                callback_id: 'stability-2',
                                title: '(15/15) Coworker is relaxed most of the time',
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
                                    outcome.stability[2] = 1;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'stability-2',
                                                    title: '(15/15) ' + peer_name + ' is relaxed most of the time',
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
                                    outcome.stability[2] = 0;
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [
                                                {
                                                    callback_id: 'stability-2',
                                                    title: '(15/15) ' + peer_name + ' is relaxed most of the time',
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
                            controller.storage.users.find({ team: message.team }, function (err, team_members) {
                                if (err) {
                                    console.log("error: ", err);
                                }

                                // Introversion/Extroversion
                                if (outcome.warmth.score <= 0.5 && outcome.privateness.score >= 0.5) {
                                    var peer_introversion = 'introvert';
                                } else if (outcome.warmth.score > 0.5 && outcome.privateness.score < 0.5) {
                                    var peer_introversion = 'extrovert';
                                } else {
                                    var peer_introversion = 'ambivert';
                                }

                                // Low Anxiety/High Anxiety
                                if (outcome.stability.score > 0.5) {
                                    var peer_anxiety = 'low';
                                } else if (outcome.stability.score < 0.5) {
                                    var peer_anxiety = 'high';
                                } else {
                                    var peer_anxiety = 'moderate';
                                }

                                // Receptiviity/Tough-Mindedness
                                if (outcome.warmth.score > 0.5 && outcome.sensitivity.score > 0.5) {
                                    var peer_receptivity = 'receptive';
                                } else if (outcome.warmth.score < 0.5 && outcome.sensitivity.score < 0.5) {
                                    var peer_receptivity = 'tough-minded';
                                } else {
                                    var peer_receptivity = 'objective';
                                }

                                // Accomodation/Independence
                                if (outcome.dominance.score > 0.5) {
                                    var peer_accommodation = 'independent';
                                } else if (outcome.dominance.score < 0.5) {
                                    var peer_accommodation = 'accommodative';
                                } else {
                                    var peer_accommodation = 'indifferent';
                                }

                                // checking if internal has memory of peer
                                for (var k = 0; k < team_members.length; k++) {
                                    var member_instance = team_members[k];
                                    if (member_instance.id == subject) {
                                        var match = true;
                                        var peer = member_instance;
                                    }
                                    if (member_instance.id == message.user) {
                                        var user = member_instance;
                                    }
                                }

                                if (match == true) {
                                    var peer_status = peer.status.self;

                                    // Introversion/Extroversion
                                    if (peer_status.warmth <= 0.5 && peer_status.privateness >= 0.5) {
                                        var self_introversion = 'introvert';
                                    } else if (peer_status.warmth > 0.5 && peer_status.privateness < 0.5) {
                                        var self_introversion = 'extrovert';
                                    } else {
                                        var self_introversion = 'ambivert';
                                    }

                                    // Low Anxiety/High Anxiety
                                    if (peer_status.stability > 0.5) {
                                        var self_anxiety = 'low';
                                    } else if (peer_status.stability < 0.5) {
                                        var self_anxiety = 'high';
                                    } else {
                                        var self_anxiety = 'moderate';
                                    }

                                    // Receptiviity/Tough-Mindedness
                                    if (peer_status.warmth > 0.5 && peer_status.sensitivity > 0.5) {
                                        var self_receptivity = 'receptive';
                                    } else if (peer_status.warmth < 0.5 && peer_status.sensitivity < 0.5) {
                                        var self_receptivity = 'tough-minded';
                                    } else {
                                        var self_receptivity = 'objective';
                                    }

                                    // Accomodation/Independence
                                    if (peer_status.dominance > 0.5) {
                                        var self_accommodation = 'independent';
                                    } else if (peer_status.dominance < 0.5) {
                                        var self_accommodation = 'accommodative';
                                    } else {
                                        var self_accommodation = 'indifferent';
                                    }

                                    var content = [];
                                    if (self_introversion == 'introvert' && peer_introversion != 'introvert') {
                                        var introversion_message = 'more introverted';
                                        content.push(introversion_message);
                                    } else if (self_introversion == 'extrovert' && peer_introversion != 'extrovert') {
                                        var introversion_message = 'more extroverted';
                                        content.push(introversion_message);
                                    } else if (self_introversion == 'ambivert' && peer_introversion != 'ambivert') {
                                        var introversion_message = 'more ambiverted';
                                        content.push(introversion_message);
                                    }

                                    if (self_anxiety == 'low' && peer_anxiety != 'low') {
                                        var anxiety_message = 'lower anxiety';
                                        content.push(anxiety_message);
                                    } else if (self_anxiety == 'high' && peer_anxiety != 'high') {
                                        var anxiety_message = 'higher anxiety';
                                        content.push(anxiety_message);
                                    } else if (self_anxiety == 'moderate' && peer_anxiety != 'moderate') {
                                        var anxiety_message = 'more moderate anxiety';
                                        content.push(anxiety_message);
                                    }

                                    if (self_receptivity == 'receptive' && peer_receptivity != 'receptive') {
                                        var receptivity_message = 'more receptive';
                                        content.push(receptivity_message);
                                    } else if (self_receptivity == 'tough-minded' && peer_receptivity != 'tough-minded') {
                                        var receptivity_message = 'more tough-minded';
                                        content.push(receptivity_message);
                                    } else if (self_receptivity == 'objective' && peer_receptivity != 'objective') {
                                        var receptivity_message = 'more objective';
                                        content.push(receptivity_message);
                                    }

                                    if (self_accommodation == 'independent' && peer_accommodation != 'independent') {
                                        var accommodation_message = 'more independent';
                                        content.push(accommodation_message);
                                    } else if (self_accommodation == 'accommodative' && peer_accommodation != 'accommodative') {
                                        var accommodation_message = 'more accommodative';
                                        content.push(accommodation_message);
                                    } else if (self_accommodation == 'indifferent' && peer_accommodation != 'indifferent') {
                                        var accommodation_message = 'pretty indifferent in terms of being independent';
                                        content.push(accommodation_message);
                                    }


                                    if (content.length == 0) {
                                        var comparison = 'This means that your perception of <@' + subject + '> is spot on with how they feel about themself';
                                    } else if (content.length == 1) {
                                        var comparison = 'Your perception of <@' + subject + '> differs slightly from how they feel about themself in that they believe they are ' + content[0];
                                    } else if (content.length == 2) {
                                        var comparison = "This differs from how <@" + subject + "> views themself in that they believe they are " + content[0] + " and " + content[1];
                                    } else if (content.length == 3) {
                                        var comparison = "This differs from how <@" + subject + "> views themself in that they believe they are " + content[0] + ", " + content[1] + ", and " + content[2];
                                    } else if (content.length == 4) {
                                        var comparison = "This differs from how <@" + subject + "> views themself in that they believe they are " + content[0] + ", " + content[1] + ", " + content[2] + ", and " + content[3];
                                    }

                                    bot.reply(message, "Your perception of <@" + subject + "> is that they're a *" + peer_anxiety + " anxiety " + peer_introversion + "* who tends to be *" + peer_receptivity + "* and *" + peer_accommodation + "*");
                                    bot.reply(message, comparison);

                                    var today = new Date();
                                    var dd = String(today.getDate()).padStart(2, '0');
                                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                    var yyyy = today.getFullYear();

                                    today = mm + '/' + dd + '/' + yyyy;

                                    if (!peer.history.perception && !peer.status.perception) {
                                        peer.history.perception = {
                                            [message.user]: {
                                                [today]: {
                                                    warmth: outcome.warmth.score,
                                                    dominance: outcome.dominance.score,
                                                    sensitivity: outcome.sensitivity.score,
                                                    stability: outcome.stability.score,
                                                    privateness: outcome.privateness.score
                                                }
                                            }
                                        };

                                        peer.status.perception = {
                                            warmth: outcome.warmth.score,
                                            dominance: outcome.dominance.score,
                                            sensitivity: outcome.sensitivity.score,
                                            stability: outcome.stability.score,
                                            privateness: outcome.privateness.score
                                        };
                                    } else if (!peer.history.perception[message.user]) {
                                        peer.status.perception = {
                                            warmth: (peer.status.perception.warmth + outcome.warmth.score) / 2,
                                            dominance: (peer.status.perception.dominance + outcome.dominance.score) / 2,
                                            sensitivity: (peer.status.perception.sensitivity + outcome.sensitivity.score) / 2,
                                            stability: (peer.status.perception.stability + outcome.stability.score) / 2,
                                            privateness: (peer.status.perception.privateness + outcome.privateness.score) / 2,
                                        }
                                        peer.history.perception[message.user] = {
                                            [today]: {
                                                warmth: outcome.warmth.score,
                                                dominance: outcome.dominance.score,
                                                sensitivity: outcome.sensitivity.score,
                                                stability: outcome.stability.score,
                                                privateness: outcome.privateness.score
                                            }
                                        }
                                    } else {
                                        peer.status.perception = {
                                            warmth: (peer.status.perception.warmth + outcome.warmth.score) / 2,
                                            dominance: (peer.status.perception.dominance + outcome.dominance.score) / 2,
                                            sensitivity: (peer.status.perception.sensitivity + outcome.sensitivity.score) / 2,
                                            stability: (peer.status.perception.stability + outcome.stability.score) / 2,
                                            privateness: (peer.status.perception.privateness + outcome.privateness.score) / 2,
                                        }
                                        peer.history.perception[message.user][today] = {
                                            warmth: outcome.warmth.score,
                                            dominance: outcome.dominance.score,
                                            sensitivity: outcome.sensitivity.score,
                                            stability: outcome.stability.score,
                                            privateness: outcome.privateness.score
                                        }
                                    }
                                    controller.storage.users.save(peer);
                                } else if (match == false) {
                                    bot.reply(message, "Your perception of <@" + subject + "> is that they're a *" + peer_anxiety + " anxiety " + peer_introversion + "* who tends to be *" + peer_receptivity + "* and *" + peer_accommodation + "*");
                                    bot.reply(message, "Sadly <@" + subject + "> hasn't yet told me about themself, so I can't compare your perception with how they see themself. As soon as I know them, I'll send you a notification :wink:");
                                    user.pending = {
                                        [subject]: {
                                            warmth: outcome.warmth.score,
                                            dominance: outcome.dominance.score,
                                            sensitivity: outcome.sensitivity.score,
                                            stability: outcome.stability.score,
                                            privateness: outcome.privateness.score
                                        }
                                    }
                                    controller.users.save(user);
                                }
                            })
                        }
                        else {
                            bot.reply(message, 'Whoops! Sorry, I wasn\'t able to record this conversation. Lets try again?')
                        }
                    });

                });
            });
        }
    })
}