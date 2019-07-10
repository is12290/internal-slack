module.exports = function (controller) {
    controller.on('ambient', function(bot, message) {
        bot.startConversation({
            user: 'UHZAUK473',
            channel: 'UHZAUK473',
            text: 'hey'
        }, function (err, convo) {
            convo.say("hola");
        })
    })
}