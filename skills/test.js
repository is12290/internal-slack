module.exports = function (controller) {
    controller.hears(['Test', 'test'], 'direct_message', function (bot, message) {
        bot.startConversation(message, function (err, convo) {
            if (err) {
                console.log("error: ", err);
            }
            convo.addQuestion({
                attachments: [
                    {
                    callback_id: 'end-date-picker',
                    attachment_type: 'default',
                    accesory: {
                        'type': 'datepicker',
                        'action_id': 'end-date',
                        'initial_date': '2019-07-07',
                        'placeholder': {
                            'type': 'plain_text',
                            'text': 'End date...'
                        }
                    }
                }
            ]}, function (response, convo) {
                console.log(response);
                convo.next();
            });

            convo.addQuestion({
                attachments: [
                    {
                        title: "Test",
                        callback_id: 'checkin-sleep',
                        attachment_type: 'default',
                        color: '#02D2FF',
                        actions: [
                            {
                                'name': 'perfect-button',
                                'text': 'Perfect',
                                'action_id': 'hello',
                                'type': 'datepicker'
                            },
            
                        ]
                    }
                ]
            });

            convo.activate();
        })
    })
}