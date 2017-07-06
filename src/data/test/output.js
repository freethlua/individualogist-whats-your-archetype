
const output = require('./output.json');

for(const [archetype, {length}] of Object.entries(output)) {
  console.log(archetype.padEnd(10), length);
}
