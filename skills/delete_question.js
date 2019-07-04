module.exports = function (controller) {
    controller.hears(['^delete question', '^delete Question', '^delete custom question', '^delete Custom Question'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, info) {
            if (!info || typeof info.customization == 'undefined' || typeof info.customization.question == 'undefined') {
                bot.reply(message, "I'm sorry, there's no custom question for me to delete!\nIf I'm wrong, please tell my human counterparts at support@getinternal.co");
            } else if (typeof info.customization.question != 'undefined') {
                bot.startConversation(message, function (err, convo){
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
                            callback : function (reply, convo) {
                                bot.replyInteractive(reply,
                                    {
                                        attachments: [{
                                            text: "Your logs are already set to be automatically sent at " + info.customization.logging.check_in_time + " and " + info.customization.logging.check_out_time + ", " + info.customization.logging.timezone +" time!\nWould you like to change this?",
                                            callback_id: 'question-deletion-check',
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
                                delete info.customization.question;
                                controller.storage.teams.save(info);
                                convo.say("You got it! Question has been removed.")
                            }
                        },
                        {
                            pattern: 'No',
                            callback : function (reply, convo) {
                                bot.replyInteractive(reply,
                                    {
                                        attachments: [{
                                            text: "Your logs are already set to be automatically sent at " + info.customization.logging.check_in_time + " and " + info.customization.logging.check_out_time + ", " + info.customization.logging.timezone +" time!\nWould you like to change this?",
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
                                                    'style': 'primary',
                                                    'text': 'No',
                                                    'type': 'button'
                                                }
                                            ]
                                        }]
                                    }
                                );
                                convo.say("Well, okay then... Enjoy the rest of your day! :sunglasses:");

                                
                            }
                        }
                    ]);
                });
            } else {
                bot.reply(message, "Would you mind sending me that message again?");
            }
        });
    });
}