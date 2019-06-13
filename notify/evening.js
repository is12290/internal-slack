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

var mongoStorage = require('botkit-storage-mongo')({mongoUri: process.env.MONGODB_URI, useNewUrlParser: true, tables: ['results', 'week', 'personal', 'full']});
bot_options.storage = mongoStorage;

var controller = Botkit.slackbot(bot_options);

controller.storage.teams.all(function (err, all_teams) {

    // Check out
    var clean_data = [];

    for (var i = 0; i < all_teams.length; i++) {
        var instance = all_teams[i];
        if (!instance.channel) {
            //pass
        } else {
            clean_data.push([instance.bot.token, instance.channel]);
        }

    }

    for (var i = 0; i < clean_data.length; i++) {
        controller.spawn({ token: clean_data[i][0] }, function (bot) {
            var d = new Date();
            var n = d.getDay();

            if (n === 5) {
                bot.say({
                    text: 'Way to make it through the week! Remember to check out with me and view your organization\'s emotional fitness for the week with `Weekly Results`',
                    channel: clean_data[i][1]
                });
            } else {
                bot.say({
                    text: 'Good afternoon! Don\'t forget to check out with me *and* report daily results today! (Send me `Check Out` or `Daily Results` over DM)',
                    channel: clean_data[i][1]
                });
            }

        });
    }
});

controller.shutdown();