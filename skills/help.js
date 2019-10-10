module.exports = function (controller) {
    controller.hears(['^help', '^info'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, team) {
            if (err) {
                console.log(err);
            }
            if (team.subscription.status == 'inactive') {
                    
                var text = "It looks like your subscription is up! Would you like to renew?"
            
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
                                'url': 'https://getinternal.co/#pricing'
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
            } else {
                bot.say({
                    channel: message.channel,
                    text: "Help is on the way! What are you looking to do?",
                    attachments: [
                        {
                            title: 'Logs',
                            color: '#02D2FF',
                            callback_id: 'Logs',
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
                            text: "Monitor yourself and your relationship with your cofounder(s)",
                            actions: [
                                {
                                    'name': 'Report-button',
                                    'value': 'Generate-Report',
                                    'text': 'Generate Report',
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