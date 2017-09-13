#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const filename = 'last-commitmsg.txt';

try {
  execSync(`git diff-index --quiet HEAD`);
} catch (error) {
  console.error('Error: You have unstaged changes. Please commit them before pushing.');
  process.exit(1);
}

const lastCommitMessage = execSync(
    'git log -5 --pretty=%B', {
      encoding: 'utf8'
    })
  .trim()
  .split(/[\n\r]+/g)
  .map(_ => _.trim())
  .slice(0, 3)
  .join(', ')

fs.writeFileSync(filename, lastCommitMessage);

execSync(`git add ${filename}`);
execSync(`git commit --amend --no-edit`);
