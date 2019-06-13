const dotenv = require('dotenv');
dotenv.config();
const Botkit = require('botkit');

var bot_options = {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    clientSigningSecret: process.env.clientSigningSecret,
    // debug: true,
    scopes: ['bot'],
    studio_token: process.env.studio_token,
    studio_command_uri: process.env.studio_command_uri
};

var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true, tables: ['results', 'week', 'personal', 'full'] });
bot_options.storage = mongoStorage;

var controller = Botkit.slackbot(bot_options);
// Morning
controller.storage.teams.all(function (err, all_teams) {
    // Check in
    var no_data = [];
    var clean_data = [];

    for (var i = 0; i < all_teams.length; i++) {
        var instance = all_teams[i];
        if (!instance.channel) {
            no_data.push([instance.bot.token, instance.createdBy])
        } else {
            clean_data.push([instance.bot.token, instance.channel]);
        }

    }

    for (var i = 0; i < clean_data.length; i++) {
        controller.spawn({ token: clean_data[i][0] }, function (bot) {
            bot.say({
                text: 'Good morning! Don\'t forget to check in with @internal today! (Send me `Check In` over DM)',
                channel: clean_data[i][1]
            });
        });
        controller.shutdown();
    }

    for (var z = 0; z < no_data.length; z++) {
        controller.spawn({ token: no_data[i][0] }, function (bot) {
            bot.startPrivateConversation({ user: no_data[i][1] }, function (err, dm) {
                dm.say('Add me to a company wide channel so that I can send daily reminders to fill out logs! You can do this by mentioning me in the channel, or clicking \'Show Channel Details\' -> \'App\' -> \'Add app\'');
            });
        });

        controller.shutdown();
    }
});