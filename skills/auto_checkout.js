module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {
        if (message.actions[0].value == "Yes-CheckOut") {
            // Check in convo
        } else if (message.actions[0].value == "No-CheckOut") {
            bot.reply(message, "Okay, no worries! I'm ready when you are")
        } else {
            // Pass
        }
    })
}