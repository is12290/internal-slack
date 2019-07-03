module.exports = function (controller) {
    controller.hears(['test'], 'direct_message', function (message, bot) {
        controller.storage.teams.get(message.team, function (err, info) {
            bot.reply(message, info);
        })
    })
}