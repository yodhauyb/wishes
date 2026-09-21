export interface WishPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  sections: { name: string; wishes: string[] }[];
}

export const WISH_PAGES: WishPage[] = [
  {
    slug: 'happy-birthday-wishes-for-sister',
    title: 'Happy Birthday Wishes for Sister',
    metaTitle: '50+ Happy Birthday Wishes for Sister (Heartfelt & Funny)',
    metaDescription: 'Heartfelt, funny and emotional birthday wishes for your sister. Copy your favourite message and turn it into a digital gift she will never forget.',
    heading: 'Happy Birthday Wishes for Sister 🎂',
    intro: 'Your sister deserves more than a forwarded message. Pick a wish below, personalize it, and surprise her with a digital gift she can open on her special day.',
    sections: [
      {
        name: 'Heartfelt Wishes',
        wishes: [
          'Happy birthday to the first friend I ever made and the best friend I will ever have. I love you, sis.',
          'You have been my protector, my partner in crime, and my greatest blessing. Have the happiest of birthdays.',
          'Growing up with you was a gift. Watching you shine every year is an even bigger one. Happy birthday!',
          'No matter how old we get, I will always be the kid who looks up to you. Happy birthday, didi.',
          'May your year be filled with the same joy you bring into our family every single day.',
          'Thank you for every secret kept, every fight forgiven, and every laugh shared. Happy birthday, sister.',
          'You make our family brighter just by being in it. Wishing you the most beautiful birthday yet.',
          'A sister like you is life\'s way of saying it wants the best for me. Happy birthday!',
        ],
      },
      {
        name: 'Funny Wishes',
        wishes: [
          'Happy birthday to the only person allowed to steal my clothes, my food, and the TV remote.',
          'Congrats on being another year older and still the second-best looking sibling. Happy birthday!',
          'I would make a big birthday speech, but you already know everything about me. You were there for it all. 😄',
          'Thanks for always blaming me when Mom asked who broke it. Happy birthday anyway, love you!',
          'You are not old, you are just a classic. Happy birthday, sister!',
          'Another year of pretending to share. Happy birthday to my favourite roommate from childhood!',
        ],
      },
      {
        name: 'Short & Sweet Wishes',
        wishes: [
          'Happiest birthday, sis! Love you to the moon and back. 💖',
          'To my sister, my first friend, my forever person. Happy birthday!',
          'Best sister ever. Worst secret keeper. Happy birthday! 😂',
          'Wishing you cake, gifts, and zero chores today. Happy birthday!',
          'Shine bright today, it is your day! Happy birthday, sister.',
        ],
      },
    ],
  },
  {
    slug: 'happy-birthday-wishes-for-brother',
    title: 'Happy Birthday Wishes for Brother',
    metaTitle: '50+ Happy Birthday Wishes for Brother (Funny & Emotional)',
    metaDescription: 'The best birthday wishes for your brother - funny, emotional and short messages. Copy one and make his day with a personalized digital surprise.',
    heading: 'Happy Birthday Wishes for Brother 🎉',
    intro: 'From partner-in-crime to personal bodyguard, your brother has played every role. Pick the wish that sounds like him and make his birthday unforgettable.',
    sections: [
      {
        name: 'Heartfelt Wishes',
        wishes: [
          'Happy birthday to the brother who taught me to fight my own battles, then fought them with me anyway.',
          'Behind every confident younger sibling is a brother who took all the blame first. Happy birthday, bhai.',
          'You are my brother by birth and my best friend by choice. Have an amazing birthday.',
          'May this year bring you everything you have worked so hard for. Happy birthday, brother.',
          'Thank you for being the shield I never had to ask for. Happy birthday!',
          'The best part of growing up with you is realizing my hero was home all along. Happy birthday.',
          'Wishing you a year of big wins, good health, and even better company. Happy birthday, bhai!',
        ],
      },
      {
        name: 'Funny Wishes',
        wishes: [
          'Happy birthday to the reason our parents learned patience. Love you, brother!',
          'You are not just my brother, you are my free tech support. Stay young and updated. 😂',
          'Congrats! You have officially reached the age where you grunt when you sit down.',
          'I asked for a birthday wish for you, but you already used up all the good ones. Happy birthday anyway!',
          'Happy birthday to my first bully and my loudest cheerleader.',
          'Being my brother is the only gift you needed. Just kidding, here is cake too.',
        ],
      },
      {
        name: 'Short & Sweet Wishes',
        wishes: [
          'Happy birthday, bhai! Stay awesome. 🤘',
          'Best brother, worst music taste. Happy birthday!',
          'To my brother and forever friend - happy birthday!',
          'Grow older, not up. Happy birthday! 😄',
          'Wishing you the biggest slice and the loudest party. Happy birthday!',
        ],
      },
    ],
  },
  {
    slug: 'happy-birthday-wishes-for-best-friend',
    title: 'Happy Birthday Wishes for Best Friend',
    metaTitle: '50+ Birthday Wishes for Your Best Friend (Funny & Heartfelt)',
    metaDescription: 'Make your best friend\'s day with birthday wishes that actually sound like you. Copy a message and turn it into a digital surprise gift.',
    heading: 'Happy Birthday Wishes for Best Friend 🥳',
    intro: 'Your best friend has heard it all - so give them a wish with real feeling. Choose one below and deliver it in a way they will screenshot and keep.',
    sections: [
      {
        name: 'Heartfelt Wishes',
        wishes: [
          'Happy birthday to the person who knows my worst stories and stays anyway. Love you, bestie.',
          'Some people have friends. I hit the jackpot. Happy birthday!',
          'Thank you for every 2 AM call, every bad decision supported, and every good one celebrated. Happy birthday!',
          'May your birthday be as loyal, chaotic and wonderful as our friendship.',
          'Distance means nothing when your friendship means everything. Happiest of birthdays!',
          'You were there before I knew who I was, and you are here after. Happy birthday, best friend.',
        ],
      },
      {
        name: 'Funny Wishes',
        wishes: [
          'Happy birthday to my emergency contact, therapist, and partner in crime.',
          'We have been friends so long I no longer know which memories are ours. Happy birthday!',
          'You are the reason for at least 60% of my laugh lines. Happy birthday!',
          'Another year older, still zero wiser. Happy birthday, bestie!',
          'Happy birthday! Our friendship is proof that bad influences can be lifelong.',
          'I would bake you a cake, but we both know how that ends. Store-bought it is!',
        ],
      },
      {
        name: 'Short & Sweet Wishes',
        wishes: [
          'HBD to my person. 💛',
          'Same soul, different birthdays. Happy birthday!',
          'Best friend by chance, family by choice. HBD!',
          'It is your day, bestie! Go be iconic.',
          'Cake today, chaos tomorrow. Happy birthday!',
        ],
      },
    ],
  },
  {
    slug: 'happy-anniversary-wishes-for-husband',
    title: 'Happy Anniversary Wishes for Husband',
    metaTitle: '40+ Anniversary Wishes for Husband (Romantic & Sweet)',
    metaDescription: 'Romantic, emotional and sweet anniversary wishes for your husband. Copy your favourite and surprise him with a digital gift he will treasure.',
    heading: 'Happy Anniversary Wishes for Husband 💍',
    intro: 'Another year of choosing each other deserves more than a text. Pick a wish below and deliver it inside a personalized digital surprise.',
    sections: [
      {
        name: 'Romantic Wishes',
        wishes: [
          'Every year with you feels like the first date and the homecoming at once. Happy anniversary, my love.',
          'I did not marry the perfect man - I married the perfect man for me. Happy anniversary.',
          'Thank you for turning ordinary days into my favourite memories. Happy anniversary, husband.',
          'Still my favourite hello and my hardest goodbye. Happy anniversary.',
          'You are my today and all of my tomorrows. Happy anniversary, my love.',
          'Loving you is the easiest thing I have ever done. Happy anniversary!',
        ],
      },
      {
        name: 'Sweet & Simple Wishes',
        wishes: [
          'Cheers to another year of us. Happy anniversary, babe.',
          'Happy anniversary to the man who still makes my heart skip.',
          'Here is to more laughter, more adventures, and more you. Happy anniversary!',
          'My favourite person, my forever date. Happy anniversary.',
          'A year older together, a year closer than ever. Happy anniversary!',
        ],
      },
      {
        name: 'Playful Wishes',
        wishes: [
          'Happy anniversary to the man who snored through our first movie and still got a second date.',
          'Thank you for pretending my cooking is great. That is true love. Happy anniversary!',
          'We survived another year of my remote control. You deserve a medal. Happy anniversary!',
          'Marriage is just texting each other from different rooms. Happy anniversary, partner!',
        ],
      },
    ],
  },
  {
    slug: 'happy-anniversary-wishes-for-wife',
    title: 'Happy Anniversary Wishes for Wife',
    metaTitle: '40+ Anniversary Wishes for Wife (Romantic & Emotional)',
    metaDescription: 'Touching, romantic and sweet anniversary wishes for your wife. Copy one and turn it into a digital surprise she will open with a smile.',
    heading: 'Happy Anniversary Wishes for Wife 💕',
    intro: 'She remembers every anniversary detail - so make this one count. Choose a wish below and deliver it as a surprise she can keep forever.',
    sections: [
      {
        name: 'Romantic Wishes',
        wishes: [
          'Happy anniversary to the woman who makes forever feel too short.',
          'Every love story is beautiful, but ours is my favourite. Happy anniversary, my love.',
          'You are the best decision I ever made and the best part of every day. Happy anniversary.',
          'Thank you for building a home out of my chaos. Happy anniversary, wife.',
          'I fall for you a little more every year. Happy anniversary, beautiful.',
          'With you, ordinary Tuesdays feel like anniversaries. Imagine how today feels!',
        ],
      },
      {
        name: 'Emotional Wishes',
        wishes: [
          'You held my hand through every storm and never once let go. Happy anniversary.',
          'Everything I am proud of in my life has you in the story. Happy anniversary.',
          'The kids, the home, the calm - none of it exists without you. Happy anniversary, my love.',
          'You loved me at my worst and deserved me at my best. Happy anniversary.',
        ],
      },
      {
        name: 'Playful Wishes',
        wishes: [
          'Happy anniversary! You are still my favourite notification.',
          'Thanks for saying yes when I had nothing but confidence. Happy anniversary!',
          'We argue over the AC temperature and still choose each other daily. Happy anniversary!',
          'Happy anniversary to my wife, my chef, my stylist, and my boss. 😄',
        ],
      },
    ],
  },
  {
    slug: 'good-morning-messages-with-love',
    title: 'Good Morning Messages with Love',
    metaTitle: '50+ Good Morning Messages with Love (For Him & Her)',
    metaDescription: 'Sweet and romantic good morning messages for the one you love. Copy your favourite and send it as a beautiful digital surprise.',
    heading: 'Good Morning Messages with Love ☀️',
    intro: 'The first message of the day sets the tone. Pick one of these and make someone\'s morning before they even get out of bed.',
    sections: [
      {
        name: 'For Him',
        wishes: [
          'Good morning to the man who makes every day feel like a good day.',
          'I hope your coffee is strong and your day is easy. Good morning, love.',
          'Waking up is easier knowing I get to love you today. Good morning.',
          'You are my first thought, always. Good morning, handsome.',
          'May today bring you closer to everything you are working for. Good morning!',
        ],
      },
      {
        name: 'For Her',
        wishes: [
          'Good morning, beautiful. The sun just got competition.',
          'Every morning is a reminder that you chose me. Good morning, love.',
          'I hope your day is as lovely as you looked when you fell asleep. Good morning.',
          'Rise and shine, my favourite person in the world.',
          'Good morning! Sending you a hug strong enough to last till tonight.',
        ],
      },
      {
        name: 'Sweet & Simple',
        wishes: [
          'Good morning! May your day be light and your coffee strong.',
          'New day, new blessings. Good morning!',
          'Morning! Do not forget how loved you are.',
          'A beautiful morning to a beautiful soul. ☀️',
          'Good morning! Today is yours - go get it.',
        ],
      },
    ],
  },
  {
    slug: 'anniversary-wishes-for-parents',
    title: 'Anniversary Wishes for Parents',
    metaTitle: '30+ Anniversary Wishes for Parents (Touching & Warm)',
    metaDescription: 'Heartfelt anniversary wishes for mom and dad. Celebrate their love with a message they will keep, delivered as a digital surprise gift.',
    heading: 'Anniversary Wishes for Parents 💐',
    intro: 'Their love wrote the first chapter of your story. Celebrate their anniversary with words that tell them what their marriage taught you.',
    sections: [
      {
        name: 'Heartfelt Wishes',
        wishes: [
          'Happy anniversary to the two people who taught me what love looks like in real life.',
          'Your marriage is my favourite proof that forever is real. Happy anniversary, Mom and Dad.',
          'Thank you for showing us that love is a daily choice. Happy anniversary!',
          'Every value I have, I learned by watching you two. Happy anniversary!',
          'May the love that raised me keep growing every year. Happy anniversary, Mom and Dad.',
        ],
      },
      {
        name: 'Warm & Simple Wishes',
        wishes: [
          'Happy anniversary to our home\'s original lovebirds!',
          'Still holding hands after all these years. Happy anniversary!',
          'Here is to the couple who made family mean something. Happy anniversary.',
          'Wishing you health, laughter, and many more anniversaries together.',
          'Two hearts, one home, endless love. Happy anniversary!',
        ],
      },
      {
        name: 'From the Whole Family',
        wishes: [
          'From all of us: happy anniversary to the reason all of us exist!',
          'Your love story gave us our family. Happy anniversary, Mom and Dad.',
          'Cheers to the couple whose anniversary is basically a family holiday. Love you!',
          'Happy anniversary! Thank you for the love that started everything.',
        ],
      },
    ],
  },
  {
    slug: 'birthday-wishes-in-hindi',
    title: 'Birthday Wishes in Hindi (बर्थडे विशेज)',
    metaTitle: '60+ Birthday Wishes in Hindi - जन्मदिन की शुभकामनाएं',
    metaDescription: 'दिल को छू लेने वाले जन्मदिन की शुभकामनाएं हिंदी में। अपनी पसंदीदा विश चुनें और उसे एक डिजिटल सरप्राइज गिफ्ट बनाकर भेजें।',
    heading: 'जन्मदिन की शुभकामनाएं हिंदी में 🎂',
    intro: 'अपनों के लिए हिंदी में दिल से निकली शुभकामनाएं चुनें और उन्हें एक यादगार डिजिटल सरप्राइज में बदलें।',
    sections: [
      {
        name: 'दिलचस्प शुभकामनाएं',
        wishes: [
          'जन्मदिन मुबारक हो! भगवान करे आपकी हर मुराद पूरी हो। 🎂',
          'आप जैसे लोग इस दुनिया की रौनक हैं। जन्मदिन की हार्दिक शुभकामनाएं!',
          'यह साल आपके लिए खुशियों और सफलता का साल हो। जन्मदिन मुबारक!',
          'आपकी मुस्कान हमेशा ऐसी ही रहे। जन्मदिन की ढेर सारी शुभकामनाएं!',
          'भगवान आपको लंबी उम्र और खुशियों से भरपूर जीवन दे। जन्मदिन मुबारक हो!',
          'आपके जन्मदिन पर यही दुआ है कि आपके सपने हकीकत बनें। शुभकामनाएं!',
        ],
      },
      {
        name: 'दोस्त के लिए',
        wishes: [
          'जन्मदिन मुबारक हो यार! चाय तेरी तरफ से, केक मेरी तरफ से। 😄',
          'दोस्ती में no sorry no thank you, लेकिन जन्मदिन पर party ज़रूरी है! Happy birthday!',
          'तू बूढ़ा हो रहा है दोस्त, पर दिल अब भी बच्चा है। जन्मदिन मुबारक!',
          'भगवान करे तेरी हर friendship request accept हो। Happy birthday, dost!',
          'जन्मदिन मुबारक! आज तेरा बर्थडे है, कल से फिर वही ड्रामा शुरू।',
        ],
      },
      {
        name: 'परिवार के लिए',
        wishes: [
          'भैया, जन्मदिन की हार्दिक शुभकामनाएं! आप हमेशा खुश रहें।',
          'बहना, तुम्हारा जन्मदिन पूरे परिवार का त्योहार है। जन्मदिन मुबारक!',
          'माँ-पापा की लाडली को जन्मदिन की ढेर सारी शुभकामनाएं!',
          'आपके जन्मदिन पर पूरा परिवार आपकी लंबी उम्र के लिए प्रार्थना करता है। जन्मदिन मुबारक हो!',
        ],
      },
    ],
  },
  {
    slug: 'wedding-anniversary-wishes',
    title: 'Wedding Anniversary Wishes for Couples',
    metaTitle: '40+ Wedding Anniversary Wishes for Couples (Sweet & Classy)',
    metaDescription: 'Beautiful wedding anniversary wishes for couples - for friends, family or your own partner. Copy one and send it as a digital surprise.',
    heading: 'Wedding Anniversary Wishes for Couples 💐',
    intro: 'Whether it is for your own partner or a couple you love, these wishes celebrate the choice two people keep making every day.',
    sections: [
      {
        name: 'For a Couple',
        wishes: [
          'Happy anniversary to a couple who makes marriage look easy and love look effortless.',
          'Wishing you another year of inside jokes, shared dreams, and quiet evenings. Happy anniversary!',
          'You two are the standard. Happy anniversary!',
          'May your love keep growing in the quiet, everyday ways that matter most. Happy anniversary!',
          'Here is to the couple everyone secretly wants to be. Happy anniversary!',
          'Years pass, but true couples like you only get stronger. Happy anniversary!',
        ],
      },
      {
        name: 'For Milestone Anniversaries',
        wishes: [
          'Happy 1st anniversary! The paper year, and you two already wrote a classic.',
          'Happy silver jubilee! 25 years of love, laughter and teamwork. Amazing!',
          '50 years together - that is not luck, that is love with commitment. Happy golden anniversary!',
          'Happy 10th anniversary! A decade of choosing each other every single day.',
        ],
      },
      {
        name: 'Short & Sweet',
        wishes: [
          'Happy anniversary, lovebirds! 💛',
          'To forever and beyond. Happy anniversary!',
          'Cheers to love that lasts. Happy anniversary!',
          'Still the best couple we know. Happy anniversary!',
          'Love wins again. Happy anniversary!',
        ],
      },
    ],
  },
  {
    slug: 'good-night-messages-for-loved-ones',
    title: 'Good Night Messages for Loved Ones',
    metaTitle: '40+ Good Night Messages for Loved Ones (Sweet & Romantic)',
    metaDescription: 'Sweet good night messages for your partner, family and friends. End their day with warmth - copy one and send it as a digital surprise.',
    heading: 'Good Night Messages for Loved Ones 🌙',
    intro: 'The last message of the day lingers the longest. Choose one below and make someone smile before they drift off.',
    sections: [
      {
        name: 'Romantic Messages',
        wishes: [
          'Good night, my love. Meet you in my dreams before I fall asleep.',
          'The stars are out, but you are still the brightest thing in my night. Sleep well.',
          'May your dreams be as sweet as the thought of you. Good night.',
          'Ending my day grateful for you, as always. Good night, love.',
          'Sleep well, my favourite person. Tomorrow we love even more.',
        ],
      },
      {
        name: 'For Family & Friends',
        wishes: [
          'Good night! May tomorrow be kinder than today.',
          'Sleep well and recharge - big things are waiting for you tomorrow.',
          'Sending you a pillow of peace and a blanket of calm. Good night!',
          'End the day with a grateful heart. Good night, dear friend.',
          'Good night! Let today go and let rest in.',
        ],
      },
      {
        name: 'Short & Sweet',
        wishes: [
          'Good night! Dream big. 🌙',
          'Sleep tight, don\'t let the worries bite.',
          'Rest well. Tomorrow needs you.',
          'Good night, sleep deep, wake happy.',
          'The moon says hello. Good night!',
        ],
      },
    ],
  },
];
