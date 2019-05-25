module.exports = function(controller) {

    controller.hears(['^hi', '^help', '^info', '^hello', '^yo'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, "Hi there! \nI'm not the greatest at human conversation, but I'm somehow pretty emotionally intelligent.\n\nIt'd be greatly appreciated if you used `Check in` or `Check out` to log how you're doing. \n Also, use `Daily Results` to get an insight into your organization's overall emotional fitness for the day or `Weekly Results` for the week. Don't forget about `Personal Results`, as well, to check out your own emotional fitness scores for the week! \n\nEmail us at support@getinternal.co if you need further assistance!")
    });



};