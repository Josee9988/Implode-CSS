import inquirer from 'inquirer';


export async function promptForMissingOptions(options) {
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

    //inquirer.prompt(questions);
    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        folderToImplode: options.folderToImplode || answers.folderToImplode,
        fix: options.fix ? true : answers.action === 'fix' ? true : false,
        audit: options.audit ? true : answers.action === 'audit' ? true : false,
    };
}

export default promptForMissingOptions;
