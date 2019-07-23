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
                while (timeframe.length < 2) {
                    if (timeframe.length == 0 || response.actions[0].selected_date != timeframe[timeframe.length-1]) {
                        timeframe.push(response.actions[0].selected_date);
                    }
                }
                
                convo.next();
            });
            console.log("Outside of the callback");

            convo.activate();

            console.log(timeframe);


        })
    })
}