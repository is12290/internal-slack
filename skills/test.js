module.exports = function (controller) {
    controller.hears(['test'], 'direct_mention', function (bot, message) {
        bot.startPrivateConversation({user: message.user}, function (err, convo) {
            convo.say("this work?");
        })
    })
}