import arg from 'arg';
import inquirer from 'inquirer';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        '--audit': Boolean,
        '--fix': Boolean,
        '--debug': Boolean,
        '-a': '--audit',
        '-f': '--fix',
        '-d': '--debug'
    })
    return {
        audit: args['--audit'] || false,
        fix: args['--fix'] || false,
        debug: args['--debug'] || false,
        folderToImplode: args._[0],
    }
}

async function promptForMissingOptions(options) {
    const actualDirectory = process.cwd();
    const questions = [];

    // If the user didn't specify a directory 
    if (!options.folderToImplode) {
        questions.push({
            type: 'String',
            name: 'folderToImplode',
            message: 'Please give us the location of the folder to make the CSS implode',
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
    console.log(options);
}
