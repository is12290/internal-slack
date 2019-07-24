module.exports = function (controller) {
    controller.hears(['Test', 'test'], 'direct_message', function (bot, message) {
        for (var j = 0; j < 3; j++) {
            var user = message.user;
  
            bot.startPrivateConversation({user: user }, function (err, convo) {
              if (err) {
                console.log("error: ", err);
              }
  
              convo.addMessage({
                text: 'This is a conversation!'
              }, function (response, convo) {
                console.log('Went through message');
                convo.next();
              });
              console.log("Out of message");
  
              convo.addQuestion({
                text: "How you be?"
              }, function (response, convo) {
                console.log("went through question");
                convo.next();
              });
  
              convo.activate();
  
              convo.on('end', function (convo) {
                if (convo.successful()) {
                  console.log("Success!");
                }
              });
              console.log("Skipped convo.on('end')")
            })
            console.log("Out of conversation");
          }
          console.log("Out of for loop");
    })
}