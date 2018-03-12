#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const program = require('commander');

const { version } = require('../package.json');
const scripts = require('../scripts');

console.log('running program...');

program
  .version(version)
  .usage(`${chalk.green('<command>')} [options]`);

program
  .command('start')
  .description('Run the demos in a dev server')
  .option('-d, --debug', 'Receive debugging info')
  .action((options) => {
    console.log('starting', options);
    scripts.start(options);
  });

program
  .parse(process.argv);
