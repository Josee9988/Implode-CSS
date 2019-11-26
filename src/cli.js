import arg from 'arg';
import inquirer from 'inquirer';
import showOptions from './main';
var mainFile = require('./main.js');

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        '--audit': Boolean,
        '--fix': Boolean,
        '--yes': Boolean,
        '-a': '--audit',
        '-f': '--fix',
        '-y': '--yes',
    })
    return {
        defaultOptions: args['--yes'] || false,
        audit: args['--audit'] || false,
        fix: args['--fix'] || false,
        folderToImplode: args._[0],
    }
}

async function promptForMissingOptions(options) {
    const actualDirectory = process.cwd();
    const questions = [];

    if (options.defaultOptions) {
        return {
            ...options,
            folderToImplode: actualDirectory,
        }
    }

    // If the user didn't specify a directory 
    if (!options.folderToImplode) {
        inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))
        questions.push({
            type: 'fuzzypath',
            name: 'folderToImplode',
            message: 'Please give us the location of the folder to make the CSS implode',
            excludePath: nodePath => nodePath.startsWith('.git'),
            itemType: 'directory',
            suggestOnly: false,
            depthLimit: 5,
            default: actualDirectory,
        });
    }


    // If the user didn't specify if auditing or fixing
    if (!options.fix && !options.audit) {
        questions.push({
            type: 'list',
            name: 'action',
            message: 'Please mark what option you want to perform',
            choices: ['audit', 'fix'],
            default: 'audit'
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        folderToImplode: options.folderToImplode || answers.folderToImplode,
        fix: answers.action === 'fix' ? true : false,
        audit: answers.action === 'audit' ? true : false,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await showOptions(options);
    await mainFile.auditCode(options.folderToImplode);
}
