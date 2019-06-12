module.exports = function (controller) {
    // End of week
    var clean_data = [];
    controller.storage.teams.all(function (err, all_teams) {

        for (var i = 0; i < all_teams.length; i++) {
            var instance = all_teams[i];
            if (!instance.channel) {
                //pass
            } else {
                clean_data.push([instance.bot.token, instance.channel]);
            }

        }
    });

    for (var i = 0; i < clean_data.length; i++) {
        controller.spawn({ token: clean_data[i][0] }, function (err, bot) {
            bot.say({
                text: 'Way to make it through the week! View your organization\'s emotional fitness for the week with `Weekly Results`',
                channel: clean_data[i][1]
            });
        });
    }
}