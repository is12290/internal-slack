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
        if (team.status.subscription.status == 'inactive') {
            var end = moment(team.status.end);
            if (today == end || today > end) {
                // Serve them the 'pay now message
                team.trial.status = 'inactive';
                bot.say({
                    attachments: [{
                        title: "End of Trial",
                        text: "It appears you have reached the end of your 2 week trial! Would you like to subscribe now?",
                        color: "#ff0228",
                        callback_id: 'upgrade',
                        attachment_type: 'default',
                        actions: [
                            {
                                'name': 'yes-button',
                                'value': 'Yes-Subscribe',
                                'text': 'Yes',
                                'type': 'button'
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
                controller.storage.teams.save(team);
            } else {
                // Pass
            }
        }
        
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
