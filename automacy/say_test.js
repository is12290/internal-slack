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

var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGODB_URI, useNewUrlParser: true, tables: ['teams', 'user'] });
bot_options.storage = mongoStorage;

var controller = Botkit.slackbot(bot_options);

controller.spawn( {token: 'xoxb-611368649089-668826712322-H4tJJAesxtf8iJFXAFJ27bCw'}, function (bot) {
    bot.api.im.open({
        user: 'UHZAUK473'
      }, (err, res) => {
        if (err) {
          console.log('Failed to open IM with user', err);
        }
        console.log(res);
        console.log(user_id);
        bot.startConversation({
          user: 'UHZAUK473',
          channel: res.channel.id,
          text: 'PLEASE WORK'
        }, (err, convo) => {
          if(err) {
            console.log("error: ", err);
          }
          convo.say('FINALLY');
        });
      });
})