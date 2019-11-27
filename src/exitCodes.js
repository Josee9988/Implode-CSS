import chalk from 'chalk';

export function showCodeAndExit(code, extraInformation = undefined) {
    switch (code) {
        case 200:
            console.log('Exiting without errors, thanks for trusting in ' + chalk.green('implodeCss'));
            process.exit(200);
            break;

        case 400:
            // we remove the path to node and call to the package
            extraInformation.splice(0, 2);
            console.error(chalk.bold.red('ERROR: ') + 'your arguments: \'' + chalk.bold.magenta(extraInformation) + '\' are wrong.');
            console.error(chalk.bold.red('errno:') + chalk.bold(' 400') + ' - Bad or unexpected arguments.');
            console.error('Check the manual by typing: ' + chalk.bold.grey('implodeCss -h'));
            console.error('If you believe this is our fault, please let us know at: ' + chalk.bold('https://github.com/Josee9988/Implode-CSS/issues'));
            process.exit(400);
            break;

        default:
            console.error(chalk.bold.red('Unknown error.'))
            console.error(chalk.bold.red('errno:') + chalk.bold(' 500') +
                ' - Unexpected error code, you should never be reading this, please inform us how this happened.');
            console.error('If you beleive this is our fault, please let us know at: ' +
                chalk.bold('https://github.com/Josee9988/Implode-CSS/issues'));
            process.exit('500')
            break;
    }
}

export default showCodeAndExit;
