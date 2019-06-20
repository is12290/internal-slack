var debug = require('debug')('botkit:onboarding');

module.exports = function (controller) {

    controller.on('onboard', function (bot) {
        debug('Starting an onboarding experience!');

        controller.storage.teams.get(bot.config.id, function (err, team) {
            if (typeof team == 'undefined') {
                // pass
            } else {
                bot.api.users.info({ user: bot.config.createdBy }, function (err, response) {
                    team.email = response.user.profile.email;
                    controller.storage.teams.save(team);
                });
            }
        });

        bot.startPrivateConversation({ user: bot.config.createdBy }, function (err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.say("I am Internal, a bot you use to monitor the emotional fitness of your team. Let's run through a few quick things:\n\n*Logging*\nParticipating users carry out Check In and Check Out logs in direct message with me every day. As expected, Check Ins are completed at the start of the work day and Check Outs at the end. The logs are 4 topics with 4 possible answers for each - A total of 16 possible choices - and can be carried out by sending me a message saying `Check In` or `Check Out`\n\n*Team Reporting*\nThe results of logs are aggregated and can be reported daily or weekly. Daily reports show the aggregate responses for that day, as weekly reports show the average of each day’s outcome within that given week. Team reports can be viewed by sending me direct message, or mentioning me (@), with the message `Daily Results` or `Weekly Results`\n\n*Personal Reporting*\nUsers can keep track of their own emotional fitness on a weekly basis. Personal reports are only accessible by the individual, meaning that they can only be reported over direct message by sending me `Personal Results`\n\n*Notifications*\nI send notifications to remind users to carry out their logs and reporting, but need to be added to a public channel to do so. If you’re interested in this, would you mind inviting me by either mentioning me in the channel or clicking on ‘Channel Details’ -> ‘Add App’ -> ‘Internal’?\n\nThat is it! If you have additional questions, comments, or problems, be sure to contact my creator at support@getinternal.co");
            }
        });
    });

}
