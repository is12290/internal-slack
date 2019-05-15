module.exports = function(controller) {

    controller.hears(['^hi'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, "Hi there! I'm not the greatest at human conversation, but I'm somehow pretty emotionally intelligent.\nIt'd be greatly appreciated if you used `Check in` or `Check out` to log the beginning and end of your shift or `Result` to get an insight into your organization's overall emotional fitness" )
    });



};