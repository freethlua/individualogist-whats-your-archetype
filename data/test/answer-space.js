const questions = require('../questions');
const archetypes = require('../archetypes');
const calculate = require('../utils/calculate');

console.log('Creating question space');
let questionSpace = {};
for (let q = 0; q < questions.length; q++) {
  const qq = `q${q+1}`;
  // const qq = q;
  const question = questions[q];
  questionSpace[qq] = {}
  for (let a = 0; a < question.answers.length; a++) {
    const aa = a;
    // const aa = qq + `a${a+1}`;
    // const aa = q + '' + a;
    questionSpace[qq][aa] = {}
    if (q > 0) {
      const p = q - 1;
      const pp = `q${p+1}`;
      // const pp = p;
      for (const k in questionSpace[pp]) {
        questionSpace[pp][k] = questionSpace[qq]
      }
    }
  }
}
questionSpace = questionSpace['q1']
// questionSpace = questionSpace[0]
// questionSpace = last;
// console.log(JSON.stringify(questionSpace, null, 2));

let allLevels = [];

function rec(space, ...levels) {
  for (const level in space) {
    if (Object.keys(space[level]).length) {
      rec(space[level], level, ...levels);
    } else {
      // console.log(...levels);
      allLevels.push([level, ...levels].reverse());
    }
  }
}

console.log('Generating answers');
rec(questionSpace);

// console.log(JSON.stringify(allLevels, null, 2));

console.log('Calculating answers');
const levelAnswers = {};
for (const level of allLevels) {
  const answerableQuestions = JSON.parse(JSON.stringify(questions));
  for (let i = 0; i < level.length; i++) {
    const answerableQuestion = answerableQuestions[i];
    answerableQuestion.answer = answerableQuestion.answers[parseInt(level[i], 10)];
  }
  // console.log(answerableQuestions);
  const calculated = calculate(answerableQuestions, archetypes);
  const levelLabel = level.join('');
  levelAnswers[levelLabel] = calculated;
  // console.log(levelLabel, calculated.archetype);
}

console.log('Calculating same answers');
const sameArchetypes = {};
for (const k in levelAnswers) {
  const levelAnswer = levelAnswers[k];
  sameArchetypes[levelAnswer.archetype] = sameArchetypes[levelAnswer.archetype] || [];
  sameArchetypes[levelAnswer.archetype].push(k);
}

// console.log(sameArchetypes);


const output = sameArchetypes;
let sortedSameArchetypes = []
for (const [archetype, { length }] of Object.entries(output)) {
  sortedSameArchetypes.push({ archetype, length })
}
sortedSameArchetypes = sortedSameArchetypes.sort((a, b) => b.length - a.length)

sortedSameArchetypes.forEach(a => console.log(a.archetype.padEnd(10), a.length));

require('fs').writeFileSync(__dirname + '/output.json',
  JSON.stringify(sortedSameArchetypes, null, 2) + '\n'
  + JSON.stringify(sameArchetypes, null, 2)
);
