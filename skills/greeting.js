module.exports = function (controller) {
    controller.hears(['^hi', '^hello', '^yo'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, team) {
            if (err) {
                console.log(err);
            }
            if (team.status.subscription.status == 'inactive' && team.status.trial.status == 'inactive') {
                if (team.status.trial.status == 'inactive' && team.status.subscription.seats_used == 0) {
                    var text = "Your trial is up! Would you like to purchase a subscription?"
                } else if (team.status.subscription.status == 'inactive' && team.status.subscription.seats_used > 0) {
                    var text = "It looks like your subscription is up! Would you like to renew?"
                }
                bot.reply(message, {
                    attachments: [{
                        title: "Subscribe",
                        text: text,
                        callback_id: 'subscribe',
                        color: "#0294ff",
                        attachment_type: 'default',
                        actions: [
                            {
                                'text': 'Yes',
                                'type': 'button',
                                'url': 'https://getinternal.co/subscribe'
                            },
                            {
                                'name': 'no-button',
                                'value': 'No-Subscribe',
                                'text': 'No',
                                'type': 'button'
                            }
                        ]
                    }]
                }, function (err, response) {
                    if (response.text == 'No-Subscribe') {
                        bot.replyInteractive(response, {
                            attachments: [{
                                title: "Subscribe",
                                text: text,
                                callback_id: 'subscribe',
                                color: "#0294ff",
                                attachment_type: 'default',
                                actions: [
                                    {
                                        'name': 'yes-button',
                                        'value': 'Yes-Subscribe',
                                        'text': 'Yes',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'no-button',
                                        'value': 'No-Subscribe',
                                        'style': 'danger',
                                        'text': 'No',
                                        'type': 'button'
                                    }
                                ]
                            }]
                        })
                    }
                })
            }
            else {
                var messages = ["Greetings! I hope you’re doing well today. If you’re looking for help, reply with `Help`",
                    "Yoyo! Let me know if I can help you out with `Help`",
                    "Whaaaats up?! Respond with `Help` for some things I can do. Have a great day!",
                    "How’s it goin today? I sure hope well! Let me know if I can `Help` with anything…"];

                var min = Math.ceil(0);
                var max = Math.floor(3);
                var msg = Math.floor(Math.random() * (max - min + 1)) + min;

                bot.reply(message, messages[msg]);
            }
        })
    })
};