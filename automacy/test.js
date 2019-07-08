
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


controller.spawn({ token: 'xoxb-611368649089-668826712322-H4tJJAesxtf8iJFXAFJ27bCw' }, function (bot) {

    bot.startConversation({
        user: 'UHZAUK473',
        channel: 'DL074NQTS',
        text: 'dummy'
        }, function(err, convo) {
          convo.ask({
          channel: 'DL074NQTS',
          text: 'Just what do you think you are doing, Dave?'
           }, function(res, convo) {
             convo.say(res.text + ' is not a good enough answer.')
             convo.next()
             }
      )}
    );
})

