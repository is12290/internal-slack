module.exports = function (controller) {
    controller.hears(['Yes-Test'], 'direct_message', function (message, bot) {

        bot.startConversation(message, function (err, convo) {
            if (err) {
                console.log("error: ", err);
            }

            convo.say("It worked!")

        })
    })
}