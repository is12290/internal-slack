// Send reminders for questionnaires and results
var schedule = require('node-schedule');

var log_rule = new schedule.RecurrenceRule();
log_rule.dayOfWeek = new schedule.Range(1, 5);
log_rule.hour = 9;
log_rule.minute = 0;

schedule.scheduleJob(log_rule, function(){
  module.exports = function(controller) {
    controller.on('ambient', function(bot, message) {
      bot.say({
        channel: 'everyone',
        text: 'Hola, friends! Don\'t forget to do your logs today :thumbsup:'
        });
    });
  }
});

var result_rule = new schedule.RecurrenceRule();
result_rule.dayOfWeek = new schedule.Range(1, 5);
result_rule.hour = 17;
result_rule.minute = 0;
 
schedule.scheduleJob(result_rule, function(){
    module.exports = function(controller) {
        controller.on('ambient', function(bot, message) {
            bot.say({
                channel: 'everyone',
                text: 'Good evening, team! I\'m checking in to remind you to check out your organization\'s results for the day :heavy_check_mark:'
            });
        });
    }
});