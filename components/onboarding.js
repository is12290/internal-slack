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
                bot.api.groups.setPurpose({ token: bot.config.app_token, channel: response.channel.id, purpose: "This channel is used by the Internal app to share insights to how you and your cofounder(s) are feeling" }, function (err, response) {
                    if (err) {
                        console.log("error: ", err);
                    }
                })
                bot.api.groups.setTopic({ token: bot.config.app_token, channel: response.channel.id, topic: "Easily monitor your relationship with your cofounder(s)" }, function (err, response) {
                    if (err) {
                        console.log("error: ", err);
                    }
                })
                bot.api.groups.invite({ token: team.bot.app_token, channel: response.channel.id, user: team.bot.user_id }, function (err, outcome) {
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
            convo.ask("Would you mind sending me the email you used to start your subscription?", function (response, convo) {
                stripe.customers.list( { email: response.text }, function (err, customers) {
                    if (err || !customers) {
                        bot.reply(message, "I actually wasn't able to verify that email. Are you sure it is correct?");
                        convo.repeat();
                    } else if (customers) {
                        team.stripe_email = response.text;
                        controller.storage.teams.save(team);
                        bot.api.reactions.add({
                            name: 'thumbsup',
                            channel: message.channel,
                            timestamp: reply.ts
                        });
                        bot.reply(message, "Email verified!\nThank you for that :blush:");
                        convo.stop();
                    }
                })
                convo.next()
            })

            convo.activate()

            convo.on('end', function (convo) {
                if (convo.successful()) {
                    // Do Nothing
                }
            })
        })
    });
}