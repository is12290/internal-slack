module.exports = function (controller) {
    controller.hears(['^subscription Check', '^subscription check'], 'direct_message,direct_mention', function (bot, message) {
        controller.storage.teams.get(message.team, function (err, team) {
            if (err) {
                console.log("error: ", err);
            }

            bot.startConversation(message, function (err, convo) {
                if (err) {
                    console.log("error: ", err);
                }
    
                convo.ask("What was the email you used to pay for your subscription?", function (response, convo) {
                    const stripe = require('stripe')(STRIPE_KEY);
                    stripe.customers.list( { email: response.text }, function (err, customers) {
                        if (err || !customers) {
                            bot.reply(message, "I actually wasn't able to verify that email. Are you sure it is correct?");
                            convo.repeat();
                        } else if (customers) {
                            team.subscription.status = 'active';
                            team.stripe_email = response.text;
                            controller.storage.teams.save(team);
                            bot.api.reactions.add({
                                name: 'thumbsup',
                                channel: message.channel,
                                timestamp: reply.ts
                            });
                            bot.reply(message, "Your subscription has been reactivated!\nEnjoy continued use of Internal :blush:");
                            convo.stop();
                        }
                    })
                })
    
                convo.activate();

                convo.on('end', function (convo) {
                    if (convo.successful()) {
                        //Don't do anything
                    }
                })
    
            })
        })
    })
}