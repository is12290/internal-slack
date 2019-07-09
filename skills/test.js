module.exports = function (controller) {
    controller.hears(['test'], 'direct_mention', function (bot, message) {
        console.log(message.user);
        bot.startPrivateConversation({user: message.user}, function (err, convo) {
            console.log(convo);
            convo.say("this work?");
        })
    })
}