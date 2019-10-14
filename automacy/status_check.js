var moment = require('moment');
const today = moment().format('MM/DD/YYYY');
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(STRIPE_KEY);
const Botkit = require('botkit');

var bot_options = {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    clientSigningSecret: process.env.clientSigningSecret,
    // debug: true,
    scopes: ['bot']
};

var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true });
bot_options.storage = mongoStorage;

var controller = Botkit.slackbot(bot_options);
controller.startTicking();

controller.storage.teams.all(function (err, teams) {
    if (err) {
        console.log("error: ", err);
    }
    for (var j = 0; j < teams.length; j++) {
        var team = teams[j];
        var subscription_status = '';
        stripe.customers.list({ email: team.stripe_email }, function (err, customers) {
            if (err || !customers) {
                team.subscription.status = 'inactive';
                controller.storage.teams.save(team);
                subscription_status = subscription_status + 'inactive';
            } else if (customers) {
                if (customers[0].data.subscriptions.data[0].ended_at == 'null') {
                    team.subscription.status = 'active';
                    controller.storage.teams.save(team);
                    subscription_status = subscription_status + 'active';
                } else {
                    team.subscription.status = 'inactive';
                    controller.storage.teams.save(team);
                    subscription_status = subscription_status + 'inactive';
                }
            }

            if (subscription_status == 'inactive') {
                bot.say({
                    text: "No Subscription",
                    attachments: [{
                        title: "Subscription Ended",
                        text: "It appears yous subscription has ended. Would you like to renew?",
                        color: "#ff0228",
                        callback_id: 'upgrade',
                        attachment_type: 'default',
                        actions: [
                            {
                                'text': 'Yes',
                                'type': 'button',
                                'url': 'https://getinternal.co/#pricing'
                            },
                            {
                                'name': 'no-button',
                                'value': 'No-Subscribe',
                                'text': 'No',
                                'type': 'button'
                            }
                        ]
                    }],
                    channel: team.bot.channel
                });
            }
        })
    }
})


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
