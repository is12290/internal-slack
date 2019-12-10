module.exports = function(controller) {
    controller.on('bot_channel_join', function(bot, message) {
        bot.reply(message, "Thanks for adding me, friendly human! :heart:");
    })
}