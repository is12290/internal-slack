module.exports = function (controller) {
    controller.hears(['^delete question', '^delete Question', '^delete custom question', '^delete Custom Question'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, info) {
            if (!info || typeof info.customization == 'undefined' || typeof info.customization.question == 'undefined') {
                bot.reply(message, "I'm sorry, there's no custom question for me to delete!\n\nIf I'm wrong, please tell my human counterparts at support@getinternal.co");
            } else if (typeof info.customization.question != 'undefined') {
                bot.startConversation(message, function (err, convo){
                    var outcome = [];
                    convo.addQuestion({
                        attachments: [{
                                text: "The current question you have set is: '" + info.customization.question.topic + "', are you sure you want to delete it?",
                                callback_id: 'question-deletion-check',
                                color: '#02C6FF',
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
                            }]
                    },
                    [
                        {
                            pattern: 'Yes',
                            callback : function (response, convo) {
                                bot.replyInteractive(response,
                                    {
                                        attachments: [{
                                            text: "The current question you have set is: '" + info.customization.question.topic + "', are you sure you want to delete it?",                                            callback_id: 'question-deletion-check',
                                            color: '#02C6FF',
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
                                outcome.push(1);
                                convo.next();
                            }
                        },
                        {
                            pattern: 'No',
                            callback : function (response, convo) {
                                bot.replyInteractive(response,
                                    {
                                        attachments: [{
                                            text: "The current question you have set is: '" + info.customization.question.topic + "', are you sure you want to delete it?",                                            callback_id: 'question-deletion-check',
                                            color: '#02C6FF',
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
                                outcome.push(0);
                                convo.next();
                            }
                        }
                    ]);

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            if (outcome[0] == 1) {
                                delete info.customization.question;
                                controller.storage.teams.save(info);
                                bot.reply(response, "You got it! Question has been removed.")
                            } else if( outcome[0] == 0) {
                                bot.reply(response, "Well, okay then... Enjoy the rest of your day! :sunglasses:");
                            }
                        } else {
                            bot.reply(message, "Would you mind sending me that message again?");
                        }
                    })
                });
            } else {
                bot.reply(message, "Would you mind sending me that message again?");
            }
        });
    });
}