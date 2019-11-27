/**
 * @file exitCodes file that contains a function that shows information about
 * the exit code and simply stops the process of the program.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0
 * @link https://github.com/Josee9988/Implode-CSS
 */

import chalk from 'chalk';


/**
 * Summary: showCodeAndExit is a function that receives an error code
 * and it closes the process/program and shows a brief output of
 * what happened, and the error code.
 *
 * @param {number} code id of the exit code, that will be used in the switch.
 * @param {any} extraInformation object, array or string that may be used
 * or not if the error code needs to output extra information in order to
 * make the error more understandable.
 * @return {void}
 */
export function showCodeAndExit(code, extraInformation = 'Not given') {
    switch (code) {
        case 200: // exiting OK
            console.log(`Exiting without errors, thanks for using ${chalk.green('implodeCss')}`);
            break;

        case 201: // exiting OK? This exit is a default one, and should not be used.
            console.log(`Exiting without an expected code, thanks for using ${chalk.green('implodeCss')}`);
            break;

        case 400: // bad arguments passed
            // we remove the two first arguments: path to node and call to the package
            extraInformation.splice(0, 2);
            console.error(`${chalk.bold.red('ERROR: ')}your arguments: '${chalk.bold.magenta(extraInformation)}' are wrong.`);
            console.error(`${chalk.bold.red('errno:') + chalk.bold(' 400')} - Bad or unexpected arguments.`);
            console.error(`Check the manual by typing: ${chalk.bold.grey('implodeCss -h')}`);
            console.error(`If you believe this is our fault, please let us know at: ${chalk.bold('https://github.com/Josee9988/Implode-CSS/issues')}`);
            break;

        case 401: // path does not exist or no permissions
            console.error(`${chalk.bold.red('ERROR: ')}your path: '${chalk.bold.magenta(extraInformation)}' is wrong.`);
            console.error(`${chalk.bold.red('errno: ') + chalk.bold(' 401')} - The given path does not exist or there is a lack of permissions`);
            console.error(`If you beleive this is our fault, please let us know at: ${
                chalk.bold('https://github.com/Josee9988/Implode-CSS/issues')}`);
            break;

        default: // unknown error
            console.error(chalk.bold.red('Unknown error.'));
            console.error(`${chalk.bold.red('errno:') + chalk.bold(' 500')
                } - Unexpected error code, you should never be reading this, please inform us how this happened at: ${
                chalk.bold('https://github.com/Josee9988/Implode-CSS/issues')}`);
            process.exit('500');
            break;
    }
    process.exit(code); // exists with the code given
}

export default showCodeAndExit;
