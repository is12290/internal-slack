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
                        }
                    ]
                );

                var team_members = [];
                bot.api.users.list({ token: bot.config.bot.token }, function (err, response) {

                    for (var x = 0; x < response.members.length; x++) {
                        if (response.members[x].deleted == 'false') {
                            team_members.push({ text: response.members[x].real_name, value: response.members[x].id });
                        }
                    }
                });
                team_members.push({ text: "None, Actually", value: "No" })

                convo.addQuestion({
                    attachments: [
                        {
                            text: "Select a teammate you would like to invite to <#" + team.bot.channel + "> - The value increases with each participating teammate!",
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
                        bot.api.channels.invite({ token: bot.config.token, channel: team.bot.channel, user: reply.text }, function (err, outcome) {
                            if (err) {
                                console.log(err);
                            }
                            bot.reply(message, "Your recommendation has been successfully added to <#" + team.bot.channel + ">!");
                        })
                    } else {
                        bot.reply(message, "Okay, no problemo!");
                    }
                });

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

                        const sgMail = require('@sendgrid/mail');
                        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                        const msg = {
                            to: team.installer_email,
                            from: 'ian@getinternal.co',
                            subject: 'Thanks for Installing Internal!',
                            text: 'Hey,\n\nThank you so much for installing Internal to your team’s Slack! We’re on a mission to make virtual communication just as emotionally insightful as in-person communication, and you have taken the first step towards making that a reality.\n\nThe nature of Internal is that it provides increasingly more value as a higher number of your teammates start using it, but it’s still imperative that you find value from day 1.\n\nWith that, I would love to answer any questions, hear any feature requests, or personally guide you through the intent of the app. Please call or text me at any time at (610) 597-5353, or shoot me an email at ian@getinternal.co!\n\nI look forward to hearing from you,\n\nIan Scalzo\nCo-Founder & CEO',
                        };
                        sgMail.send(msg);

                        bot.say({
                            channel: channel_name,
                            text: "Choose what feature you'd like to check out! You can see this message when ever you want by sending me a message saying `Help`",
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
                })
            }
        });
    });
}