/**
 * @file main.js, it includes the logic of the package
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 */
import chalk from 'chalk';
import path from 'path';


export async function showOptionsAndProceed(options) {
    process.stdout.write("Your ");
    process.stdout.write(chalk.yellow("options"));
    process.stdout.write(" are:\n");
    process.stdout.write("Root folder to search CSS's, HTML's and PHP's: ");
    console.log(chalk.bold.green(options.folderToImplode));
    process.stdout.write("Audit (not performing any action, just showing the unused classes): ");
    console.log(chalk.bold.green(options.audit));
    process.stdout.write("Fix (removed unused CSS ids and classes): ");
    console.log(chalk.bold.green(options.fix) + '\n');
    getCssElementsFromHtml();
}

function getCssElementsFromHtml() {
    console.log('Getting');
}




export default showOptionsAndProceed;
