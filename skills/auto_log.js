module.exports = function (controller) {
    controller.on('interactive_message_callback', function (message, bot) {

        console.log(message);
    })
}