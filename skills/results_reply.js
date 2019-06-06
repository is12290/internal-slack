module.exports = function(controller) {
    controller.hears(['results', 'Results'], 'direct_message', function(bot, message) {
        bot.reply(message, 'Oops! You need to be a bit more specific. Try `Daily Results`, `Weekly Results`, or `Personal Results`!');
    });
}