module.exports = function (controller) {
    controller.on('app_home_opened', function (bot, message) {
        bot.api.users.info({ user: message.user }, function (err, api_user) {
            if (err) {
                console.log("error: ", err);
            }
            controller.storage.teams.get(api_user.user.team_id, function (err, team) {
                if (err) {
                    console.log("error: ", err);
                }
                bot.api.groups.info({token: bot.config.token, channel: team.channel}, function (err, api_group) {
                    if (err) {
                        console.log("error: ", err);
                    }
                    var group_members = api_group.group.members;
                    for (var m = 0; m < group_members.length; m++) {
                        if (group_members[m] == message.user) {
                            var is_member = true;
                        }
                    }
                    if (is_member == true) {
                        if (!team || typeof team.subscription == 'undefined' || team.subscription.status == 'inactive') {
                            // Subscribe message
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
                            bot.api.conversations.history({ token: bot.config.token, channel: message.channel }, function (err, response) {
                                if (err) {
                                    console.log("Error: ", err);
                                }
                                if (response.messages.length < 5) {
                                    controller.storage.users.get(message.user, function (err, user) {
                                        if (err) {
                                            console.log("error: ", err);
                                            convo.say("I'm so sorry, I don't remember what you said. Would you mind reflecting again? :grimacing:")
                                        }
                                        // Tutorial
                                        bot.startConversation(message, function (err, convo) {
                                            if (err) {
                                                console.log("error: ", err);
                                            }
        
                                            if (!user) {
                                                user = {};
                                                let { name, real_name } = api_user.user;
                                                user.name = real_name;
                                                user.email = api_user.user.profile.email;
                                                user.timezone = api_user.user.tz
                                                user.id = message.user,
                                                user.team = api_user.user.team_id,
                                                user.channel = message.channel
                                            }
        
                                            var conversation = '';
                                            convo.addQuestion({
                                                attachments: [
                                                    {
                                                        title: 'Tutorial',
                                                        color: '#02D2FF',
                                                        callback_id: 'tutorial',
                                                        text: 'Nice to meet you <@' + message.user + '>! Would you like to learn how I work?',
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'tutorial-button',
                                                                'value': 'Yes-Tutorial',
                                                                'text': 'Tutorial',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'no-button',
                                                                'value': 'No-Tutorial',
                                                                'text': 'No Thanks',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }, [
                                                    {
                                                        pattern: 'Yes-Tutorial',
                                                        callback: function (reply, convo) {
                                                            bot.replyInteractive(reply, {
                                                                attachments: [
                                                                    {
                                                                        title: 'Tutorial',
                                                                        color: '#02D2FF',
                                                                        callback_id: 'tutorial',
                                                                        text: 'Nice to meet you <@' + message.user + '>! Would you like to learn how I work?',
                                                                        attachment_type: 'default',
                                                                        actions: [
                                                                            {
                                                                                'name': 'tutorial-button',
                                                                                'value': 'Yes-Tutorial',
                                                                                'style': 'primary',
                                                                                'text': 'Tutorial',
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': 'no-button',
                                                                                'value': 'No-Tutorial',
                                                                                'text': 'No Thanks',
                                                                                'type': 'button'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            })
                                                            conversation = conversation + 'Yes';
                                                            convo.next();
                                                        }
                                                    },
                                                    {
                                                        pattern: 'No-Tutorial',
                                                        callback: function (reply, convo) {
                                                            bot.replyInteractive(reply, {
                                                                attachments: [
                                                                    {
                                                                        title: 'Tutorial',
                                                                        color: '#02D2FF',
                                                                        callback_id: 'tutorial',
                                                                        text: 'Nice to meet you <@' + message.user + '>! Would you like to learn how I work?',
                                                                        attachment_type: 'default',
                                                                        actions: [
                                                                            {
                                                                                'name': 'tutorial-button',
                                                                                'value': 'Yes-Tutorial',
                                                                                'text': 'Tutorial',
                                                                                'type': 'button'
                                                                            },
                                                                            {
                                                                                'name': 'no-button',
                                                                                'value': 'No-Tutorial',
                                                                                'style': 'danger',
                                                                                'text': 'No Thanks',
                                                                                'type': 'button'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            })
                                                            bot.reply(message,{ 
                                                                text: "Oh, okay! You can go ahead and choose what ever you're interested in doing...",
                                                                attachments: [
                                                                    {
                                                                        title: 'Logs',
                                                                        color: '#02D2FF',
                                                                        callback_id: 'Logs',
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
                                                                        text: "Monitor yourself and your relationship with your cofounder(s)",
                                                                        actions: [
                                                                            {
                                                                                'name': 'Report-button',
                                                                                'value': 'Generate-Report',
                                                                                'text': 'Generate Report',
                                                                                'type': 'button'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            })
                                                            controller.storage.users.save(user);
                                                            convo.stop();
                                                        }
                                                    }
                                                ])
        
                                            convo.say("Perfect! All the value that I can add is dependent on your logs that tell me how you're feeling");
        
                                            // Keep Score
                                            const score = [];
        
                                            convo.addMessage({
                                                text: "Here's your check in log! I send you this every morning to fill out"
                                            });
        
                                            // Sleep
                                            convo.addQuestion({
                                                text: "Simply choose which options vibe best",
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

                                            // Presence
                                            convo.addQuestion({
                                                attachments: [
                                                    {
                                                        title: "Presence",
                                                        callback_id: 'checkin-presence',
                                                        attachment_type: 'default',
                                                        color: '#CF02FF',
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
                                                                            callback_id: 'checkin-presence',
                                                                            attachment_type: 'default',
                                                                            color: '#CF02FF',
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
                                                                            callback_id: 'checkin-presence',
                                                                            attachment_type: 'default',
                                                                            color: '#CF02FF',
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
                                                                            callback_id: 'checkin-presence',
                                                                            attachment_type: 'default',
                                                                            color: '#CF02FF',
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
                                                                            callback_id: 'checkin-presence',
                                                                            attachment_type: 'default',
                                                                            color: '#CF02FF',
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

                                            const permission = [];
                                            convo.addQuestion({
                                                attachments: [
                                                    {
                                                        callback_id: 'permission',
                                                        title: "Permission",
                                                        text: "Now you choose if you want to share your exact answers with your cofounder(s), or just an overall score so they know how you're feeling",
                                                        color: "#0294ff",
                                                        attachment_type: 'default',
                                                        actions: [
                                                            {
                                                                'name': 'snapshot-button',
                                                                'value': 'Snapshot',
                                                                'text': 'Snapshot',
                                                                'type': 'button'
                                                            },
                                                            {
                                                                'name': 'score-button',
                                                                'value': 'Score',
                                                                'text': 'Score',
                                                                'type': 'button'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }, [
                                                    {
                                                        pattern: 'Snapshot',
                                                        callback: function (reply, convo) {
                                                            bot.replyInteractive(reply,
                                                                {
                                                                    attachments: [
                                                                        {
                                                                            callback_id: 'permission',
                                                                            text: "Would you like to share a complete snapshot of your check in or just your score?",
                                                                            color: "#0294ff",
                                                                            attachment_type: 'default',
                                                                            actions: [
                                                                                {
                                                                                    'name': 'snapshot-button',
                                                                                    'value': 'Snapshot',
                                                                                    'style': 'primary',
                                                                                    'text': 'Snapshot',
                                                                                    'type': 'button'
                                                                                },
                                                                                {
                                                                                    'name': 'score-button',
                                                                                    'value': 'Score',
                                                                                    'text': 'Score',
                                                                                    'type': 'button'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            )
                                                            permission.push('Snapshot');
                                                            bot.api.reactions.add({
                                                                name: 'thumbsup',
                                                                channel: reply.channel,
                                                                timestamp: reply.ts
                                                            });
                                                            convo.next();
                                                        }
                                                    },
                                                    {
                                                        pattern: 'Score',
                                                        callback: function (reply, convo) {
                                                            bot.replyInteractive(reply,
                                                                {
                                                                    attachments: [
                                                                        {
                                                                            callback_id: 'permission',
                                                                            text: "Would you like to share a complete snapshot of your check in or just your score?",
                                                                            color: "#0294ff",
                                                                            attachment_type: 'default',
                                                                            actions: [
                                                                                {
                                                                                    'name': 'snapshot-button',
                                                                                    'value': 'Snapshot',
                                                                                    'text': 'Snapshot',
                                                                                    'type': 'button'
                                                                                },
                                                                                {
                                                                                    'name': 'score-button',
                                                                                    'value': 'Score',
                                                                                    'style': 'primary',
                                                                                    'text': 'Score',
                                                                                    'type': 'button'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            );
                                                            permission.push('Score');
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

                                            convo.say("And that's that! I'll send you another log similar to the check in to fill out at the end of the day :rocket:");
        
                                            convo.activate();
    
                                            // capture the results of the conversation and see what happened...
                                            convo.on('end', function (convo) {
        
                                                if (convo.successful()) {
                                                    if (conversation == 'Yes') {
    
                                                    var today = new Date();
                                                    var dd = String(today.getDate()).padStart(2, '0');
                                                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                                    var yyyy = today.getFullYear();
        
                                                    today = mm + '/' + dd + '/' + yyyy;
        
                                                    if (!user.logs) {
                                                        user.logs = {
                                                            [today]: {
                                                                check_in: score
                                                            }
                                                        };
                                                        controller.storage.users.save(user);
                                                    } else {
                                                        user.logs[today] = {
                                                            check_in: score
                                                        }
                                                        controller.storage.users.save(user);
                                                    }
        
                                                    const overall = GetOverall(score);
                                                    if (permission[0] == 'Score') {
                                                        const overall = GetOverall(score);
                                                        if (overall > 90) {
                                                            bot.say({
                                                                text: "<@" + message.user + "> is feeling " + overall + "% today :rocket:",
                                                                channel: team.bot.channel
                                                            });
                                                        } else {
                                                            bot.say({
                                                                text: "<@" + message.user + "> is feeling " + overall + "% today",
                                                                channel: team.bot.channel
                                                            });
                                                        }
                                                    } else if (permission[0] == 'Snapshot') {
                                                        const snapshot = GetSnapshot(score, message.user);
                                                        bot.say({
                                                            attachments: snapshot,
                                                            channel: team.bot.channel
                                                        });
                                                    }
                                                    } else {
                                                        bot.reply(message, 'Okay, no problem! Your score of ' + overall + "% has been recorded");
                                                    }
                                                }
                                                else {
                                                    bot.reply(message, 'Whoops! Something has gone awry')
                                                }
                                            });
        
        
                                        })
                                    });
                                } else if (response.messages[0].text == 'Ready to check in?' || response.messages[0].text == 'Ready to reflect?' || response.messages[0].text == "Hiya! What are you looking to do?") {
                                    // Pass
                                } else {
                                    // Show help message
                                    bot.reply(message, {
                                        text: "Hiya! What are you looking to do?",
                                        attachments: [
                                            {
                                                title: 'Logs',
                                                color: '#02D2FF',
                                                callback_id: 'Logs',
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
                                                text: "Monitor yourself and your relationship with your cofounder(s)",
                                                actions: [
                                                    {
                                                        'name': 'Report-button',
                                                        'value': 'Generate-Report',
                                                        'text': 'Generate Report',
                                                        'type': 'button'
                                                    }
                                                ]
                                            }
                                        ]
                                    })
                                }
                            });
                        }
                    } else {
                        bot.reply(message, "I'm sorry! I only work exclusively with the founding team right now")
                    }
                })
            })
        })
    })
}

function GetSnapshot(input, user) {
    // Get qualitative snapshot
    var overview = {
        0: {
            4: 'Perfect',
            3: 'Sufficient',
            2: 'Restless',
            1: 'Terrible',
            0: 'Sleep'
        },
        1: {
            4: 'Full',
            3: 'Alright',
            2: 'Hanging On',
            1: 'Dead',
            0: 'Energy'
        },
        2: {
            4: 'Happy',
            3: 'Calm',
            2: 'Tense',
            1: 'Upset',
            0: 'Mood'
        },
        3: {
            4: 'Grounded',
            3: 'Aware',
            2: 'Out of It',
            1: 'Disconnected',
            0: 'Presence'
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
            // Sleep
            scores.push((input[j] * 25) * 1.3);
        } else if (j == 1) {
            // Energy
            scores.push((input[j] * 25) * 0.8);
        } else if (j == 2) {
            // Mood
            scores.push((input[j] * 25) * 0.9);
        } else if (j == 2) {
            // Presence
            scores.push((input[j] * 25) * 1);
        }
        
    }
    var sum = scores.reduce(function (a, b) { return a + b; }, 0);
    var overall = sum / scores.length;
    overall = Math.round(overall);

    var attachments = {
        title: '<@' + user + '>\'s End of Day Snapshot',
        color: '#CF02FF',
        attachment_type: 'default',
        text: '*Sleep:* ' + qualitative[0] + '\n*Energy:* ' + qualitative[1] + '\n*Mood:* ' + qualitative[2] + '\n*Presence:* ' + qualitative[3] + '\n*Score:* ' + overall + '%'
    };

    return attachments;
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