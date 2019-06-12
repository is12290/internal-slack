module.exports = function(controller) {
    controller.on('bot_channel_join', function(bot, message) {
        controller.storage.teams.get(message.team, function(err, team) {
            team[channel] = message.channel;
            controller.storage.team.save(team);
        });

        bot.reply(message, 'I have arrived! I\'ll be sending daily log and reporting reminders here :thumbs_up:')
    })
}