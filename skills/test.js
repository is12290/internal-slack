module.exports = function (controller) {
  controller.hears(['test'], 'direct_message', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
      convo.addQuestion({
        text: "Check in confirmation",
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Ready for your morning check in?"
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "style": "primary",
                "text": {
                  "type": "plain_text",
                  "text": "Yes",
                  "emoji": true
                },
                "value": "Yes-Test"
              },
              {
                "type": "button",
                "style": "danger",
                "text": {
                  "type": "plain_text",
                  "text": "No",
                  "emoji": true
                },
                "value": "No-Test"
              }
            ]
          }
        ]
      }, function (response, convo) {
        console.log(response);
      })
    })
  })
}