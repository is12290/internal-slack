module.exports = function (controller) {
  controller.hears(['test'], 'direct_message', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
      convo.addQuestion({
        text: "Check in confirmation",
        attachments: [
          {
            title: "Sleep",
            callback_id: 'checkin-sleep',
            attachment_type: 'default',
            actions: [
              {
                'name': 'yes-button',
                'value': 'Yes-Test',
                'text': 'Yes',
                'type': 'button'
              },
              {
                'name': 'no-button',
                'value': 'No-Test',
                'text': 'No',
                'type': 'button'
              }
            ]
          },
          [
            {
              pattern: 'Yes-Test',
              callback: function (reply, convo) {
                score.push(4);
                bot.replyInteractive(reply,
                  {
                    attachments: [
                      {
                        title: "Sleep",
                        callback_id: 'checkin-sleep',
                        attachment_type: 'default',
                        actions: [
                          {
                            'name': 'yes-button',
                            'value': 'Yes-Test',
                            "style": "primary",
                            'text': 'Yes',
                            'type': 'button'
                          },
                          {
                            'name': 'no-button',
                            'value': 'No-Test',
                            'text': 'No',
                            'type': 'button'
                          }
                        ]
                      }
                    ]
                  }
                );
                convo.next();
              }
            }, {

              pattern: 'No-Test',
              callback: function (reply, convo) {
                score.push(4);
                bot.replyInteractive(reply,
                  {
                    attachments: [
                      {
                        title: "Sleep",
                        callback_id: 'checkin-sleep',
                        attachment_type: 'default',
                        actions: [
                          {
                            'name': 'yes-button',
                            'value': 'Yes-Test',
                            'text': 'Yes',
                            'type': 'button'
                          },
                          {
                            'name': 'no-button',
                            'value': 'No-Test',
                            "style": "danger",
                            'text': 'No',
                            'type': 'button'
                          }
                        ]
                      }
                    ]
                  }
                );
                convo.next();
              }
            }
          ]
        ]
      })
    })
  })
}