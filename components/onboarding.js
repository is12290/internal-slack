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
                        bot.api.reactions.add({
                            name: 'thumbsup',
                            channel: reply.channel,
                            timestamp: reply.ts
                        });
                        convo.next();
                    });

                convo.say("Awesome! I just created the channel...");

                var team_members = [];
                bot.api.users.list({ token: bot.config.token }, function (err, response) {

                    for (var x = 0; x < response.members.length; x++) {
                        if (response.members[x].deleted != 'false') {
                            team_members.push({ "text": response.members[x].real_name, "value": response.members[x].id });
                        }
                    }
                    team_members.push({ "text": "None, Actually", "value": "No" })
                });


                convo.addQuestion({
                    attachments: [
                        {
                            text: "Would you like to add another teammate to the channel? The value increases with each participant!",
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
                        bot.api.channels.invite({ token: team.bot.app_token, channel: channel_id, user: reply.text }, function (err, outcome) {

                            if (err) {
                                console.log(err);
                            }
                            if (outcome.ok == 'false' && outcome.error == 'already_in_channel') {
                                bot.say({
                                    text: "Hey, they're already in the channel! Try again?",
                                    channel: convo.context.channel
                                });
                                convo.repeat();
                            } else {
                                bot.say({
                                    text: "Your recommendation has been successfully added to <#" + channel_id + ">!",
                                    channel: convo.context.channel
                                });
                                convo.next();
                            }
                        })
                    } else {
                        bot.say({
                            text: "Okay, no problemo!",
                            channel: convo.context.channel
                        });
                        convo.next();
                    }
                });

                convo.say("The most important part of having me around is completing your daily questionnaires because, without your questionnaires filled out, nothing else matters! It's sometimes difficult to remember to carry them out, so let's set up a time for me to send them automatically everyday...");

                var data = {};
                convo.addQuestion({
                    attachments: [
                        {
                            title: 'Timezone',
                            text: 'What timezone are you in?',
                            callback_id: 'timezone',
                            attachment_type: 'default',
                            color: "#0294ff",
                            actions: [
                                {
                                    "name": "timezone",
                                    "text": "Timezone",
                                    "type": "select",
                                    "options": [
                                        {
                                            "text": "America Eastern Time",
                                            "value": "America/New_York"
                                        },
                                        {
                                            "text": "America Central Time",
                                            "value": "America/Mexico_City",
                                        },
                                        {
                                            "text": "America Mountain Time",
                                            "value": "America/Denver",
                                        },
                                        {
                                            "text": "America Pacific Time",
                                            "value": "America/Los_Angeles",
                                        },
                                        {
                                            "text": "Australia Eastern Time",
                                            "value": "Australia/Sydney",
                                        },
                                        {
                                            "text": "Australia Western Time",
                                            "value": "Australia/Perth",
                                        },
                                        {
                                            "text": "Hong Kong Time",
                                            "value": "Asia/Hong_Kong",
                                        },
                                        {
                                            "text": "Korea Time",
                                            "value": "Asia/Seoul",
                                        },
                                        {
                                            "text": "Europe British Time",
                                            "value": "Europe/London",
                                        },
                                        {
                                            "text": "Central European Time",
                                            "value": "Europe/Madrid",
                                        },
                                        {
                                            "text": "Eastern European Time",
                                            "value": "Europe/Kiev",
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }, function (reply, convo) {
                    data.timezone = reply.text;
                    convo.next();
                });

                convo.addQuestion({
                    attachments: [
                        {
                            title: 'Check In Time',
                            text: 'What time would be best for check ins?',
                            callback_id: 'time',
                            attachment_type: 'default',
                            color: "#0294ff",
                            actions: [
                                {
                                    "name": "time",
                                    "text": "Time",
                                    "type": "select",
                                    "options": [
                                        {
                                            "text": "00:00",
                                            "value": "00:00"
                                        },
                                        {
                                            "text": "00:30",
                                            "value": "00:30"
                                        },
                                        {
                                            "text": "01:00",
                                            "value": "01:00"
                                        },
                                        {
                                            "text": "01:30",
                                            "value": "01:30"
                                        },
                                        {
                                            "text": "02:00",
                                            "value": "02:00"
                                        },
                                        {
                                            "text": "02:30",
                                            "value": "02:30"
                                        },
                                        {
                                            "text": "03:00",
                                            "value": "03:00"
                                        },
                                        {
                                            "text": "03:30",
                                            "value": "03:30"
                                        },
                                        {
                                            "text": "04:00",
                                            "value": "04:00"
                                        },
                                        {
                                            "text": "04:30",
                                            "value": "04:30"
                                        },
                                        {
                                            "text": "05:00",
                                            "value": "05:00"
                                        },
                                        {
                                            "text": "05:30",
                                            "value": "05:30"
                                        },
                                        {
                                            "text": "06:00",
                                            "value": "06:00"
                                        },
                                        {
                                            "text": "06:30",
                                            "value": "06:30"
                                        },
                                        {
                                            "text": "07:00",
                                            "value": "07:00"
                                        },
                                        {
                                            "text": "07:30",
                                            "value": "07:30"
                                        },
                                        {
                                            "text": "08:00",
                                            "value": "08:00"
                                        },
                                        {
                                            "text": "08:30",
                                            "value": "08:30"
                                        },
                                        {
                                            "text": "09:00",
                                            "value": "09:00"
                                        },
                                        {
                                            "text": "09:30",
                                            "value": "09:30"
                                        },
                                        {
                                            "text": "10:00",
                                            "value": "10:00"
                                        },
                                        {
                                            "text": "10:30",
                                            "value": "10:30"
                                        },
                                        {
                                            "text": "11:00",
                                            "value": "11:00"
                                        },
                                        {
                                            "text": "11:30",
                                            "value": "11:30"
                                        },
                                        {
                                            "text": "12:00",
                                            "value": "12:00"
                                        },
                                        {
                                            "text": "12:30",
                                            "value": "12:30"
                                        },
                                        {
                                            "text": "13:00",
                                            "value": "13:00"
                                        },
                                        {
                                            "text": "13:30",
                                            "value": "13:30"
                                        },
                                        {
                                            "text": "14:00",
                                            "value": "14:00"
                                        },
                                        {
                                            "text": "14:30",
                                            "value": "14:30"
                                        },
                                        {
                                            "text": "15:00",
                                            "value": "15:00"
                                        },
                                        {
                                            "text": "15:30",
                                            "value": "15:30"
                                        },
                                        {
                                            "text": "16:00",
                                            "value": "16:00"
                                        },
                                        {
                                            "text": "16:30",
                                            "value": "16:30"
                                        },
                                        {
                                            "text": "17:00",
                                            "value": "17:00"
                                        },
                                        {
                                            "text": "17:30",
                                            "value": "17:30"
                                        },
                                        {
                                            "text": "18:00",
                                            "value": "18:00"
                                        },
                                        {
                                            "text": "18:30",
                                            "value": "18:30"
                                        },
                                        {
                                            "text": "19:00",
                                            "value": "19:00"
                                        },
                                        {
                                            "text": "19:30",
                                            "value": "19:30"
                                        },
                                        {
                                            "text": "20:00",
                                            "value": "20:00"
                                        },
                                        {
                                            "text": "20:30",
                                            "value": "20:30"
                                        },
                                        {
                                            "text": "21:00",
                                            "value": "21:00"
                                        },
                                        {
                                            "text": "21:30",
                                            "value": "21:30"
                                        },
                                        {
                                            "text": "22:00",
                                            "value": "22:00"
                                        },
                                        {
                                            "text": "22:30",
                                            "value": "22:30"
                                        },
                                        {
                                            "text": "23:00",
                                            "value": "23:00"
                                        },
                                        {
                                            "text": "23:30",
                                            "value": "23:30"
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                }, function (reply, convo) {
                    var check_in_time = reply.text;
                    data.check_in_time = check_in_time;
                    convo.next();
                });

                convo.addQuestion({
                    attachments: [
                        {
                            title: 'Reflection Time',
                            text: "What time would be best for reflections?",
                            callback_id: 'time',
                            attachment_type: 'default',
                            color: "#0294ff",
                            actions: [
                                {
                                    "name": "time",
                                    "text": 'Time',
                                    "type": "select",
                                    "options": [
                                        {
                                            "text": "00:00",
                                            "value": "00:00"
                                        },
                                        {
                                            "text": "00:30",
                                            "value": "00:30"
                                        },
                                        {
                                            "text": "01:00",
                                            "value": "01:00"
                                        },
                                        {
                                            "text": "01:30",
                                            "value": "01:30"
                                        },
                                        {
                                            "text": "02:00",
                                            "value": "02:00"
                                        },
                                        {
                                            "text": "02:30",
                                            "value": "02:30"
                                        },
                                        {
                                            "text": "03:00",
                                            "value": "03:00"
                                        },
                                        {
                                            "text": "03:30",
                                            "value": "03:30"
                                        },
                                        {
                                            "text": "04:00",
                                            "value": "04:00"
                                        },
                                        {
                                            "text": "04:30",
                                            "value": "04:30"
                                        },
                                        {
                                            "text": "05:00",
                                            "value": "05:00"
                                        },
                                        {
                                            "text": "05:30",
                                            "value": "05:30"
                                        },
                                        {
                                            "text": "06:00",
                                            "value": "06:00"
                                        },
                                        {
                                            "text": "06:30",
                                            "value": "06:30"
                                        },
                                        {
                                            "text": "07:00",
                                            "value": "07:00"
                                        },
                                        {
                                            "text": "07:30",
                                            "value": "07:30"
                                        },
                                        {
                                            "text": "08:00",
                                            "value": "08:00"
                                        },
                                        {
                                            "text": "08:30",
                                            "value": "08:30"
                                        },
                                        {
                                            "text": "09:00",
                                            "value": "09:00"
                                        },
                                        {
                                            "text": "09:30",
                                            "value": "09:30"
                                        },
                                        {
                                            "text": "10:00",
                                            "value": "10:00"
                                        },
                                        {
                                            "text": "10:30",
                                            "value": "10:30"
                                        },
                                        {
                                            "text": "11:00",
                                            "value": "11:00"
                                        },
                                        {
                                            "text": "11:30",
                                            "value": "11:30"
                                        },
                                        {
                                            "text": "12:00",
                                            "value": "12:00"
                                        },
                                        {
                                            "text": "12:30",
                                            "value": "12:30"
                                        },
                                        {
                                            "text": "13:00",
                                            "value": "13:00"
                                        },
                                        {
                                            "text": "13:30",
                                            "value": "13:30"
                                        },
                                        {
                                            "text": "14:00",
                                            "value": "14:00"
                                        },
                                        {
                                            "text": "14:30",
                                            "value": "14:30"
                                        },
                                        {
                                            "text": "15:00",
                                            "value": "15:00"
                                        },
                                        {
                                            "text": "15:30",
                                            "value": "15:30"
                                        },
                                        {
                                            "text": "16:00",
                                            "value": "16:00"
                                        },
                                        {
                                            "text": "16:30",
                                            "value": "16:30"
                                        },
                                        {
                                            "text": "17:00",
                                            "value": "17:00"
                                        },
                                        {
                                            "text": "17:30",
                                            "value": "17:30"
                                        },
                                        {
                                            "text": "18:00",
                                            "value": "18:00"
                                        },
                                        {
                                            "text": "18:30",
                                            "value": "18:30"
                                        },
                                        {
                                            "text": "19:00",
                                            "value": "19:00"
                                        },
                                        {
                                            "text": "19:30",
                                            "value": "19:30"
                                        },
                                        {
                                            "text": "20:00",
                                            "value": "20:00"
                                        },
                                        {
                                            "text": "20:30",
                                            "value": "20:30"
                                        },
                                        {
                                            "text": "21:00",
                                            "value": "21:00"
                                        },
                                        {
                                            "text": "21:30",
                                            "value": "21:30"
                                        },
                                        {
                                            "text": "22:00",
                                            "value": "22:00"
                                        },
                                        {
                                            "text": "22:30",
                                            "value": "22:30"
                                        },
                                        {
                                            "text": "23:00",
                                            "value": "23:00"
                                        },
                                        {
                                            "text": "23:30",
                                            "value": "23:30"
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                }, function (reply, convo) {
                    var reflection_time = reply.text;
                    data.reflection_time = reflection_time;
                    bot.api.reactions.add({
                        name: 'thumbsup',
                        channel: reply.channel,
                        timestamp: reply.ts
                    });
                    convo.next();
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
                    newUser.token = bot.config.token;
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
                        newUser.customization = {
                            logging: {
                                timezone: data.timezone,
                                check_in_time: data.check_in_time,
                                reflection_time: data.reflection_time
                            }
                        }
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