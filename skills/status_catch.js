module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.text == "Yes-Subscription") {
            bot.reply(message, {
                attachments: [{
                    title: 'Subscribe',
                    text: 'Click to be taken to the checkout page',
                    callback_id: 'yes-question',
                    color: "#0294ff",
                    attachment_type: 'default',
                    actions: [
                        {
                            'name': 'subscribe-button',
                            'value': 'Subscribe',
                            'text': 'Subscribe',
                            'type': 'button'
                        }
                    ]
                }, function (err, response) {
                    bot.replyInteractive(response, {
                        attachments: [{
                            title: 'Subscribe',
                            text: 'Click to be taken to the checkout page',
                            callback_id: 'yes-question',
                            color: "#0294ff",
                            attachment_type: 'default',
                            actions: [
                                {
                                    'name': 'subscribe-button',
                                    'value': 'Subscribe',
                                    'style': 'primary',
                                    'text': 'Subscribe',
                                    'type': 'button'
                                }
                            ]
                        }]
                    })
                }]
            }) // Link to Stripe checkout
        } else if (message.text == 'No-Subscription') {
            controller.storage.teams.get(message.team, function (err, team) {
                if (err) {
                    console.log("error: ", err);
                }
                // Extend subscription
                bot.startConversation(message, function (err, convo) {
                    if (err) {
                        console.log("error: ", err);
                    }
                    var renew = '';
                    convo.addQuestion({
                        text: "Hmm... I'm sorry you're not interested in subscribing. Has having me around helped with team communication and cohesion?",
                        attachments: [{
                            callback_id: 'no-question',
                            color: "#0294ff",
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
                    }, function (response, convo) {
                        if (response.text == 'Yes') {
                            bot.replyInteractive(response, {
                                attachments: [{
                                    callback_id: 'no-question',
                                    color: "#0294ff",
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
                            })
                            bot.reply('Yay! That\'s my main (and pretty much only) goal in this immortal existence. I\'ll extend your trial for 2 more weeks to give you some time to evaluate');
                            renew = renew + 'yes';
                        } else if (response.text == 'No') {
                            bot.replyInteractive(response, {
                                attachments: [{
                                    callback_id: 'no-question',
                                    color: "#0294ff",
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
                                }]
                            })
                            bot.reply('Aw, man! I\'ll make a note to have my creators reach out to you. I\'m sorry I wasn\'t able to help');
                            renew = renew + 'no';
                        }
                        convo.next();
                    });

                    convo.activate();

                    convo.on('end', function (convo) {
                        if (convo.successful()) {
                            if (renew == 'yes') {
                                var today = new Date();
                                var dd = String(today.getDate()).padStart(2, '0');
                                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                var yyyy = today.getFullYear();
                                today = mm + '/' + dd + '/' + yyyy;

                                var end = new Date();
                                var numberOfDaysToAdd = 14;
                                end.setDate(end.getDate() + numberOfDaysToAdd);

                                var dd = end.getDate();
                                var mm = end.getMonth() + 1;
                                var y = end.getFullYear();

                                var endDate = mm + '/' + dd + '/' + y;

                                team.status.trial.start = today;
                                team.status.trial.end = endDate;
                                team.status.trial.status = 'active';
                                team.status.trial.tally = team.status.trial.tally + 1;
                                controller.storage.teams.save(team);
                            } else if (renew == 'no') {
                                team.status.trial.status = 'inactive';
                            }
                        }
                    })
                })
            })
        }
    })
}