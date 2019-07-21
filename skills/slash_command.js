module.exports = function (controller) {
    controller.on('slash_command', function (bot, message) {
        bot.startPrivateConversation({user: message.user_id}, function (err, convo) {
            convo.say("2 + 2 = 4");
        })
    });
}