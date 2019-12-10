var debug = require('debug')('botkit:onboarding');

module.exports = function (controller) {

    controller.on('onboard', function (bot, team) {
        debug('Starting an onboarding experience!');

        bot.api.users.info({ user: bot.config.createdBy }, function (err, response) {
            if (err) {
                console.log("error: ", err);
            }
            team.installer_email = response.user.profile.email;


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
                            text: 'Hey ' + response.user.real_name + ',\n\nThank you so much for installing Internal! My name is Ian Scalzo and I\'m the creator of the app. If you have any questions, comments, or concerns, I can be reached at this email (ian@getinternal.co) or via text/call at +1 (610) 597-5353.\n\nTo a healthier work life,\nIan Scalzo',
                        };
                        sgMail.send(msg);
                    }
                })
            })
        });
    });
}