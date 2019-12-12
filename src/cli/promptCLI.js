/**
 * @file promptCLI is a file that contains functions for
 * prompting the user questions about the arguments needed to run the package.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0
 * @link https://github.com/Josee9988/Implode-CSS repository.
 * @link https://github.com/Josee9988/Implode-CSS/issues issues or enhancements.
 */

import inquirer from 'inquirer';


/**
 * Summary: promptForMissingOptions prompts the user for some the arguments
 * not passed which are necessary to run the package, then returns
 * and object with the new options.
 *
 * @param {object} options arguments given by the user, if there are
 * some necessary arguments to be filled, it will prompt the user for them.
 * @return {object} options with the new answers, if it did any.
 */
export async function promptForMissingOptions(options) {
    const actualDirectory = process.cwd();
    const questions = [];

    if (options.defaultOptions) {
        return {
            ...options,
            folderToImplode: actualDirectory,
            audit: true,
        };
    }

    // If the user didn't specify a directory
    if (!options.folderToImplode) {
        // eslint-disable-next-line global-require
        inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));
        questions.push({
            type: 'fuzzypath',
            name: 'folderToImplode',
            message: 'Please give us the location of the folder to make the CSS implode',
            excludePath: (nodePath) => nodePath.startsWith('.git'),
            itemType: 'directory',
            suggestOnly: false,
            depthLimit: 5,
            default: actualDirectory,
        });
    }

    // If the user didn't specify if auditing or fixing or specified both
    if ((!options.fix && !options.audit) || (options.fix && options.audit)) {
        questions.push({
            type: 'list',
            name: 'action',
            message: 'Please mark what option you want to perform',
            choices: ['audit', 'fix'],
            default: 'audit',
        });
    }

    // inquirer.prompt(questions);
    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        folderToImplode: options.folderToImplode === '.' ? actualDirectory : options.folderToImplode || answers.folderToImplode,
        fix: options.fix && options.audit === false ? true : answers.action === 'fix',
        audit: options.audit && options.fix === false ? true : answers.action === 'audit',
        port: options.port >= 1024 && options.port <= 65535 ? options.port : 4949,
        ignore: options.ignore ? options.ignore.split(',') : undefined,
    };
}

export default promptForMissingOptions;
