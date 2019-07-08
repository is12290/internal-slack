
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

controller.storage.teams.all(function (err, all) {
  for (var i = 0; i < all.length; i ++) {
    var instance = all[i];
    controller.spawn( {token: instance.bot.token}, function (bot) {
      controller.storage.users.find( {team: instance.id }, function (err, result) {
        for (var j = 0; j < result.length; j++) {
          bot.startConversation({
            user: result[j].id,
            channel: result[j].channels[0],
            text: 'Pleae work',
          })
        }
      })
    })
  }
})
