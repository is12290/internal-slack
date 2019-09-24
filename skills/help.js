module.exports = function (controller) {
    controller.hears(['^help', '^info'], 'direct_message,direct_mention', function (bot, message) {
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
                                'name': 'yes-button',
                                'value': 'Yes-Subscribe',
                                'text': 'Yes',
                                'type': 'button'
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
                    if (response.text == 'Yes-Subscribe') {
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
                                        'style': 'primary',
                                        'text': 'Yes',
                                        'type': 'button'
                                    },
                                    {
                                        'name': 'no-button',
                                        'value': 'No-Subscribe',
                                        'text': 'No',
                                        'type': 'button'
                                    }
                                ]
                            }]
                        })
                    } else if (response.text == 'No-Subscribe') {
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
            } else {
                bot.say({
                    channel: message.channel,
                    text: "Help is on the way! What are you looking to do?",
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
                            text: "Monitor your or your team's emotional well-being overtime",
                            actions: [
                                {
                                    'name': 'Report-button',
                                    'value': 'Generate-Report',
                                    'text': 'Generate Report',
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
                        }
                    ]
                })
            }
        })
    })
}