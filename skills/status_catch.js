module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == 'No-Subscription') {
            controller.storage.teams.get(message.team, function (err, team) {
                if (err) {
                    console.log("error: ", err);
                }
                // Extend subscription
                bot.startConversation(message, function (err, convo) {
                    if (err) {
                        console.log("error: ", err);
                    }
                    convo.addQuestion({
                        text: "I'm sorry you haven't gotten much value out of me. Would you like to email my creators for a refund of your last month?",
                        attachments: [{
                            title: "Refund",
                            text: "My purpose of existence is to provide value and you shouldn't have to pay if I don't!",
                            color: "#ff0228",
                            callback_id: 'refund',
                            attachment_type: 'default',
                            actions: [
                                {
                                    'text': 'Yes',
                                    'type': 'button',
                                    'url': "mailto:support@getinternal.co?subject=Request%20For%20Refund&body=Hello%2C%0A%0AI%20am%20not%20interested%20in%20continuing%20with%20my%20subscription%20and%20would%20like%20a%20refund%20of%20my%20last%20month's%20payment.%0A%0AThank%20you%2C%0A"
                                },
                                {
                                    'name': 'no-button',
                                    'value': 'No',
                                    'text': 'No',
                                    'type': 'button'
                                }
                            ]
                        }],
                    }, [
                        {
                            pattern: 'No',
                            callback: function (response, convo) {
                                bot.interactiveReply(response, {
                                    text: "I'm sorry you haven't gotten much value out of me. Would you like to email my creators for a refund of your last month?",
                                    attachments: [{
                                        title: "Refund",
                                        text: "My purpose of existence is to provide value and you shouldn't have to pay if I don't!",
                                        color: "#ff0228",
                                        callback_id: 'refund',
                                        attachment_type: 'default',
                                        actions: [
                                            {
                                                'text': 'Yes',
                                                'type': 'button',
                                                'url': "mailto:support@getinternal.co?subject=Request%20For%20Refund&body=Hello%2C%0A%0AI%20am%20not%20interested%20in%20continuing%20with%20my%20subscription%20and%20would%20like%20a%20refund%20of%20my%20last%20month's%20payment.%0A%0AThank%20you%2C%0A"
                                            },
                                            {
                                                'name': 'no-button',
                                                'value': 'No',
                                                'style': 'primary',
                                                'text': 'No',
                                                'type': 'button'
                                            }
                                        ]
                                    }], 
                                });
                                bot.reply(response, "Okay, I appreciate that!");
                                convo.next();
                            }
                        }
                    ]);

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            // Nothing
                        }
                    })
                })
            })
        }
    })
}