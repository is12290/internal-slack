module.exports = function (controller) {
    controller.hears(['test'], 'direct_message', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, info) {
            bot.reply(message, info);
        })
    })
}