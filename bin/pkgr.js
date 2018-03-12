#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const program = require('commander');

const { version } = require('../package.json');
const scripts = require('../scripts');

program
  .version(version)
  .usage(`${chalk.green('<command>')} [options]`);

program
  .command('start')
  .description('Run the demos in a dev server')
  .option('-p, --port <number>', 'Port to use', parseInt)
  .option('-d, --debug', 'Receive debugging info')
  .action(scripts.start);

program
  .parse(process.argv);
