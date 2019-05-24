var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(1, 5);
rule.hour = 9;
rule.minute = 0;
 
var j = schedule.scheduleJob(rule, function(){
    module.exports = function(controller) {
        controller.on('ambient', function(bot, message) {
            bot.say({
                channel: 'general',
                text: 'Hola, friends! Don\'t forget to do your logs today :thumbsup:'
            });
        });
    }
});