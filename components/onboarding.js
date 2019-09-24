var debug = require('debug')('botkit:onboarding');

module.exports = function (controller) {

    controller.on('onboard', function (bot, team) {
        debug('Starting an onboarding experience!');

        bot.api.users.info({ user: bot.config.createdBy }, function (err, response) {
            if (err) {
                console.log("error: ", err);
            }
            team.installer_email = response.user.profile.email;
        });

        bot.api.channels.create({ token: bot.config.app_token, name: 'internal-vibe' }, function (err, response) {
            if (err) {
                console.log("error: ", err);
                bot.reply(reply, "I'm sorry, that channel name is already taken. Try another?");
                convo.repeat();
            } else {
                bot.api.channels.setPurpose({ token: bot.config.app_token, channel: response.channel.id, purpose: "This channel is used by the Internal app to share the daily overall emotional scores of those who opt to share." }, function (err, response) {
                    if (err) {
                        console.log("error: ", err);
                    }
                })
                bot.api.channels.setTopic({ token: bot.config.app_token, channel: response.channel.id, topic: "Know how your coworkers are doing today" }, function (err, response) {
                    if (err) {
                        console.log("error: ", err);
                    }
                })
                bot.api.channels.invite({ token: team.bot.app_token, channel: response.channel.id, user: team.bot.user_id }, function (err, outcome) {
                    if (err) {
                        console.log("error: ", err);
                    }
                });
                team.bot.channel = response.channel.id;
                controller.storage.teams.save(team);
            }
        });

        bot.startPrivateConversation({ user: bot.config.createdBy }, function (err, convo) {
            if (err) {
                console.log(err);
            }
            convo.say("Hey, <@" + bot.config.createdBy + ">! Thank you for installing me to this wonderful Slack team :hugging_face:");

            convo.activate()

            convo.on('end', function (convo) {
                if (convo.successful()) {
                    // Do Nothing
                }
            })
        })
    });
}