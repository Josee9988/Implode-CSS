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
export function showCodeAndExit(code, extraInformation = 'Not given', errorTraces) {
    switch (code) {
        case 200: // exiting OK
            console.log(`\nExiting without errors, thanks for using ${chalk.green('implodeCss')}`);
            break;

        case 201: // exiting OK? This exit is a default one, and should not be used.
            console.log(`\nExiting without an expected code, thanks for using ${chalk.green('implodeCss')}`);
            break;

        case 400: // bad arguments passed
            // we remove the two first arguments: path to node and call to the package
            extraInformation.splice(0, 2);
            console.error(`\n${chalk.bold.red('ERROR: ')}your arguments: '${chalk.bold.magenta(extraInformation)}' are wrong.`);
            console.error(`${chalk.bold.red('errno:') + chalk.bold(' 400')} - Bad or unexpected arguments.`);
            console.error(`Check the manual by typing: ${chalk.bold.grey('implodeCss -h')}`);
            break;

        case 401: // path does not exist
            console.error(`\n${chalk.bold.red('ERROR: ')}your path: '${chalk.bold.magenta(extraInformation)}' is wrong.`);
            console.error(`${chalk.bold.red('errno: ') + chalk.bold(' 401')} - The given path does not exist.`);
            break;

        case 402: // path don't have read permissions
            console.error(`\n${chalk.bold.red('ERROR: ')}your path: '${chalk.bold.magenta(extraInformation)}' is wrong.`);
            console.error(`${chalk.bold.red('errno: ') + chalk.bold(' 402')} - The given path does not have read permissions.`);
            break;

        case 403: // path don't have write permissions
            console.error(`\n${chalk.bold.red('ERROR: ')}your path: '${chalk.bold.magenta(extraInformation)}' is wrong.`);
            console.error(`${chalk.bold.red('errno: ') + chalk.bold(' 403')} - The given path does not have write permissions.`);
            break;

        case 404: // not enough html or css files
            console.error(`\n${chalk.bold.red('ERROR: ')}there is not enough HTML or CSS files to look for unused files.`);
            console.error(`${chalk.bold.red('errno: ') + chalk.bold(' 404')} - The given path does not contain enough HTML or CSS files.`);
            break;

        case 405: // not enough permissions to write data
            console.error(`\n${chalk.bold.red('ERROR: ')}couldn't write data in a local file, ${chalk.bold.blue('retry as a sudo/administrator')} user.`);
            console.error(`${chalk.bold.red('errno: ') + chalk.bold(' 405')} - Could not write data in a local file to output the unused CSS styles.`);
            console.error(`More info: ${extraInformation}.`);
            break;

        case 406:
            console.error(`\n${chalk.bold.red('ERROR: ')}couldn't read or write data in order to fix your code , retry as a ${chalk.bold('sudo')} user..`);
            console.error(`${chalk.bold.red('errno: ') + chalk.bold(' 406')} - Could not write or read data, this error is unexpected, check your permissions, or post an issue.`);
            break;

        case 501: // bad server
            console.error(`\n${chalk.bold.red('ERROR: ')}could not open the server with port: ${extraInformation}, retry as a ${chalk.bold('sudo')} user..`);
            console.error(`${chalk.bold.red('errno: ') + chalk.bold(' 501')} - Permission denied at setting up the server in port ${extraInformation} to show the results.`);
            break;

        default: // unknown error 501
            console.error(chalk.bold.red('\nUnknown error!'));
            console.error(`${chalk.bold.red('errno:') + chalk.bold(' 500')
                } - Unexpected error code, you should never be reading this, please inform us how this happened at: ${
                chalk.bold('https://github.com/Josee9988/Implode-CSS/issues')}`);
            process.exit('500');
            break;
    }
    if (code >= 400) {
        console.error(`If you believe this is our fault, please let us know at: ${
            chalk.bold('https://github.com/Josee9988/Implode-CSS/issues')}`);
    }

    if (errorTraces !== undefined) {
        console.error(`More information about the error: ${chalk.gray(errorTraces)}.`);
    }

    process.exit(code); // exists with the code given without throwing an error.
}

export default showCodeAndExit;
