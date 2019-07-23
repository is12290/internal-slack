module.exports = function (controller) {
    controller.hears(['Test', 'test'], 'direct_message', function (bot, message) {
        bot.startConversation(message, function (err, convo) {
            if (err) {
                console.log("error: ", err);
            }

            var timeframe = [];
            convo.addQuestion({
                text: 'hey',
                blocks: [
                    {
                        "type": "section",
                        "block_id": "section1234",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Would you be so kind as to select your custom timeframe?"
                        }
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "datepicker",
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "Start Date",
                                    "emoji": true
                                }
                            },
                            {
                                "type": "datepicker",
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "End Date",
                                    "emoji": true
                                }
                            }
                        ]
                    }
                ]
            }, function (response, convo) {
                timeframe.push(response.actions[0].selected_date);
                console.log("Response 1: ", response);

                convo.silentRepeat()
                console.log("Response 2: ", response)
                convo.next();
            });

            convo.activate();

        })
    })
}