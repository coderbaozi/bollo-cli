#! /usr/bin/env node
import {program} from 'commander'
import inquirer from 'inquirer'
import { create } from '../lib/create.js'
import chalk from 'chalk'
import figlet from 'figlet'

program
  .command('create <project-name>')
  .description('create a new project')
  .option('-f, --force','overwrite target it is existed')
  .action((name,options) => {
    create(name,options)
  })

program
  .on('--help',()=>{
    console.log('\r\n' + figlet.textSync('bollo', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }))
    console.log(`\r\nRun ${chalk.cyan(`bollo <command> --help`)} for detail usage of given command\r\n`);
  })

program
  .version(`1.0.3`,'-v, --version')
  .parse(process.argv)
