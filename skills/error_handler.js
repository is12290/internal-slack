module.exports = function (controller) {
    controller.on('receive_error', function(err, bot, message) {
        bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
    });

    controller.on('ingest_error', function(err, bot, message) {
        bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
    });

    controller.on('normalize_error', function(err, bot, message) {
        bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
    });

    controller.on('categorize_error', function(err, bot, message) {
        bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
    });
}