module.exports = function (controller) {
    controller.hears(['Test'], 'direct_message', function (bot, message) {
        bot.say({
            attachments: [{
                text: "Ready to check in?",
                color: "#0294ff",
                callback_id: 'automatic-checkin',
                attachment_type: 'default',
                actions: [
                    {
                        'name': 'yes-button',
                        'value': 'Yes-CheckIn',
                        'text': 'Yes',
                        'type': 'button'
                    },
                    {
                        'name': 'no-button',
                        'value': 'No-CheckIn',
                        'text': 'No',
                        'type': 'button'
                    }
                ]
            }],
            channel: message.channel
        },
            [
                {
                    pattern: 'Yes',
                    callback: function (reply) {
                        bot.replyInteractive(reply,
                            {
                                attachments: [{
                                    text: "Ready to check in?",
                                    color: "#0294ff",
                                    callback_id: 'automatic-checkin',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'yes-button',
                                            'value': 'Yes-CheckIn',
                                            'style': 'primary',
                                            'text': 'Yes',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'no-button',
                                            'value': 'No-CheckIn',
                                            'text': 'No',
                                            'type': 'button'
                                        }
                                    ]
                                }]
                            }
                        )
                    }
                },
                {
                    pattern: 'No',
                    callback: function (reply) {
                        bot.replyInteractive(reply,
                            {
                                attachments: [{
                                    text: "Ready to check in?",
                                    color: "#0294ff",
                                    callback_id: 'automatic-checkin',
                                    attachment_type: 'default',
                                    actions: [
                                        {
                                            'name': 'yes-button',
                                            'value': 'Yes-CheckIn',
                                            'text': 'Yes',
                                            'type': 'button'
                                        },
                                        {
                                            'name': 'no-button',
                                            'style': 'danger',
                                            'value': 'No-CheckIn',
                                            'text': 'No',
                                            'type': 'button'
                                        }
                                    ]
                                }]
                            }
                        );
                    }
                }
            ]);
    })
}