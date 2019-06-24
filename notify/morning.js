function notification() {
    var messages = {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': []
    };

    var d = new Date();
    var n = d.getDay();
    if (n === 6 || n === 0) {
        // Pass
    } else {
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
            var clean_data = [];

            for (var i = 0; i < all_teams.length; i++) {
                var instance = all_teams[i];
                if (!instance.channel) {
                    // Pass
                } else {
                    clean_data.push([instance.bot.token, instance.channel]);
                }

            }

            var min = Math.ceil(0);
            var max = Math.floor(3);
            var msg = Math.floor(Math.random() * (max - min + 1)) + min;

            for (var i = 0; i < clean_data.length; i++) {
                controller.spawn({ token: clean_data[i][0] }, function (bot) {
                    bot.say({
                        text: messages[n][msg],
                        channel: clean_data[i][1]
                    });
                });
            }
        });

    }
}

notification();
