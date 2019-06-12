module.exports = function (controller) {
    // Check out
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
                text: 'Good afternoon! Don\'t forget to check out with me *and* report daily results today! (Send me `Check Out` or `Daily Results` over DM)',
                channel: clean_data[i][1]
            });
        });
    }
}