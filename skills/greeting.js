module.exports = function(controller) {

    controller.hears(['^hi', '^hello', '^yo'], 'direct_message,direct_mention', function(bot, message) {
        
        var messages = ["Greetings! I hope you’re doing well today. If you’re looking for help, reply with `Help`",
        "Yoyo! Let me know if I can help you out with `Help`",
        "Whaaaats up?! Respond with `Help` for some things I can do. Have a great day!",
        "How’s it goin today? I sure hope well! Let me know if I can `Help` with anything…"];

        var min = Math.ceil(0);
        var max = Math.floor(3);
        var msg = Math.floor(Math.random() * (max - min + 1)) + min;

        bot.reply(message, messages[msg]);
    });



};