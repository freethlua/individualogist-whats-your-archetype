module.exports = function calculate(questions, archetypes) {
  // questions = JSON.parse(JSON.stringify(questions))
  // archetypes = JSON.parse(JSON.stringify(archetypes))
  for (const question of questions) {
    if (question.answer.points) {
      for (const archetype in question.answer.points) {
        const points = question.answer.points[archetype];
        archetypes[archetype].points = (archetypes[archetype].points || 0) + points;
      }
    }
  }
  const sorted = Object.keys(archetypes).sort((a, b) => (archetypes[b].points || 0) - (archetypes[a].points || 0));
  return {
    sorted,
    archetypes,
    archetype: sorted[0],
  }
}
