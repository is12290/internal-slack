module.exports = function (controller) {
    controller.on('interactive_message_callback', function (bot, message) {

        console.log(message);
    })
}