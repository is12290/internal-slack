import { getAverage } from "average.js";
import { getPercentage } from "percentage.js";

module.exports = function(controller) {

    controller.hears(['result', 'Result', 'results', 'Results'], 'direct_message,direct_mention', function(bot, message) {
        
        if (message.is_admin) {
            getAverage();
            getPercentage();

            const content = {
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Hey! Here are your results...\n\n*Sleep*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "color": "#02D2FF",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Positive:* " + sleepOutcomePositive + "\n*Negative:* " + sleepOutcomeNegative + "\n" + sleepMessage + "\n\n*Energy*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "color": "#2A02FF",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Positive:* " + energyOutcomePositive + "\n*Negative:* " + energyOutcomeNegative + "\n" + energyMessage + "\n\n*Mood*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "color": "#8A02FF",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Positive:* " + moodOutcomePositive + "\n*Negative:* " + moodOutcomeNegative + "\n" + moodMessage + "\n\n*Motivation*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "color": "#CF02FF",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Positive:* " + motivationOutcomePositive + "\n*Negative:* " + motivationOutcomeNegative + "\n" + motivationMessage + "\n\n*Efficiency*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "color": "#FF029D",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Positive:* " + efficiencyOutcomePositive + "\n*Negative:* " + efficiencyOutcomeNegative + "\n" + efficiencyMessage + "\n\n*Fulfillment*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "color": "#FF8402",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Positive:* " + fulfillmentOutcomePositive + "\n*Negative:* " + fulfillmentOutcomeNegative + "\n" + fulfillmentMessage + "\n\n*Overall*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "color": "#02FF57",
                        "text": {
                            "type": "mrkdwn",
                            "text": dayMessage
                        }
                    }
                ]
            };

            bot.reply(message, content);

        } else {
            bot.reply(message, 'My sincerest apologies, but you have to be an admin to report the results :upside_down_face:');
        }
    });
};