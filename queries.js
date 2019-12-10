personal_questions = {
    'warmth': [ // high == empathetic, attentive to others, kindly, easygoing, participating |  low == impersonal, distant, cool, reserved, detached, formal, aloof
        'I try not to think about the needy', // true == 0 | false == 1
        'I feel others\'s emotions', // true == 1 | false == 0
        'I know how to comfort others' // true == 1 | false == 0
    ],
    'dominance': [ // high == bossy, dominant, forceful, assertive, aggressive, competitve, stubborn | low == cooperative, deferential, avoids conflict, submissive, humble, obedient, docile
        'I feel uncomfortable giving orders to others', // true == 0 | false == 1
        'I take control of things', // true == 1 | false == 0
        'I feel guilty when I say "no"' // true == 0 | false == 1
    ],
    'sensitivity': [ // high == sentimental, sensitive, aesthetic, intuitive, refined | low == utilitarian, objective, unsentimental, self-reliant, rough
        'I don\'t worry about things that have already happened', // true == 0 | false == 1
        'I spend time thinking about past mistakes', // true == 1 | false == 0
        'I cry during movies' // true == 1 | false == 0
    ],
    'stability': [ // high == adaptive, stable, mature, faces reality calmly | low == reactive, changeable, affected by feelings
        'I am comfortable with myself', // true == 1 | false == 0
        'I get irritated easily', // true == 0 | false == 1
        'I rarely notice my emotional reactions' // true == 0 | false == 1
    ],
    'privateness': [ // high == diplomatic, private, descreet, nondiscolsing, shrewd | low == naive, forthright, artless, open, guileless
        'I enjoy my privacy', // true == 1 | false == 0
        'I read a lot', // true == 1 | false == 0
        'I don\'t talk a lot' // true == 1 | false == 0
    ]
};

perceived_questions = {
    'warmth': [ // high == empathetic, attentive to others, kindly, easygoing, participating |  low == impersonal, distant, cool, reserved, detached, formal, aloof
        ' makes people feel at ease', // true == 1 | false == 0
        ' doesn\'t like to get involved in other\'s problems', // true == 0 | false == 1
        ' knows how to comfort others' // true == 1 | false == 0
    ],
    'dominance': [ // high == bossy, dominant, forceful, assertive, aggressive, competitve, stubborn | low == cooperative, deferential, avoids conflict, submissive, humble, obedient, docile
        ' lets others make the decisions', // true == 0 | false == 1
        ' takes charge', // true == 1 | false == 0
        ' can take strong measures' // true == 1 | false == 0
    ],
    'sensitivity': [ // high == sentimental, sensitive, aesthetic, intuitive, refined | low == utilitarian, objective, unsentimental, self-reliant, rough
        ' shows their feelings', // true == 1 | false == 0
        ' is easily put out', // true == 1 | false == 0
        ' is easily discouraged' // true == 1 | false == 0
    ],
    'stability': [ // high == adaptive, stable, mature, faces reality calmly | low == reactive, changeable, affected by feelings
        ' is not easily annoyed', // true == 1 | false == 0
        ' is relaxed most of the time', // true == 1 | false == 0
        ' has frequent mood swings' // true == 0 | false == 1
    ],
    'privateness': [ // high == diplomatic, private, descreet, nondiscolsing, shrewd | low == naive, forthright, artless, open, guileless
        ' doesn\'t talk a lot', // true == 1 | false == 0
        ' is hard to get to know', // true == 1 | false == 0
        ' reveals little about themself' // true == 1 | false == 0
    ]
};

user = {
    privateness: {
        1: true,
        2: false,
    }
}