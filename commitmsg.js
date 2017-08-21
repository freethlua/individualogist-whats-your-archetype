#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

const file = process.env.GIT_PARAMS;
let message = fs.readFileSync(file, 'utf8');

const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).split(/[\n\r]+/)[0];
if (!['master'].includes(branch) && !message.includes(branch)) {
  const prefix = `[${branch}]`;
  console.log(`Adding '${prefix}' to commit message...`);
  message = prefix + ' ' + message;
}

fs.writeFileSync(file, message, 'utf8');
fs.writeFileSync(__dirname + '/last-commitmsg.txt', message, 'utf8');
