module.exports = function (controller) {
    controller.hears(['^set Up Question', '^question', '^question customization', '^custom question', '^customize question'], 'direct_message, direct_mention', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, info) {
            if (!info || typeof info.customization == 'undefined' || typeof info.customization.question == 'undefined') {
                bot.startConversation(message, function (err, convo) {
                    var data = {};

                    convo.addQuestion("What topic would you like to add?", function (response, convo) {
                        data.topic = response.event.text;
                        bot.api.reactions.add({
                            name: 'thumbsup',
                            channel: response.channel,
                            timestamp: response.ts
                        });
                        convo.next();
                    });

                    convo.addQuestion("And what are the four choices related to '" + data.topic + "'? (Formatted from greatest to least - No new lines or commas, just spaces)", function (response, convo) {
                        data.choices = response.event.text.split(" ");
                        bot.api.reactions.add({
                            name: 'thumbsup',
                            channel: response.channel,
                            timestamp: response.ts
                        });
                        convo.next();
                    });

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {

                            convo.say("You're all set! Your custom question will be added to all team logs from now on\nIf you want to delete the question at any point just tell me `Delete Custom Question`");

                            if (!info.customization) {
                                info.customization = {
                                    question: {
                                        topic: data.topic,
                                        choices: data.choices
                                    }
                                };
                                controller.storage.teams.save(info);
                            } else {
                                info.customization.question = {
                                    topic: data.topic,
                                    choices: data.choices
                                };
                                controller.storage.teams.save(info);
                            }
                        } else {
                            convo.say("Whoops! I wasn't able to save this. Would you mind trying again?");
                        }
                    });
                });
            } else if (typeof info.customization != 'undefined' && typeof info.customization.question != 'undefined') {
                bot.startConversation(message, function (err, convo) {
                    var data = {};

                    convo.addQuestion({
                        attachments: [{
                            text: "You've already set your question to be " + info.customization.question.topic + "!\nWould you like to change this?",
                            callback_id: 'question-customization',
                            attachment_type: 'default',
                            color: "#02C6FF",
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
                        }]
                    },
                        [
                            {
                                pattern: 'Yes',
                                callback: function (reply, convo) {
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [{
                                                text: "You've already set your question to be " + info.customization.question.topic + "!\nWould you like to change this?",
                                                callback_id: 'question-customization',
                                                color: "#02C6FF",
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
                                            }]
                                        }
                                    );
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'No',
                                callback: function (reply, convo) {
                                    bot.replyInteractive(reply,
                                        {
                                            attachments: [{
                                                text: "You've already set your question to be " + info.customization.question.topic + "!\nWould you like to change this?",
                                                callback_id: 'question-customization',
                                                color: "#02C6FF",
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
                                                        'style': 'primary',
                                                        'text': 'No',
                                                        'type': 'button'
                                                    }
                                                ]
                                            }]
                                        }
                                    );
                                    convo.say("Oh, okay! I'll keep the fifth question as `" + info.customization.question + "`, then  :+1:");
                                }
                            }
                        ]);

                    convo.addQuestion("What topic would you like to add?", function (response, convo) {
                        data.topic = response.event.text;
                        console.log("DAATA.TOPIC: ", data.topic);
                        bot.api.reactions.add({
                            name: 'thumbsup',
                            channel: response.channel,
                            timestamp: response.ts
                        });
                        convo.next();
                    });

                    convo.addQuestion("And what are the four choices? (Formatted from greatest to least - No new lines, just commas and spaces)", function (response, convo) {
                        data.choices = response.event.text.split(" ");
                        bot.api.reactions.add({
                            name: 'thumbsup',
                            channel: response.channel,
                            timestamp: response.ts
                        });
                        convo.next();
                    });

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {

                            convo.say("You're all set! Your custom question will be added to all team logs from now on\nIf you want to delete the question at any point just tell me `Delete Custom Question`");

                            info.customization.question.topic = data.topic;
                            info.customization.question.choices = data.choices;
                            controller.storage.teams.save(info);
                        } else {
                            convo.say("Whoops! I wasn't able to save this. Would you mind trying again?");
                        }
                    });
                });
            } else {
                bot.reply(message, "Would you mind trying that message again? I didn't quite get it");
            }
        });
    });
}