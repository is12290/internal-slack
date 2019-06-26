function notification() {
    var messages = {
        '1': ["Way to make it through the day! Be sure to report your team’s `Daily Results` after you `Check Out`"],
        '2': ["Wait! Don’t forget your `Check Out`!", "Way to make it through the day! Be sure to report your team’s `Daily Results` after you `Check Out`"],
        '3': ["You’re over halfway there! Don’t forget to `Check Out`!", "Way to make it through the day! Be sure to report your team’s `Daily Results` after you `Check Out`"],
        '4': ["4 down, 1 to go. `Check Out` and it’ll be the weekend before you know it!", "Final item on your to-do list? `Check Out`.", "Way to make it through the day! Be sure to report your team’s `Daily Results` after you `Check Out`"],
        '5': ["`Check Out` and let the weekend begin!", "Woohoo! You made it through the week! `Check Out` and enjoy your weekend", "Weekly results: up next! All that’s left is your `Check Out`", "Congrats on successfully existing another week on Earth as a sentient being! Take a gander at your `Weekly Results` after you `Check Out`. Have a great weekend!"]
    };

    var d = new Date();
    var n = d.getDay();
    if (n === 6 || n === 0) {
        //Pass
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


            var min = Math.ceil(0);
            var max = Math.floor(messages[n].length);
            var msg = Math.floor(Math.random() * (max - min + 1)) + min;

            for (var i = 0; i < clean_data.length; i++) {
                controller.spawn({ token: clean_data[i][0] }, function (bot) {
                    var d = new Date();
                    var n = d.getDay();

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


