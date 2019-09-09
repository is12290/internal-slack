var debug = require('debug')('botkit:onboarding');

module.exports = function (controller) {

    controller.on('onboard', function (bot, team) {
        debug('Starting an onboarding experience!');
        bot.api.users.info({ user: bot.config.createdBy }, function (err, response) {
            team.installer_email = response.user.profile.email;
            console.log("installer email: ", team.installer_email);
            if (err) {
                console.log("error: ", err);
            }
        });

        bot.startPrivateConversation({ user: bot.config.createdBy }, function (err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.say("Hey! I'm Internal and _you_ happen to be the first person to add me to this fresh, new Slack team. Due to this, you get a bit more power than your friends :)");
                convo.say("For instance, I need to create a public channel where I will post you and your teammates overall check in scores (So long as I'm given permission)");
                convo.addQuestion({
                    attachments: [
                        {
                            text: "What could the name of this channel be?",
                            callback_id: 'channel',
                            attachment_type: 'default',
                            color: '#0294ff',
                            actions: [
                                {
                                    "name": "channel",
                                    "text": "Channel",
                                    "type": "select",
                                    "options": [
                                        {
                                            "text": '#internal-fitness',
                                            "value": "internal-fitness"
                                        },
                                        {
                                            "text": '#internal-vibe',
                                            "value": "internal-vibe"
                                        },
                                        {
                                            "text": '#internal-scores',
                                            "value": "internal-scores"
                                        },
                                        {
                                            "text": '#internal-mood',
                                            "value": "internal-mood"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }, function (reply, convo) {
                    bot.api.channels.create({ token: bot.config.app_token, name: reply.text }, function (err, response) {
                        if (err) {
                            console.log("error: ", err);
                            bot.reply(reply, "I'm sorry, that channel name is already taken. Try another?");
                            convo.repeat();
                        } else {
                            bot.api.channels.setPurpose({ token: bot.config.app_token, channel: response.channel.id, purpose: "This channel is used by the Internal app to share the daily overall emotional fitness scores of those who opt to share." }, function (err, response) {
                                if (err) {
                                    console.log("error: ", err);
                                }
                            })
                            bot.api.channels.setTopic({ token: bot.config.app_token, channel: response.channel.id, topic: "Know how your coworkers are doing today" }, function (err, response) {
                                if (err) {
                                    console.log("error: ", err);
                                }
                            })

                            team.bot.channel = response.channel.id;
                            controller.storage.teams.save(team);
                        }
                    });
                    bot.api.reactions.add({
                        name: 'thumbsup',
                        channel: reply.channel,
                        timestamp: reply.ts
                    });
                    convo.next();
                });

                convo.say("Awesome! I'll create that right now...");

                convo.say("Done! Now I need you to add me to the channel that was just created. Would you mind navigating to the channel, then click the 'i' on top bar -> App -> Add App -> Internal. When you've successfully added me to the channel, confirm in the following message");

                var channel_name = '';
                convo.addQuestion({
                    attachments: [
                        {
                            callback_id: 'new-user',
                            color: "#0294ff",
                            text: "Task completed? (Yes is the only option)",
                            attachment_type: 'default',
                            actions: [
                                {
                                    'name': 'yes-button',
                                    'value': 'Yes-one',
                                    'text': 'Yes',
                                    'type': 'button'
                                },
                                {
                                    'name': 'yes-button',
                                    'value': 'Yes-two',
                                    'text': 'Yes',
                                    'type': 'button'
                                },
                            ]
                        }
                    ]
                }, [
                        {
                            pattern: 'Yes-one',
                            callback: function (reply, convo) {
                                channel_name = channel_name + reply.channel;
                                bot.replyInteractive(reply,
                                    {
                                        attachments: [
                                            {
                                                callback_id: 'new-user',
                                                color: "#0294ff",
                                                text: "Task completed? (Yes is the only option)",
                                                attachment_type: 'default',
                                                actions: [
                                                    {
                                                        'name': 'yes-button',
                                                        'value': 'Yes-one',
                                                        'style': 'primary',
                                                        'text': 'Yes',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'yes-button',
                                                        'value': 'Yes-two',
                                                        'text': 'Yes',
                                                        'type': 'button'
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                )
                                bot.api.reactions.add({
                                    name: 'thumbsup',
                                    channel: reply.channel,
                                    timestamp: reply.ts
                                });
                                convo.next()
                            }
                        },
                        {
                            pattern: 'Yes-two',
                            callback: function (reply, convo) {
                                bot.replyInteractive(reply,
                                    {
                                        attachments: [
                                            {
                                                callback_id: 'new-user',
                                                color: "#0294ff",
                                                text: "Task completed? (Yes is the only option)",
                                                attachment_type: 'default',
                                                actions: [
                                                    {
                                                        'name': 'yes-button',
                                                        'value': 'Yes-one',
                                                        'text': 'Yes',
                                                        'type': 'button'
                                                    },
                                                    {
                                                        'name': 'yes-button',
                                                        'value': 'Yes-two',
                                                        'style': 'primary',
                                                        'text': 'Yes',
                                                        'type': 'button'
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                )
                                bot.api.reactions.add({
                                    name: 'thumbsup',
                                    channel: reply.channel,
                                    timestamp: reply.ts
                                });
                                convo.next()
                            }
                        },
                    ]
                );

                convo.say("Okay, I've got two more painless questions and then you'll be good to go");

                const newUser = {};
                convo.addQuestion("First - what's your favorite book?", function (response, convo) {
                    bot.api.users.info({ user: response.user }, (error, response) => {
                        if (error) {
                            console.log("error: ", error);
                        }
                        let { name, real_name } = response.user;
                        newUser.name = real_name;
                        newUser.email = response.user.profile.email;
                    })
                    newUser.channel = response.channel;
                    newUser.team = response.team;
                    newUser.status = 'employee';
                    newUser.id = response.user;
                    convo.next();
                });

                convo.addQuestion("Second - what's your role here?", function (response, convo) {
                    newUser.role = response.text;
                    convo.next();
                });

                convo.say("We're all set! Thanks for humoring my shenanigans. Now the fun part...");

                convo.activate();

                convo.on('end', function (convo) {
                    if (convo.successful()) {
                        controller.storage.users.save(newUser);
                        bot.say({
                            attachments: [{
                                text: "Would you like to check in or reflect?\nA check in is done at the start of your day in order to let your teammates know how you're feeling and a reflection is done at the end of the day to monitor how you're doing over time",
                                color: "#0294ff",
                                callback_id: 'onboarding-ask',
                                attachment_type: 'default',
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
                            }],
                            channel: channel_name
                        });
                    }
                })
            }
        });
    });
}