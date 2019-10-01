module.exports = function (controller) {
    controller.hears(['^subscription Check', '^subscription check'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, team) {
            if (err) {
                console.log("error: ", err);
            }

            bot.startConversation(message, function (err, convo) {
                if (err) {
                    console.log("error: ", err);
                }
                convo.addQuestion({
                    attachments: [{
                        title: "Type",
                        text: "Is this a subscription activation or status check?",
                        color: "#0294ff",
                        callback_id: 'type-check',
                        attachment_type: 'default',
                        actions: [
                            {
                                'name': 'subscription-button',
                                'value': 'Subscription',
                                'text': 'Activate Subscription',
                                'type': 'button'
                            },
                            {
                                'name': 'status-button',
                                'value': 'Status',
                                'text': 'Check Status',
                                'type': 'button'
                            }
                        ]
                    }]
                }, [
                    {
                        pattern: "Subscription",
                        callback: function (response, convo) {
                            bot.replyInteractive(response, {
                                attachments: [{
                                    title: "Type",
                                    text: "Is this a subscription activation or status check?",
                                    color: "#0294ff",
                                    callback_id: 'type-check',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'subscription-button',
                                            'value': 'Subscription',
                                            'style': 'primary',
                                            'text': 'Activate Subscription',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'status-button',
                                            'value': 'Status',
                                            'text': 'Check Status',
                                            'type': 'button'
                                        }
                                    ]
                                }]
                            });
                            if (team.status.subscription.status == 'active') {
                                bot.reply(message, "Your subscription has already been activated!");
                                convo.stop();
                            } else {
                                convo.next();
                            }
                        }
                    },
                    {
                        pattern: "Status",
                        callback: function (response, convo) {
                            bot.replyInteractive(response, {
                                attachments: [{
                                    title: "Type",
                                    text: "Is this a subscription activation or status check?",
                                    color: "#0294ff",
                                    callback_id: 'type-check',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'subscription-button',
                                            'value': 'Subscription',
                                            'text': 'Activate Subscription',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'status-button',
                                            'value': 'Status',
                                            'style': 'primary',
                                            'text': 'Check Status',
                                            'type': 'button'
                                        }
                                    ]
                                }]
                            });
                            if (team.status.subscription.status == 'inactive' && team.status.trial.status == 'active') {
                                bot.reply(message, "Your trial ends on " + team.status.trial.end);
                                convo.stop();
                            } else if (team.status.subscription.status == 'active') {
                                bot.reply(message, "*Subscription:* Active\n*Next Payment:* " + team.status.subscription.end);
                                convo.stop();
                            }
                        }
                    }
                ]);
    
    
                convo.ask("What was the email you used to pay for your subscription?", function (response, convo) {
                    stripe.customers.list( { email: response.text }, function (err, customers) {
                        if (err || !customers) {
                            bot.reply(message, "I actually wasn't able to verify that email. Are you sure it is correct?");
                            convo.repeat();
                        } else if (customers) {
                            team.status.subscription.status = 'active';
                            controller.storage.teams.save(team);
                            bot.api.reactions.add({
                                name: 'thumbsup',
                                channel: message.channel,
                                timestamp: reply.ts
                            });
                            bot.reply(message, "Your team has been verified!\nEnjoy continued use of Internal :blush:");
                            convo.stop();
                        }
                    })

                })
    
                convo.activate();

                convo.on('end', function (convo) {
                    if (convo.successful()) {
                        //Don't do anything
                    }
                })
    
            })
        })
    })
}