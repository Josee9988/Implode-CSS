import chalk from 'chalk';
import version from '../package.json';


export function showOptions(options) {
    console.log('Your ' + chalk.yellow('options') + ' are:\n');
    process.stdout.write("Root folder to search CSS's, HTML's and PHP's: ");
    console.log(chalk.bold.green(options.folderToImplode));
    process.stdout.write("Audit (not performing any action, just showing the unused classes): ");
    console.log(chalk.bold.green(options.audit));
    process.stdout.write("Fix (removed unused CSS ids and classes): ");
    console.log(chalk.bold.green(options.fix) + chalk.white('\n'));
}

export function showHelp() {
    console.log(chalk.green('\nImplodeCss') + chalk.gray('  v' + version.version));

    console.log('\n' + chalk.bold('Usage') + ': implodeCss ' + chalk.magenta('[folder] [options]\n'));

    console.log(chalk.bold('Global options:\n'));
    console.log('  -y, --yes\t\tIgnore all options and use the default ones.');
    console.log('  -a, --audit\t\tOutput unused CSS selectors.');
    console.log('  -f, --fix\t\tFix unused CSS selectors and output the result.');
    console.log('  -h, --help\t\tOutput usage information. (ignores all other arguments)');
    console.log('  -v, --version\t\tOutput package version. (ignores all other arguments)');

    console.log(chalk.bold('\nExample of use:'));
    console.log('  implodeCss /var/www/html/myHost --fix');

    console.log(chalk.bold('\nHint:'));
    console.log('  If you do not know how to use the command, simply do: \'' +
        chalk.bold('ImplodeCss') + '\' (without arguments) and the package will prompt you the needed options');
}

export function showVersion() {
    console.log(chalk.bold.gray(version.version));
}

exports.showHelp = showHelp;
exports.showOptions = showOptions;
exports.showVersion = showVersion;
