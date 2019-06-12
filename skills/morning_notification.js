module.exports = function (controller) {
    // Check in
    var no_data = [];
    var clean_data = [];
    controller.storage.teams.all(function (err, all_teams) {

        for (var i = 0; i < all_teams.length; i++) {
            var instance = all_teams[i];
            if (!instance.channel) {
                no_data.push([instance.bot.token, instance.createdBy])
            } else {
                clean_data.push([instance.bot.token, instance.channel]);
            }

        }
    });

    for (var i = 0; i < clean_data.length; i++) {
        controller.spawn({ token: clean_data[i][0] }, function (err, bot) {
            bot.say({
                text: 'Good morning! Don\'t forget to check in with @internal today! (Send me `Check In` over DM)',
                channel: clean_data[i][1]
            });
        });
    }

    for (var z = 0; z < no_data.length; z++) {
        controller.spawn({ token: no_data[i][0] }, function (err, bot) {
            bot.say({
                text: 'Add me to a company wide channel so that I can send daily reminders to fill out logs! You can do this by mentioning me in the channel, or clicking \'Show Channel Details\' -> \'App\' -> \'Add app\'',
                user: no_data[i][1]
            });
        });
    }
}