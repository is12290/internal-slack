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

        bot.api.groups.create({ token: bot.config.app_token, name: 'internal-vibe' }, function (err, response) {
            if (err) {
                console.log("error: ", err);
            } else {
                bot.api.groups.setPurpose({ token: bot.config.app_token, channel: response.group.id, purpose: "This channel is used by the Internal app to share insights to how you and your cofounder(s) are feeling" }, function (err, response) {
                    if (err) {
                        console.log("error: ", err);
                    }
                })
                bot.api.groups.setTopic({ token: bot.config.app_token, channel: response.group.id, topic: "Easily monitor your relationship with your cofounder(s)" }, function (err, response) {
                    if (err) {
                        console.log("error: ", err);
                    }
                })
                bot.api.groups.invite({ token: team.bot.app_token, channel: response.group.id, user: team.bot.user_id }, function (err, outcome) {
                    if (err) {
                        console.log("error: ", err);
                    }
                });
                team.bot.channel = response.group.id;
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