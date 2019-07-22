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
                            "text": "Pick a start date"
                        },
                        "accessory": {
                            "type": "datepicker",
                            "action_id": "datepicker123",
                            "initial_date": "2019-04-28",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select a date"
                            }
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Pick a date for the deadline."
                        },
                        "accessory": {
                            "type": "datepicker",
                            "initial_date": "1990-04-28",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select a date",
                                "emoji": true
                            }
                        }
                    }
                ]
            }, function (response, convo) {
                console.log(response);
                console.log(response.actions[0].selected_date);
                convo.next();
            });

            convo.activate();


        })
    })
}