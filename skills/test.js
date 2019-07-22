module.exports = function (controller) {
    controller.hears(['Test', 'test'], 'direct_message', function (bot, message) {
        bot.startConversation(message, function (err, convo) {
            if (err) {
                console.log("error: ", err);
            }

            convo.addQuestion({
                text: 'hey',
                blocks: [
                    {
                        "type": "section",
                        "block_id": "section1234",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Pick start date"
                        },
                        "accessory": {
                            "type": "datepicker",
                            "action_id": "datepicker123",
                            "initial_date": "1990-04-28",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select a date"
                            }
                        }
                    },
                    {
                        "type": "section",
                        "block_id": "section1234",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Pick end date"
                        },
                        "accessory": {
                            "type": "datepicker",
                            "action_id": "datepicker123",
                            "initial_date": "1990-04-28",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select a date"
                            }
                        }
                    }
                ]
            }, function (response, convo) {
                convo.next();
            });

            convo.activate();

            convo.on('end', function (convo) {
                if (convo.successful()) {
                    var values = convo.extractResponses();
                    console.log(values);
                }
            })
        })
    })
}