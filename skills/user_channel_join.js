module.exports = function (controller) {
    controller.on('user_channel_join', function (bot, message) {
        bot.startPrivateConversation({ user: message.user }, function (err, convo) {
            if (err) {
                console.log("error: ", err);
            }
            controller.storage.teams.get(message.team, function (err, team) {
                if (err) {
                    console.log("error: ", err);
                }
                const newUser = {};

                convo.addQuestion({
                    attachments: [
                        {
                            callback_id: 'new-user',
                            color: "#0294ff",
                            text: "Thanks for joining my channel! I'm a bot that lets you easily monitor you and your team's well-being. Would you mind telling me a bit about yourself?",
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
                                                color: "#0294ff",
                                                text: "Thanks for joining my channel! I'm a bot that lets you easily monitor you and your team's well-being. Would you mind telling me a bit about yourself?",
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
                                                color: "#0294ff",
                                                text: "Thanks for joining my channel! I'm a bot that lets you easily monitor you and your team's well-being. Would you mind telling me a bit about yourself?",
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

                var channel = '';
                convo.addQuestion("First off, what's your role here?", function (response, convo) {
                    newUser.role = response.text;
                    channel = channel + response.channel;
                    convo.next();
                }, 'default');

                convo.addQuestion("Second, what's your favorite book?", function (response, convo) {
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

                var team_members = [];
                bot.api.users.list({}, function (err, response) {

                    for (var x = 0; x < response.members.length; x++) {
                        if (response.members[x].deleted != 'false') {
                            team_members.push({ "text": response.members[x].real_name, "value": response.members[x].id });
                        }
                    }
                    team_members.push({ "text": "No Thanks", "value": "No" })
                });


                convo.addQuestion({
                    attachments: [
                        {
                            text: "Lastly, would you like to add one of your teammates to <#" + team.bot.channel + ">, the channel I post emotional scores on? More value is created with each participating teammate :heart_decoration:",
                            callback_id: 'invite',
                            attachment_type: 'default',
                            color: "#0294ff",
                            actions: [
                                {
                                    "name": "Invite",
                                    "text": "Invite",
                                    "type": "select",
                                    "options": team_members
                                }
                            ]
                        }
                    ]
                }, function (reply, convo) {
                    if (reply.text != "No") {
                        bot.api.channels.invite({ token: team.bot.app_token, channel: team.bot.channel, user: reply.text }, function (err, outcome) {
                            if (err) {
                                console.log(err);
                            }
                            if (outcome.ok == 'false' && outcome.error == 'already_in_channel') {
                                bot.reply(message, "Hey, they're already in the channel! Try again?");
                                convo.repeat();
                            } else {
                            bot.reply(message, "Your recommendation has been successfully added to <#" + team.bot.channel + ">!");
                            convo.next();
                            }
                        })
                    } else {
                        bot.reply(message, "Okay, no problemo!");
                        convo.next();
                    }
                });

                convo.say("Thanks for all that!");

                convo.activate();

                convo.on('end', function (convo) {
                    if (convo.successful()) {
                        if (typeof newUser.name != 'undefined') {
                            controller.storage.users.save(newUser);
                            bot.say({
                                channel: channel,
                                text: "Now choose what feature you'd like to check out! You can see this message when ever you want by sending me a message saying `Help`",
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
                                    }
                                ]
                            })
                        }
                    }
                })
            })
        })
    })
}