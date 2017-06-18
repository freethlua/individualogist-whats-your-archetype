import { Component, render } from 'preact';
import hs from 'preact-hyperstyler';
import styles from './style.styl';
const h = hs(styles);

export default class Quiz extends Component {

  componentWillMount() {
    const archetypes = {
      ruler: { title: 'The Ruler' },
      hero: { title: 'The Hero' },
      member: { title: 'The Member' },
      caregiver: { title: 'The Caregiver' },
      creator: { title: 'The Creator' },
      magician: { title: 'The Magician' },
      lover: { title: 'The Lover' },
      innocent: { title: 'The Innocent' },
      jester: { title: 'The Jester' },
      explorer: { title: 'The Explorer' },
      sage: { title: 'The Sage' },
      outlaw: { title: 'The Outlaw' },
    };

    const questions = [{
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
      question: `Let's get cracking! When it comes to teamwork, you are the one who:`,
      answers: [
        { answer: `Leads the team`, points: { ruler: 2, hero: 1 } },
        { answer: `Helps others with their tasks`, points: { caregiver: 2, lover: 1 } },
        { answer: `Comes up with the most innovative ideas`, points: { creator: 2, magician: 1 } },
        { answer: `Helps the team stay united`, points: { member: 2, sage: 1 } },
        { answer: `Does what the team tells you to do`, points: { outlaw: 2, innocent: 1 } },
        { answer: `Jokes around all the time`, points: { jester: 1, explorer: 1 } },
      ],
    }, {
      question: `What about your ambitions? Which of the following seems like a job you could do?`,
      answers: [
        { answer: `Inventor`, points: { magician: 2, creator: 1 } },
        { answer: `Counsellor`, points: { innocent: 2, caregiver: 1 } },
        { answer: `Police Officer`, points: { hero: 2, ruler: 1 } },
        { answer: `Veterinarian`, points: { outlaw: 2, innocent: 1 } },
        { answer: `Lecturer`, points: { sage: 2, member: 1 } },
        { answer: `Copywriter`, points: { explorer: 2, jester: 1 } },
      ],
    }, {
      question: `Let's talk about something fun! When you read a book or watch a film, you want it to be:`,
      answers: [
        { answer: `Original and creative`, points: { creator: 2, magician: 1 } },
        { answer: `Funny and lighthearted`, points: { jester: 2, explorer: 1 } },
        { answer: `Action-packed and exciting`, points: { ruler: 2, hero: 1 } },
        { answer: `Romantic and alluring`, points: { caregiver: 2, lover: 1 } },
        { answer: `Inspiring and profound`, points: { member: 2, sage: 1 } },
        { answer: `Free-spirited and simple`, points: { outlaw: 2, innocent: 1 } },
      ],
    }, {
      question: `How do you think your friends would describe you?`,
      answers: [
        { answer: `Thoughtful and caring`, points: { lover: 2, caregiver: 1 } },
        { answer: `Imaginative and resourceful`, points: { magician: 2, creator: 1 } },
        { answer: `Bold and unpredictable`, points: { hero: 2, ruler: 1 } },
        { answer: `Restless and easily bored`, points: { jester: 2, explorer: 1 } },
        { answer: `Wise and easy to talk to`, points: { sage: 2, member: 1 } },
        { answer: `Stubborn and strong-willed`, points: { outlaw: 2, innocent: 1 } },
        { answer: `Original and creative`, points: { creator: 2, magician: 1 } },
      ],
    }, {
      question: `We're almost done! If you were on vacation, you would most likely be:`,
      answers: [
        { answer: `Relaxing by the beach and sipping martinis`, points: { jester: 2, innocent: 1 } },
        { answer: `Skydiving for the first time`, points: { explorer: 2, sage: 1 } },
        { answer: `Checking out the city's museums and architecture`, points: { magician: 2, sage: 1 } },
        { answer: `Talking to strangers and experiencing the place's culture firsthand`, points: { member: 2, creator: 1 } },
        { answer: `Making sure your travelling companions are safe and having fun`, points: { caregiver: 2, lover: 1 } },
        { answer: `Wishing that you were back home already`, points: { outlaw: 2, ruler: 1 } },
      ],
    }, {
      question: `Last one! You prefer to spend time with...`,
      answers: [
        { answer: `Your significant other`, points: { lover: 2, caregiver: 1 } },
        { answer: `New people you've just met`, points: { explorer: 2, member: 1 } },
        { answer: `Your friends`, points: { innocent: 2, creator: 1 } },
        { answer: `Your family`, points: { hero: 2, ruler: 1 } },
        { answer: `Yourself`, points: { hero: 2, ruler: 1 } },
        { answer: `Your colleagues`, points: { jester: 2, sage: 1 } },
      ],
    }];

    this.setState({ archetypes, questions });
  }

  render() {
    let cqi;
    for (cqi = 0; cqi < this.state.questions.length; cqi++) {
      if (!this.state.questions[cqi].answer) {
        break;
      }
    }
    return h.form({}, [h.ol({}, this.state.questions.map((q, qi) =>
      h.li({ class: { visible: cqi === qi } }, [
        h.label('.question', { for: `q[${qi}]` }, [q.question]),
        h.div('.answers', {}, q.answers.map((a, ai) => h.label({ for: `q[${qi}][${ai}]` }, [h.input({
          type: 'radio',
          id: `q[${qi}][${ai}]`,
          name: `q[${qi}]`,
          // value: Object.keys(a.points).map(t => `${t}=${a.points[t]}`).join(';'),
          onclick: e => {
            this.state.questions[qi].answer = a;
            this.setState({ qi, ai, questions: this.state.questions });
            if (qi >= this.state.questions.length) {
              for (const question of this.state.questions) {
                for (const archetype in question.answer.points) {
                  const points = question.answer.points[archetype];
                  this.state.archetypes.points = (this.state.archetypes.points || 0) + points;
                }
              }
              const sortedArchetypes = Object.keys(this.state.archetypes).sort((a, b) =>
                this.state.archetypes[a] > this.state.archetypes[b]
                ? 1
                : this.state.archetypes[a] < this.state.archetypes[b]
                ? -1
                : 0
              );
              this.setState({ sortedArchetypes, archetype: this.state.archetypes[sortedArchetypes[0]] });
              this.props.onFinish(this.state);
            }
          }
        }), a.answer])))
      ])))]);
  }
}
