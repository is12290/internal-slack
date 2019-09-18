var debug = require('debug')('botkit:onboarding');

module.exports = function (controller) {

    controller.on('onboard', function (bot, team) {
        debug('Starting an onboarding experience!');
        bot.api.users.info({ user: bot.config.createdBy }, function (err, response) {
            team.installer_email = response.user.profile.email;
            if (err) {
                console.log("error: ", err);
            }
        });

        bot.startPrivateConversation({ user: bot.config.createdBy }, function (err, convo) {
            if (err) {
                console.log(err);
            } else {
                const newUser = {};
                convo.say("Hey, <@" + bot.config.createdBy + ">! _I'm_ Internal, a bot that allows your team to easily communicate their well-being");
                convo.say("_You_ happen to be the first person to communicate with me on this Slack team so I need some quick help from you about what to name the channel that I'll send you and your teammate's emotional fitness scores in");

                var channel_id = '';
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
                            bot.api.channels.setPurpose({ token: bot.config.app_token, channel: response.channel.id, purpose: "This channel is used by the Internal app to share the daily overall emotional scores of those who opt to share." }, function (err, response) {
                                if (err) {
                                    console.log("error: ", err);
                                }
                            })
                            bot.api.channels.setTopic({ token: bot.config.app_token, channel: response.channel.id, topic: "Know how your coworkers are doing today" }, function (err, response) {
                                if (err) {
                                    console.log("error: ", err);
                                }
                            })
                            bot.api.channels.invite({ token: team.bot.app_token, channel: response.channel.id, user: team.bot.user_id }, function (err, outcome) {
                                if (err) {
                                    console.log("error: ", err);
                                }
                            });
                            team.bot.channel = response.channel.id;
                            channel_id = channel_id + response.channel.id;
                            controller.storage.teams.save(team);
                        }
                    });

                    bot.api.users.info({ user: reply.user }, (error, response) => {
                        if (error) {
                            console.log("error: ", error);
                        }
                        let { name, real_name } = response.user;
                        newUser.name = real_name;
                        newUser.email = response.user.profile.email;
                        newUser.timezone = response.user.tz
                    })
                    newUser.team = reply.team.id;
                    newUser.status = 'employee';
                    newUser.id = reply.user;
                    newUser.token = bot.config.token;

                    bot.api.reactions.add({
                        name: 'thumbsup',
                        channel: reply.channel,
                        timestamp: reply.ts
                    });
                    convo.next();
                });

                convo.addQuestion("And while I have you, what's your role here?", function (response, convo) {
                    newUser.channel = response.channel;
                    newUser.role = response.text;
                    convo.next();
                });

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
                            channel: convo.context.channel,
                            text: "All done! Feel free to check out my features - you can see this message when ever you want by sending me a message saying `Help`",
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