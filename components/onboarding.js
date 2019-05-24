var debug = require('debug')('botkit:onboarding');

module.exports = function(controller) {

    controller.on('onboard', function(bot) {
        debug('Starting an onboarding experience!');
        bot.startPrivateConversation({user: bot.config.createdBy},function(err,convo) {
            if (err) {
            console.log(err);
            } else {
            convo.say('I am interal - A bot you use daily to log how you\'re feeling!\nGet started with `Check in`, `Check out`, or `Results` :thumbsup:\n\nI\'d also really appreciate it if you invited me to #general so that I can send some reminders!');
            }
        });
    });

}
