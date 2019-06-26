function notification() {
    var messages = {
        '1': ["Let's start this week off right with a quick `Check In`!", "Wohoo! Reward yourself for getting out of bed this morning with a `Check In`", "New day, new week, fresh start… `Check In!`", "Start your week off on a good note with a `Check In`", "`Check In` to start this week off strong"],
        '2': ["Don't forget your `Check In` - It's for your own good!!", "Good morning! Take a moment to `Check In`", "How are you feeling on this fine Tuesday? Remember to log it in your `Check In`"],
        '3': ["The week is halfway done already?! Freeze time for a minute to `Check In`", "Time to log how you're feeling on this glorious hump day! :star_struck:", "Push past that mid-week slump with your daily `Check In`!", "Happy hump day! `Check In` and you’re officially halfway through the week"],
        '4': ["You’re on a roll… not much longer now! `Check In` and let's get this day going"],
        '5': ["Finish this week off strong beginning with your `Check In`"]
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
            var max = Math.floor(messages[n].length);
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
