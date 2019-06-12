/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Create a new app via the Slack Developer site:

    -> http://api.slack.com

  Run your bot from the command line:

    clientId=<MY SLACK TOKEN> clientSecret=<my client secret> PORT=<3000> node bot.js

# USE THE BOT:

    Navigate to the built-in login page:

    https://<myhost.com>/login

    This will authenticate you with Slack.

    If successful, your bot will come online and greet you.


# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const dotenv = require('dotenv');
dotenv.config();
const dashbot = require('dashbot')(process.env.DASHBOT_API_KEY).slack;


if (!process.env.clientId || !process.env.clientSecret || !process.env.PORT) {
  usage_tip();
  // process.exit(1);
}

var Botkit = require('botkit');
var debug = require('debug')('botkit:main');

var bot_options = {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    clientSigningSecret: process.env.clientSigningSecret,
    // debug: true,
    scopes: ['bot'],
    studio_token: process.env.studio_token,
    studio_command_uri: process.env.studio_command_uri
};

// Use a mongo database if specified, otherwise store in a JSON file local to the app.
// Mongo is automatically configured when deploying to Heroku
if (process.env.MONGODB_URI) {
    var mongoStorage = require('botkit-storage-mongo')({mongoUri: process.env.MONGODB_URI, useNewUrlParser: true, tables: ['results', 'week', 'personal', 'full']});
    bot_options.storage = mongoStorage;
} else {
    bot_options.json_file_store = __dirname + '/.data/db/'; // store user data in a simple JSON format
}

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.slackbot(bot_options);

controller.middleware.receive.use(dashbot.receive);
controller.middleware.send.use(dashbot.send);

controller.startTicking();

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')(controller);

if (!process.env.clientId || !process.env.clientSecret) {

  webserver.get('/', function(req, res){
    res.render('installation', {
      domain: req.get('host'),
      protocol: req.protocol,
      glitch_domain:  process.env.PROJECT_DOMAIN,
      layout: 'layouts/default'
    });
  })

}else {

  webserver.get('/', function(req, res){
    res.render('index', {
      domain: req.get('host'),
      protocol: req.protocol,
      glitch_domain:  process.env.PROJECT_DOMAIN,
      layout: 'layouts/default'
    });
  })
  // Set up a simple storage backend for keeping a record of customers
  // who sign up for the app via the oauth
  require(__dirname + '/components/user_registration.js')(controller);

  // Send an onboarding message when a new team joins
  require(__dirname + '/components/onboarding.js')(controller);

  var normalizedPath = require("path").join(__dirname, "skills");
  require("fs").readdirSync(normalizedPath).forEach(function(file) {
    require("./skills/" + file)(controller);
  });
}

var Honeybadger = require('honeybadger');
Honeybadger.configure({
  apiKey: process.env.HONEYBADGER_API_KEY
});

const schedule = require('node-schedule-tz');
    // Test
var test = schedule.scheduleJob('*/5 * * * *', 'America/New_York', function () {
  var no_data = [];
  var clean_data = [];
  controller.storage.teams.all(function (err, all_teams) {

    for (var i = 0; i < all_teams.length; i++) {
      var instance = all_teams[i];
      if (!instance.channel) {
        no_data.push([instance.bot.token, instance.createdBy])
      } else {
        clean_data.push([instance.bot.token, instance.channel]);
      }

    }
  });

  console.log('CLEAN DATA: ', clean_data);
  console.log('NO DATA: ', no_data);

  bot.spawn({ token: clean_data[1][0] }, function (err, bot) {
    bot.say({
      text: 'haeyy!',
      channel: clean_data[1][1]
    });
  });
});

// Check in
var checkin_notification = schedule.scheduleJob('0 11 * * 1-5', 'America/New_York', function () {
  var no_data = [];
  var clean_data = [];
  controller.storage.teams.all(function (err, all_teams) {

    for (var i = 0; i < all_teams.length; i++) {
      var instance = all_teams[i];
      if (!instance.channel) {
        no_data.push([instance.bot.token, instance.createdBy])
      } else {
        clean_data.push([instance.bot.token, instance.channel]);
      }

    }
  });

  for (var i = 0; i < clean_data.length; i++) {
    controller.spawn({ token: clean_data[i][0] }, function (err, bot) {
      bot.say({
        text: 'Good morning! Don\'t forget to check in with @internal today! (Send me `Check In` over DM)',
        channel: clean_data[i][1]
      });
    });
  }

  for (var z = 0; z < no_data.length; z++) {
    controller.spawn({ token: no_data[i][0] }, function (err, bot) {
      bot.say({
        text: 'Add me to a company wide channel so that I can send daily reminders to fill out logs! You can do this by mentioning me in the channel, or clicking \'Show Channel Details\' -> \'App\' -> \'Add app\'',
        user: no_data[i][1]
      });
    });
  }
});

// Check out
var dayend_notification = schedule.scheduleJob('0 17 * * 1-5', 'America/New_York', function () {
  var clean_data = [];
  controller.storage.teams.all(function (err, all_teams) {

    for (var i = 0; i < all_teams.length; i++) {
      var instance = all_teams[i];
      if (!instance.channel) {
        //pass
      } else {
        clean_data.push([instance.bot.token, instance.channel]);
      }

    }
  });

  for (var i = 0; i < clean_data.length; i++) {
    controller.spawn({ token: clean_data[i][0] }, function (err, bot) {
      bot.say({
        text: 'Good afternoon! Don\'t forget to check out with me *and* report daily results today! (Send me `Check Out` or `Daily Results` over DM)',
        channel: clean_data[i][1]
      });
    });
  }
});

// End of week
var weekend_notification = schedule.scheduleJob('15 18 * * 5', 'America/New_York', function () {
  var clean_data = [];
  controller.storage.teams.all(function (err, all_teams) {

    for (var i = 0; i < all_teams.length; i++) {
      var instance = all_teams[i];
      if (!instance.channel) {
        //pass
      } else {
        clean_data.push([instance.bot.token, instance.channel]);
      }

    }
  });

  for (var i = 0; i < clean_data.length; i++) {
    controller.spawn({ token: clean_data[i][0] }, function (err, bot) {
      bot.say({
        text: 'Way to make it through the week! View your organization\'s emotional fitness for the week with `Weekly Results`',
        channel: clean_data[i][1]
      });
    });
  }
});
