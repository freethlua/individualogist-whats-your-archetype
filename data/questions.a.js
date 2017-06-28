module.exports = [{
  question: `Let's start things off with an easy one. What's your gender?`,
  answers: [
    { answer: `I'm a man` },
    { answer: `I'm a woman` },
  ],
}, {
  question: `Wonderful! I'd like to find out a little bit more about your background. What's your marital status?`,
  answers: [
    { answer: `I'm single` },
    { answer: `I'm married/in a committed relationship` },
    { answer: `I'm divorced/separated` },
    { answer: `I'm widowed` },
  ],
}, {
  question: `1. Let's get cracking! When it comes to teamwork, you are the one who:`,
  answers: [{
    answer: `Leads the team`,
    points: {
      ruler: 5,
      hero: 3,
      caregiver: 2,
    }
  }, {
    answer: `Helps others with their tasks`,
    points: {
      caregiver: 3,
      member: 2,
      lover: 1,
      innocent: 1,
    }
  }, {
    answer: `Comes up with the most innovative ideas`,
    points: {
      creator: 5,
      sage: 3,
      magician: 2,
    }
  }, {
    answer: `Helps the team stay united`,
    points: {
      ruler: 5,
      hero: 3,
      member: 2,
      lover: 1,
      innocent: 1,
    }
  }, {
    answer: `Does what the team tells you to do`,
    points: {
      member: 4,
      outlaw: -2,
      innocent: 2,
    }
  }, {
    answer: `Jokes around all the time`,
    points: {
      jester: 5,
      caregiver: 1,
      hero: 1,
      lover: 1,
      outlaw: 1,
      explorer: 1,
      innocent: 1,
      sage: -2,
    }
  }, ],
}, {
  question: `2. What about your ambitions? Which of the following seems like a job you could do?`,
  answers: [{
    answer: `Inventor`,
    points: {
      creator: 4,
      magician: 2,
      jester: -1,
    }
  }, {
    answer: `Counsellor`,
    points: {
      caregiver: 4,
      hero: 2,
      sage: 2,
      innocent: 1,
      lover: 1,
      jester: -1,
    }
  }, {
    answer: `Police Officer`,
    points: {
      hero: 4,
      innocent: 4,
      jester: -1,
    }
  }, {
    answer: `Veterinarian`,
    points: {
      caregiver: 4,
      outlaw: 2,
      innocent: 1,
      lover: 1,
      jester: -1,
    }
  }, {
    answer: `Lecturer`,
    points: {
      sage: 5,
      hero: 2,
      creator: 1,
      innocent: 1,
      member: 1,
      jester: -1,
    }
  }, {
    answer: `Copywriter`,
    points: {
      explorer: 2,
      jester: 1,
    }
  }, ],
}, {
  question: `3. Let's talk about something fun! When you read a book or watch a film, you want it to be:`,
  answers: [{
    answer: `Original and creative`,
    points: {
      creator: 5,
      magician: 2,
    }
  }, {
    answer: `Funny and lighthearted`,
    points: {
      jester: 5,
    }
  }, {
    answer: `Action-packed and exciting`,
    points: {
      innocent: 3,
    }
  }, {
    answer: `Romantic and alluring`,
    points: {
      lover: 3,
      innocent: 2,
    }
  }, {
    answer: `Inspiring and profound`,
    points: {
      sage: 3,
      creator: 3,
      innocent: 2,
    }
  }, {
    answer: `Free-spirited and simple`,
    points: {
      outlaw: 2,
      explorer: 2,
      innocent: 1,
    }
  }, ],
}, {
  question: `4. How do you think your friends would describe you?`,
  answers: [{
    answer: `Thoughtful and caring`,
    points: {
      caregiver: 4,
      hero: 2,
      lover: 2,
    }
  }, {
    answer: `Imaginative and resourceful`,
    points: {
      creator: 3,
      magician: 2,
    }
  }, {
    answer: `Bold and unpredictable`,
    points: {
      outlaw: 4,
      hero: 2,
      ruler: 1,
    }
  }, {
    answer: `Restless and easily bored`,
    points: {
      jester: 2,
      explorer: 1,
    }
  }, {
    answer: `Wise and easy to talk to`,
    points: {
      sage: 4,
      member: 1,
    }
  }, {
    answer: `Stubborn and strong-willed`,
    points: {
      outlaw: 4,
      ruler: 3,
    }
  }, {
    answer: `Original and creative`,
    points: {
      creator: 5,
      magician: 2,
    }
  }, ],
}, {
  question: `5. We're almost done! If you were on vacation, you would most likely be:`,
  answers: [{
    answer: `Relaxing by the beach and sipping martinis`,
    points: {
      jester: 2,
      innocent: 1,
    }
  }, {
    answer: `Skydiving for the first time`,
    points: {
      outlaw: 2,
      explorer: 2,
    }
  }, {
    answer: `Checking out the city's museums and architecture`,
    points: {
      explorer: 2,
    }
  }, {
    answer: `Talking to strangers and experiencing the place's culture firsthand`,
    points: {
      member: 2,
    }
  }, {
    answer: `Making sure your travelling companions are safe and having fun`,
    points: {
      caregiver: 2,
      lover: 1,
    }
  }, {
    answer: `Wishing that you were back home already`,
    points: {
      member: 3,
      innocent: 2,
      caregiver: 2,
    }
  }, ],
}, {
  question: `6. Last one! You prefer to spend time with...`,
  answers: [{
    answer: `Your significant other`,
    points: {
      lover: 3,
      caregiver: 2,
      innocent: 1,
    }
  }, {
    answer: `New people you've just met`,
    points: {
      explorer: 3,
      member: 1,
    }
  }, {
    answer: `Your friends`,
    points: {
      innocent: 2,
      member: 1,
    }
  }, {
    answer: `Your family`,
    points: {
      member: 3,
      innocent: 2,
      hero: 1,
    }
  }, {
    answer: `Yourself`,
    points: {
      explorer: 3,
      hero: 2,
    }
  }, {
    answer: `Your colleagues`,
    points: {
      member: 3,
      innocent: 2,
    }
  }, ],
}];
