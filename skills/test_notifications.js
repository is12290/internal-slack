module.exports = function (controller) {
    //test
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

    console.log('CLEAN DATA: ', clean_data);
    console.log('NO DATA: ', no_data);

    bot.spawn({ token: clean_data[1][0] }, function (err, bot) {
        bot.say({
            text: 'haeyy!',
            channel: clean_data[1][1]
        });
    });
}