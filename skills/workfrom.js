module.exports = function (controller) {
    controller.hears(['I\'m a Workfrom member', '^workfrom'], function (bot, message) {
        controller.storage.teams.get(message.team, function (err, team) {
            if (err) {
                console.log(err);
            }
            if (!team.status.trial.workfrom) {
            var moment = require('moment');
            var startDate = moment(team.status.trial.start);
            var extended = startDate.add(1, 'M');
            var extendedFormatted = extended.format('MM/DD/YYYY');
            team.status.trial.end = extendedFormatted;
            team.status.trial.workform = true;
            controller.storage.teams.save(team);
            bot.reply(message, 'Your Workfrom trial has been redeemed! Your trial ends ' + extendedFormatted);
            } else if (team.status.trial.workfrom == true) {
                bot.reply(message, 'Your Workfrom membership trial has already been redeemed!');
            }
        })
    })
}