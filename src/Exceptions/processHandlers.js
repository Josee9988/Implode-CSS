/**
 * @file processHandlers file that contains the functions to handle unhandled errors.
 *
 * @author Jose Gracia Berenguer
 * @since 1.1.0.
 * @link https://github.com/Josee9988/Implode-CSS
 */
import chalk from 'chalk';


/**
 * Summary: a function called from 'createProcessesHandlers' that will output an error.
 *
 * @param {Error} err to be outputed.
 * @return {void}
 */
function outputUnexpectedError(err) {
    console.error(chalk.bold.red('\nUnknown error!'));
    console.error(`ImplodeCss exited with an unhandled and unexpected error: ${chalk.gray(err.message)}.`);
    console.error(`Unexpected error, you should never be reading this, please inform us how this happened at: ${
chalk.bold('https://github.com/Josee9988/Implode-CSS/issues')}`);
}


/**
 * Summary: a function that handles multiple events in order to try to avoid unexpected
 * errors closing the program unexpectedly without the user knowing what happened.
 * Called one time from the cli file and it will registry the events.
 *
 * @async
 * @return {void}
 */
export default async function createProcessesHandlers() {
    process.on('unhandledRejection', (err) => {
        outputUnexpectedError(err);
        process.exit(err.errno);
    });
    process.on('uncaughtException', (err, promise) => {
        console.error(`Unhandled rejection at: ${promise}`);
        outputUnexpectedError(err);
        process.exit(err.errno);
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        console.error(`Unexpected error, you should never be reading this, please inform us how this happened at: ${
            chalk.bold('https://github.com/Josee9988/Implode-CSS/issues')}`);
    });
    process.on('warning', (warning) => {
        console.warn(warning.name); // Print the warning name
        console.warn(warning.message); // Print the warning message
        console.warn(warning.stack); // Print the stack trace
    });
}
