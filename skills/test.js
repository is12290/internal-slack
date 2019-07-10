module.exports = function (controller) {
    controller.hears(['test'], 'direct_mention', function (bot, message) {
        bot.startConversation({
            user: message.user,
            channel: message.user,
            text: 'hey'
        }, function (err, convo) {
            console.log(convo);
            convo.say("hi");
        });
    })
}