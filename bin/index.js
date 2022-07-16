#!/usr/bin/env node

const app = require('../lib');

const command = process.argv?.[2] ?? 'build';

const valid = ['build', 'serve'];

if (!valid.includes(command)) {
  console.log('Valid commands are: ', valid.join(', '))
  return;
}

app[command]();