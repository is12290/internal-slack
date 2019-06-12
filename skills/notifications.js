module.exports = function (controller) {

    const schedule = require('node-schedule-tz');
    // Test
    var test = schedule.scheduleJob('*/5 * * * *', 'America/New_York', function () {
        var no_data= [];
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
    });

    // Check in
    var checkin_notification = schedule.scheduleJob('0 11 * * 1-5', 'America/New_York', function () {
        var no_data= [];
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
    });

    // Check out
    var dayend_notification = schedule.scheduleJob('0 17 * * 1-5', 'America/New_York', function () {
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
    });

    // End of week
    var weekend_notification = schedule.scheduleJob('15 18 * * 5', 'America/New_York', function () {
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
    });
}