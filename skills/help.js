module.exports = function(controller) {

    controller.hears(['^help', '^info'], 'direct_message,direct_mention', function(bot, message) {
        bot.reply(message, "No worries, I’ve got your back!\n\n*Logging*\n`Check In` - Over direct message to complete your daily check in log\n`Check Out` - Over direct message to complete your daily check out log\n\n*Reporting*\n`Daily Results` - Over direct message or public mention to view your organization’s aggregate results\n`Weekly Results` - Over direct message or public mention to view your organization’s weekly average scores\n`Monthly Results` - Over direct message or public mention to view your organization’s monthly average scores\n`Personal Weekly Results` - Over direct message to view your personal weekly average scores (Only you can access these)\n`Personal Monthly Results` - Over direct message to view your personal monthly average scores (Again, only you can access these)\n\n*Customization*\n`Set Up Logs` - Over direct message to set up what time I will automatically send you the check in and check out logs to complete\n`Set Up Reports` - Over direct message or public mention to set what days and times I automatically report your organization’s result\n`Custom Question` - Over direct message to append a 5th question to the team-wide check in and check out logs (If you're in the right role to do this)\n`Set Up Personal Reports` - Over direct message to set up personal reports to be automatically administered\n\nIf I wasn’t able to help you out, try reaching out to one of my human counterparts at support@getinternal.co!")
    });



};