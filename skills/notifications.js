module.exports = function (controller) {

    var clean_data = [];
    controller.storage.teams.all(function (err, all_teams) {
        
        for (var i = 0; i < all_teams.length; i++) {
            var instance = all_teams[i];
            var channel = instance.channel;
            var oauth = instance.bot.token;
            var output = [oauth, channel];
            clean_data.push(output);
        }
    });

    const schedule = require('node-schedule');

    // Check in
    var checkin_rule = new schedule.RecurrenceRule();
    checkin_rule.dayOfWeek = [1, 2, 3, 4, 5];
    checkin_rule.hour = 10;
    checkin_rule.minute = 30;

    var checkin_notification = schedule.scheduleJob(checkin_rule, function () {
        for (var i = 0; i < clean_data.length; i++) {
            controller.spawn({ token: clean_data[i][0] }, function (err, bot) {
                bot.say({
                    text: 'Good morning! Don\'t forget to check in with @internal today! (Send me `Check In` over DM)',
                    channel: clean_data[i][1]
                });
            });
        }
    });

    // Check out
    var dayend_rule = new schedule.RecurrenceRule();
    dayend_rule.dayOfWeek = [1, 2, 3, 4, 5];
    dayend_rule.hour = 17;
    dayend_rule.minute = 0;

    var dayend_notification = schedule.scheduleJob(dayend_rule, function () {
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
    var weekend_rule = new schedule.RecurrenceRule();
    weekend_rule.dayOfWeek = 5;
    weekend_rule.hour = 18;
    weekend_rule.hour = 15;

    var weekend_notification = schedule.scheduleJob(weekend_rule, function () {
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