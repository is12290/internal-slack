
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

var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true });
bot_options.storage = mongoStorage;

var controller = Botkit.slackbot(bot_options);

controller.storage.teams.all(function (err, allTeams) {
    controller.spawn({ token: allTeams[0].bot.token }, function (bot) {

        bot.startPrivateConversation({ user: 'UHZAUK473' }, function (err, dm) {
            dm.say("Hi!");
        });
    })
})
