/**
 * @file informationCLI, contains functions that are called by the user from
 * arguments, and simply output information as a console.log.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS
 */

import chalk from 'chalk';
import version from '../../package.json';


/**
 * Summary: showOptions receives an object with the options and output
 * them to the console.
 *
 * @param {object} options options selected by the user.
 * @return {void}
 */
export async function showOptions(options) {
    console.log(`Your ${chalk.yellow('options')} are:`);
    process.stdout.write(`    ${chalk.red('Root')}  Folder to search CSS's, HTML's and PHP's: `);
    console.log(chalk.bold.green(options.folderToImplode));
    process.stdout.write(`    ${chalk.red('Audit')} Not performing any action, just showing the unused classes: `);
    console.log(chalk.bold.green(options.audit));
    process.stdout.write(`    ${chalk.red('Fix')}   Remove unused CSS ids and classes: `);
    console.log(chalk.bold.green(options.fix) + chalk.white('\n'));
}

/**
 * Summary: showVersion outputs the version of the package found in
 * package.json and also returns the number of the version.
 *
 * @return {string} with the version
 */
export function showVersion() {
    console.log(chalk.bold.gray(version.version));
    return version.version;
}

/**
 * Summary: showHelp shows the help for the package 'implodeCss'
 * it outputs all the global options, usage, hints and examples of use.
 *
 * @return {void}
 */
export function showHelp() {
    console.log(chalk.green('\nImplodeCss') + chalk.gray(` v${showVersion()}`));

    console.log(`\n${chalk.bold('Usage')}: implodeCss ${chalk.magenta('[folder] [options]\n')}`);

    console.log(chalk.bold('Global options:\n'));
    console.log('  -y, --yes\t\tIgnore all options and use the default ones.');
    console.log('  -a, --audit\t\tOutput unused CSS selectors.');
    console.log('  -f, --fix\t\tFix unused CSS selectors and output the result.');
    console.log('  -h, --help\t\tOutput usage information. (ignores all other arguments)');
    console.log('  -v, --version\t\tOutput package version. (ignores all other arguments)');

    console.log(chalk.bold('\nExample of use:'));
    console.log('  implodeCss /var/www/html/myHost --fix');

    console.log(chalk.bold('\nHint:'));
    console.log(`  -If you do not know how to use the command, simply do: '${
        chalk.bold('ImplodeCss')}' (without arguments) and the package will prompt you the needed options.`);
    console.log(`  -You must use an ${chalk.bold('absolute path')} if you want to use it directly as an argument,
    ${chalk.bold('otherwise')} simply call the command ${chalk.bold('without a path')} and there you will be able to use ${chalk.bold('relative path')} from your actual path\n`);
    console.log(`For more information: ${chalk.bold('https://github.com/Josee9988/Implode-CSS')}`);
}


exports.showHelp = showHelp;
exports.showVersion = showVersion;
exports.showOptions = showOptions;
