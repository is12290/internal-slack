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
                    const sgMail = require('@sendgrid/mail');
                        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                        const msg = {
                            to: team.installer_email,
                            from: 'ian@getinternal.co',
                            subject: 'Thanks for Installing Internal!',
                            text: 'Hey,\n\nThank you so much for installing Internal to your team’s Slack! We’re on a mission to make virtual communication just as emotionally insightful as in-person communication, and you have taken the first step towards making that a reality.\n\nWith that, I would love to answer any questions, hear any feature requests, or personally guide you through the intent of the app. Please call or text me at any time at (610) 597-5353, or shoot me an email at ian@getinternal.co!\n\nI look forward to hearing from you,\n\nIan Scalzo\nCo-Founder & CEO',
                        };
                        sgMail.send(msg);
                }
            })
        })
    });
}