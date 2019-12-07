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
    console.log(`    ${chalk.cyan('Root')}      Folder to search CSS's, HTML's and PHP's: ${chalk.bold.green(options.folderToImplode)}`);
    console.log(`    ${chalk.cyan('Audit')}     Not performing any action, just showing the unused classes: ${chalk.bold.green(options.audit)}`);
    console.log(`    ${chalk.cyan('Fix')}       Remove unused CSS ids and classes: ${chalk.bold.green(options.fix)}`);
    console.log(`    ${chalk.cyan('Port')}      Port used for the server: ${`${chalk.bold.green(options.port)}`}`);
    console.log(`    ${chalk.cyan('Ignored')}   Folders ignored: ${`${chalk.bold.green(options.ignore)}\n`}`);
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
    console.log(chalk.green('\nImplodeCss') + chalk.gray(` v${version.version}`));

    console.log(`\n${chalk.bold('Usage')}: implodeCss ${chalk.magenta('[folder] [options]\n')}`);

    console.log(chalk.bold('Global options:\n'));
    console.log('  -y, --yes\t\t  Ignore all options and use the default ones.');
    console.log('  -a, --audit\t\t  Output unused CSS selectors.');
    console.log('  -f, --fix\t\t  Fix unused CSS selectors and output the result.');
    console.log('  -h, --help\t\t  Output usage information. (ignores all other arguments)');
    console.log('  -v, --version\t\t  Output package version. (ignores all other arguments)');
    console.log('  -p, --port\t\t  Port of the server by default 4949. (>= 1024 and <= 65535)');
    console.log('  -i, --ignoreFolders\t  Ignore folders (add multiple folders name by separating them with commas)');

    console.log(chalk.bold('\nExamples of use:'));
    console.log('  implodeCss /var/www/html/myHost --fix -p 4848');
    console.log('  implodeCss . -a');
    console.log('  implodeCss . -a -i src,public,tests,folderName');

    console.log(chalk.bold('\nHint:'));
    console.log(`  -If you do not know how to use the command, simply do: '${
        chalk.bold('ImplodeCss')}' (without arguments) and the package will prompt you the needed options.`);
    console.log(`  -You must use an ${chalk.bold('absolute path')} if you want to use it directly as an argument,
    ${chalk.bold('otherwise')} simply call the command ${chalk.bold('without a path')} and there you will be able to use ${chalk.bold('relative path')} from your actual path\n`);
    console.log(`For more information visit: ${chalk.bold('https://github.com/Josee9988/Implode-CSS')}`);
}


exports.showHelp = showHelp;
exports.showVersion = showVersion;
exports.showOptions = showOptions;
