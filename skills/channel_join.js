module.exports = function(controller) {
    controller.on('bot_channel_join', function(bot, message) {
        controller.storage.teams.get(message.team, function(err, team) {
            team.channel = message.channel;
            controller.storage.teams.save(team);
        });

        bot.reply(message, "I am Internal, a bot you use to monitor the emotional fitness of your team and yourself! Let's run through a few quick things:\n\n*Logging*\nParticipating users carry out Check In and Check Out logs in direct message with me every day. As expected, Check Ins are completed at the start of the work day and Check Outs at the end. The logs are 4 topics with 4 possible answers for each - A total of 16 possible choices - and can be carried out by sending me a message saying `Check In` or `Check Out`\n\n*Team Reporting*\nThe results of logs are aggregated and can be reported daily or weekly. Daily reports show the aggregate responses for that day, as weekly reports show the average of each day’s outcome within that given week. Team reports can be viewed by sending me direct message, or mentioning me (@), with the message `Daily Results` or `Weekly Results`\n\n*Personal Reporting*\nUsers can keep track of their own emotional fitness on a weekly basis. Personal reports are only accessible by the individual, meaning that they can only be reported over direct message by sending me `Personal Results`\n\nThat is it! If you have additional questions, comments, or problems, be sure to contact my creator at support@getinternal.co")
    })
}