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
  answers: [
    { answer: `Leads the team`, points: { ruler: 2, hero: 1 } },
    { answer: `Helps others with their tasks`, points: { caregiver: 2, lover: 1 } },
    { answer: `Comes up with the most innovative ideas`, points: { creator: 2, magician: 1 } },
    { answer: `Helps the team stay united`, points: { member: 2, sage: 1 } },
    { answer: `Does what the team tells you to do`, points: { outlaw: 2, innocent: 1 } },
    { answer: `Jokes around all the time`, points: { jester: 2, explorer: 1 } },
  ],
}, {
  question: `2. What do you believe is the greatest thing you could achieve in this lifetime?`,
  answers: [
    { answer: `To be respected and revered by the world`, points: { outlaw: 2, ruler: 1 } },
    { answer: `To travel around the world`, points: { explorer: 2, creator: 1 } },
    { answer: `To be loved by the people around me`, points: { hero: 2, lover: 1 } },
    { answer: `To be a beacon of joy and happiness`, points: { member: 2, jester: 1 } },
    { answer: `To acquire infinite knowledge and wisdom`, points: { magician: 2, sage: 1 } },
    { answer: `To be content with whatever I have`, points: { innocent: 2, caregiver: 1 } },
  ],
}, {
  question: `3. Let's talk about something fun! When you read a book or watch a film, you want it to be:`,
  answers: [
    { answer: `Original and creative`, points: { creator: 2, magician: 1 } },
    { answer: `Funny and lighthearted`, points: { jester: 2, explorer: 1 } },
    { answer: `Action-packed and exciting`, points: { ruler: 2, hero: 1 } },
    { answer: `Romantic and alluring`, points: { caregiver: 2, lover: 1 } },
    { answer: `Inspiring and profound`, points: { sage: 2, member: 1 } },
    { answer: `Free-spirited and simple`, points: { outlaw: 1, innocent: 2 } },
  ],
}, {
  question: `4. How do you think your friends would describe you?`,
  answers: [
    { answer: `Thoughtful and caring`, points: { lover: 2, caregiver: 1 } },
    { answer: `Imaginative and resourceful`, points: { magician: 2, creator: 1 } },
    { answer: `Bold and unpredictable`, points: { outlaw: 2, ruler: 1 } },
    { answer: `Restless and easily bored`, points: { jester: 2, explorer: 1 } },
    { answer: `Wise and easy to talk to`, points: { sage: 2, member: 1 } },
    { answer: `Stubborn and strong-willed`, points: { hero: 2, innocent: 1 } },
  ],
}, {
  question: `5. Now, if you wanted to change the world, you would focus on:`,
  answers: [
    { answer: `Improving existing policies and regulations`, points: { ruler: 2, sage: 1 } },
    { answer: `Creating solutions to solve the world's problems`, points: { creator: 2, magician: 1 } },
    { answer: `Reaching out to the needy and vulnerable`, points: { caregiver: 2, hero: 1 } },
    { answer: `Revolting against governmental control`, points: { explorer: 2, outlaw: 1 } },
    { answer: `Bringing laughter and happiness to those around me`, points: { innocent: 2, jester: 1 } },
    { answer: `Praying and advocating for universal peace`, points: { member: 2, lover: 1 } },
  ],
}, {
  question: `6. Which of the following gives you the greatest sense of fulfillment?`,
  answers: [
    { answer: `Travelling and visiting as many countries as I can`, points: { jester: 2, explorer: 1 } },
    { answer: `Mastering a new skill or acquiring new knowledge`, points: { magician: 2, creator: 1 } },
    { answer: `Having children and seeing them grow up`, points: { lover: 2, innocent: 1 } },
    { answer: `Being recognized for my achievements`, points: { hero: 2, member: 1 } },
    { answer: `Volunteering for charitable causes`, points: { sage: 2, caregiver: 1 } },
    { answer: `Challenging societal expectations and conventions`, points: { outlaw: 2, ruler: 1 } },
  ],
}, {
  question: `7. Let's talk about your weaknesses, which of the following options resembles your greatest weakness?`,
  answers: [
    { answer: `I'm too much of a perfectionist`, points: { creator: 2, sage: 1 } },
    { answer: `I tend to manipulate others`, points: { ruler: 2, magician: 1 } },
    { answer: `I try too hard to please others`, points: { caregiver: 2, hero: 1 } },
    { answer: `I place my trust in others too easily`, points: { innocent: 2, lover: 1 } },
    { answer: `I find it difficult to take things seriously`, points: { explorer: 2, jester: 1 } },
    { answer: `I can be a little bit too impulsive`, points: { member: 2, outlaw: 1 } },
  ],
}, {
  question: `8. This might be a little bit uncomfortable. Out of all of the options, which are you the most afraid of?`,
  answers: [
    { answer: `Rejection`, points: { jester: 2, caregiver: 1 } },
    { answer: `Being used`, points: { lover: 2, innocent: 1 } },
    { answer: `Losing control`, points: { magician: 2, ruler: 1 } },
    { answer: `Failure`, points: { hero: 2, creator: 1 } },
    { answer: `Commitment`, points: { outlaw: 2, explorer: 1 } },
    { answer: `Change`, points: { sage: 2, member: 1 } },
  ],
}, {
  question: `9. That's an intriguing fear to have. What about your relationships? What matters to you the most when you're in a relationship?`,
  answers: [
    { answer: `Being intimate with each other`, points: { caregiver: 2, lover: 1 } },
    { answer: `Retaining my freedom`, points: { explorer: 2, outlaw: 1 } },
    { answer: `Trusting each other`, points: { innocent: 2, magician: 1 } },
    { answer: `Growing with each other`, points: { creator: 2, sage: 1 } },
    { answer: `Understanding each other`, points: { hero: 2, jester: 1 } },
    { answer: `Being committed to each other`, points: { member: 2, ruler: 1 } },
  ],
}, {
  question: `10. Final question! Select the quote that most accurately resembles your outlook on life:`,
  answers: [
    { answer: `Do unto others what you want others to do unto you`, points: { sage: 2, caregiver: 1 } },
    { answer: `When nothing is sure, everything is possible`, points: { magician: 2, explorer: 1 } },
    { answer: `All for one, and one for all`, points: { ruler: 2, member: 1 } },
    { answer: `Stand up for what you believe in, even if it means standing alone`, points: { outlaw: 2, hero: 1 } },
    { answer: `Some days you just have to create your own sunshine`, points: { jester: 2, creator: 1 } },
    { answer: `Don't stress the could haves. If it should have, it would have`, points: { lover: 2, innocent: 1 } },
  ],
}, ];
