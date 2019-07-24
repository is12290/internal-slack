module.exports = function (controller) {
    controller.on('direct_message', function (message, bot) {
        if (message.actions[0].value == 'Yes-Test') {
            bot.startConversation(message, function (err, convo) {
                if (err) {
                    console.log("error: ", err);
                }

                // Keep Score
                const score = [];

                convo.addMessage({
                    text: "Hey, here's your check in questionnaire! Just choose which option vibes best for each of the 4 topics..."
                });

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

                convo.activate();
            })

        } else if (message.actions[0].value == 'No-Test') {
            bot.reply("Take your time - I'm ready when you are!")
        }
    })
}