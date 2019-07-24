module.exports = function (controller) {
    controller.on('interactive_message_callback', function (message, bot) {

        bot.startConversation(message, function (err, convo) {
            if (err) {
                console.log("error: ", err);
            }

            convo.say("It worked!")

        })
    })
}