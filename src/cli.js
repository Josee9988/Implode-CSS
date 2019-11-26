import arg from 'arg';
import inquirer from 'inquirer';
var mainFile = require('./main');
var informationCLI = require('./informationCLI');

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        '--audit': Boolean,
        '--fix': Boolean,
        '--yes': Boolean,
        '--help': Boolean,
        '--version': Boolean,
        '-a': '--audit',
        '-f': '--fix',
        '-y': '--yes',
        '-h': '--help',
        '-v': '--version'
    })
    return {
        defaultOptions: args['--yes'] || false,
        audit: args['--audit'] || false,
        fix: args['--fix'] || false,
        help: args['--help'] || false,
        version: args['--version'] || false,
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
            audit: true
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
    if (!options.help && !options.version) {
        options = await promptForMissingOptions(options);
        informationCLI.showOptions(options);
        options.audit ? await mainFile.auditCode(options.folderToImplode) :
            await mainFile.fixCode(options.folderToImplode);
    } else if (options.help) { // if the user specified help
        informationCLI.showHelp();
    } else if (options.version) { // if the user specified version
        informationCLI.showVersion();
    }
}
