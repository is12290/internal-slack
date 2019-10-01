var moment = require('moment');
const today = moment().format('MM/DD/YYYY');
const dotenv = require('dotenv');
dotenv.config();
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
        if (team.status && team.status.subscription.status == 'inactive' && team.status.subscription.seats_used == 0) {
            if (team.status.alerted && team.status.alerted == true) {
                // Pass
            } else {
                var end = moment(team.status.trial.end);
                if (today == end || today > end) {
                    // Serve them the 'pay now message
                    team.status.trial.status = 'inactive';
                    team.status.trial.tally = team.status.trial.tally + 1;
                    bot.say({
                        attachments: [{
                            title: "End of Trial",
                            text: "It appears you have reached the end of your 2 week trial! Would you like to subscribe now?",
                            color: "#ff0228",
                            callback_id: 'upgrade',
                            attachment_type: 'default',
                            actions: [
                                {
                                    'text': 'Yes',
                                    'type': 'button',
                                    'url': 'https://getinternal.co/subscribe'
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
                    team.status.alerted = true;
                    controller.storage.teams.save(team);
                } else {
                    // Pass
                }
            }
        } else if (team.status.subscription.seats >= team.status.subscription.seats) {
            bot.say({
                attachments: [{
                    title: "Seat Limit Reached",
                    text: "Oops, it seems like you've reached the maximum amount of seats you currently pay for! Would you like to add more?",
                    color: "#ff0228",
                    callback_id: 'upgrade',
                    attachment_type: 'default',
                    actions: [
                        {
                            'text': 'Yes',
                            'type': 'button',
                            'url': 'https://getinternal.co/subscribe'
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
        // Eventually add subscription data
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
