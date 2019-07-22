module.exports = function (controller) {
    controller.hears(['Test', 'test'], 'direct_message', function (bot, message) {
        bot.startConversation(message, function (err, convo) {
            if (err) {
                console.log("error: ", err);
            }

            const content = {
                blocks: [
                    {
                        "type": "section",
                        "block_id": "section1234",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Pick a date for the deadline."
                        },
                        "accessory": {
                            "type": "datepicker",
                            "action_id": "datepicker123",
                            "initial_date": "2019-04-20",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select a date"
                            }
                        }
                    }
                ]
            };
            convo.say(content);

        })
    })
}