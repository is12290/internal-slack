module.exports = function (controller) {
    controller.on('interactive_message_calback', function (bot, message) {
        if (message.text == "Yes-Talk") {
            controller.storage.teams.get(message.team, function (err, team) {
                if (err) {
                    console.log(err);
                }
                bot.reply(message, "Okay! Let me notify your co-founder(s)...");
                bot.api.groups.info({channel: team.bot.info}, function (err, group) {
                    if (err) {
                        console.log(err);
                    }
                    var cofounders = group.members;
                    var notification_message = "<@" + message.user + "> wants to talk about some things that arose during the week";

                    for (var i = 0; i < cofounders.length; i++) {
                        bot.say({
                            text: notification_message,
                            
                        })
                    }
                });
            })
            
        } else if (message.text == "No-Talk") {
            bot.reply(message, "Okay, I understand! I hope next week brings better feelings :sparkling_heart:")
        }
    })
}