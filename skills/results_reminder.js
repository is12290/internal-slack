var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(1, 5);
rule.hour = 17;
rule.minute = 0;
 
var j = schedule.scheduleJob(rule, function(){
    module.exports = function(controller) {
        controller.on('ambient', function(bot, message) {
            bot.say({
                channel: 'general',
                text: 'Good evening, team! I\'m checking in to remind you to check out your organization\'s results for the day :heavy_check_mark:'
            });
        });
    }
});