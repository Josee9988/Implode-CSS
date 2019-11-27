import chalk from 'chalk';

export function showCodeAndExit(code, extraInformation = undefined) {
    switch (code) {
        case 200: // exiting OK
            console.log('Exiting without errors, thanks for trusting in ' + chalk.green('implodeCss'));
            break;

        case 400: // bad arguments passed
            // we remove the path to node and call to the package
            extraInformation.splice(0, 2);
            console.error(chalk.bold.red('ERROR: ') + 'your arguments: \'' + chalk.bold.magenta(extraInformation) + '\' are wrong.');
            console.error(chalk.bold.red('errno:') + chalk.bold(' 400') + ' - Bad or unexpected arguments.');
            console.error('Check the manual by typing: ' + chalk.bold.grey('implodeCss -h'));
            console.error('If you believe this is our fault, please let us know at: ' + chalk.bold('https://github.com/Josee9988/Implode-CSS/issues'));
            break;

        case 401: // path does not exist or no permissions
            console.error(chalk.bold.red('ERROR: ') + 'your path: \'' + chalk.bold.magenta(extraInformation) + '\' is wrong.');
            console.error(chalk.bold.red('errno: ') + chalk.bold(' 401') + ' - The given path does not exist or there is a lack of permissions');
            console.error('If you beleive this is our fault, please let us know at: ' +
                chalk.bold('https://github.com/Josee9988/Implode-CSS/issues'));
            break;

        default: // unknown error
            console.error(chalk.bold.red('Unknown error.'))
            console.error(chalk.bold.red('errno:') + chalk.bold(' 500') +
                ' - Unexpected error code, you should never be reading this, please inform us how this happened.');
            console.error('If you beleive this is our fault, please let us know at: ' +
                chalk.bold('https://github.com/Josee9988/Implode-CSS/issues'));
            process.exit('500')
            break;
    }
    process.exit(code); // exists with the code given
}

export default showCodeAndExit;
