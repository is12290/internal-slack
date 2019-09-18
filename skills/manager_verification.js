module.exports = function (controller) {
    controller.hears(['^new Manager', '^new manager'], 'direct_message', function (bot, message) {
        const stripe = require("stripe")(process.env.STRIPE_KEY);
        controller.storage.users.get(message.user, function (err, user) {
            if (!user || typeof user == 'undefined') {
                controller.storage.teams.get(message.team, function (err, team) {
                    if (err) {
                        console.log(err);
                    }
                    bot.startPrivateConversation({ user: message.user }, function (err, convo) {
                        if (err) {
                            console.log("error: ", err);
                            bot.whisper(message, "I'm a bit popular right now and missed what you said, say it again?");
                        }
                        const newUser = {};
    
                        convo.addMessage("Greetings, <@" + message.user + ">! This is the first time we're meeting and I've got a quick question for you...", function (response, convo) {
                            bot.api.users.info({ user: reply.user }, (error, response) => {
                                if (error) {
                                    console.log("error: ", error);
                                }
                                let { name, real_name } = response.user;
                                newUser.name = real_name;
                                newUser.email = response.user.profile.email;
                                newUser.timezone = response.user.tz
                            })
                            newUser.channel = message.channel;
                            newUser.team = message.team;
                            newUser.status = 'employee';
                            newUser.id = message.user;
                            newUser.token = bot.config.token;
                        });
    
                        convo.addQuestion("What's your role here?", function (response, convo) {
                            newUser.role = response.text;
                            convo.next();
                        }, 'default');

                        convo.say("Thanks for that!");
    
                        convo.activate();
    
                        convo.on('end', function (convo) {
                            if (convo.successful()) {
                                controller.storage.users.save(newUser);
                                bot.api.channels.invite({ token: bot.config.bot.app_token, channel: team.bot.channel, user: message.user }, function (err, outcome) {
                                    if (err) {
                                        console.log("error: ", err);
                                    }
                                });
                                bot.say({
                                    channel: convo.context.channel,
                                    text: "Now what was it you were looking to do? P.S. - You can see this message when ever you want by sending me a message saying `Help`",
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
                    })
                })
            } else {
                bot.startConversation(message, function (err, convo) {
                    if (err) {
                        console.log("error: ", err);
                        bot.whisper(message, "My grandest of apologies, but I'm a bit popular right now and can't process your message. Say it again?");
                    }
                    convo.addQuestion("Awesome! What was the email you used to subscribe?", function (reply, convo) {
                        bot.reply(message, "One second while I check this..");
                        if (response.text.includes("praxis")) {
                            user.status = 'manager';
                            controller.storage.users.save(user);
                            bot.api.reactions.add({
                                name: 'thumbsup',
                                channel: message.channel,
                                timestamp: reply.ts
                            });
                            bot.reply(message, "You're verified and free to do as you please!\nWelcome to the land of team insights :blush:");
                            convo.stop();
                        } else {
                            stripe.customers.list({ email: response.text }, function (err, customers) {
                                if (err || !customers) {
                                    bot.reply(message, "I actually wasn't able to verify that email. Are you sure it is correct?");
                                    convo.stop();
                                } else if (customers) {
                                    user.status = 'manager';
                                    controller.storage.users.save(user);
                                    bot.api.reactions.add({
                                        name: 'thumbsup',
                                        channel: message.channel,
                                        timestamp: reply.ts
                                    });
                                    bot.reply(message, "You're verified and free to do as you please!\nWelcome to the land of team insights :blush:");
                                    convo.stop();
                                }
                            })
                        }
                    });

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            bot.reply(message, "Could I do anything else for you?");
                        }
                    })
                })
            }
        })
    })
}