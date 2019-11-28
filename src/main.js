/**
 * @file main.js, it includes the logic of the package
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS
 */

import chalk from 'chalk';
import exitCodes from './Exceptions/exitCodes';
import {
    getArrayHtmlPhpPaths,
    findFilesInDir,
} from './controller/getFiles';
import {
    getIdsReferencedInHtml,
    getClassesReferencedInHtml,
} from './controller/getCssReferenced';
import getUnusedCss from './controller/geCssUnused';
import testPathFile from './testPath';


/**
 * Summary: auditCode is the main function of auditing. It does not make any
 * modification or perform any specific task, it simply shows an output of the
 * unused styles. Simply shows a preview of what might be fixed.
 *
 * @async
 * @param {string} folderToImplode rootFolder in which we will look
 * for unused CSS styles.
 * @return {void}
 */
export async function auditCode(folderToImplode) {
    const unusedStyles = mainGetUnusedCss(folderToImplode);
}


/**
 * Summary: fixCode is the main function of fixing. It does make all the
 * modifications and fixes in order to remove all unused css styles. Also
 * it shows a little output of what has been fixed.
 *
 * @async
 * @param {string} folderToImplode rootFolder in which we will look
 * for unused CSS styles.
 * @return {void}
 */
export async function fixCode(folderToImplode) {
    const unusedStyles = mainGetUnusedCss(folderToImplode);
}


/**
 * Summary: mainGetUnusedCss called by fixCode and auditCode, shows an output of all the
 * total files, total styles and total unused classes and then returns a 2D array with
 * the unused ids ([0]) and the unused classes ([1])
 *
 * @async
 * @param {string} folderToImplode rootFolder in which we will look
 * for unused CSS styles.
 * @return {Array.<string[]>} 2D array with [0] = unused ids and [1] = unused classes.
 */
async function mainGetUnusedCss(folderToImplode) {
    const htmlPhpFiles = getArrayHtmlPhpPaths(folderToImplode);
    const cssFiles = findFilesInDir(folderToImplode, '.css');

    console.log(`Found: ${chalk.bold.yellow(htmlPhpFiles.length)} files that may contain references to CSS styles. (.html/.php)`);
    console.log(`Found: ${chalk.bold.yellow(cssFiles.length)} files that contain CSS styles. (.css)\n`);

    // if there is not enough files to look for.
    if (htmlPhpFiles.length === 0 || cssFiles.length === 0) {
        exitCodes(404);
    }

    // Find ids and classes in the HTML/PHP files
    let ids = [];
    let classes = [];
    for (let i = 0; i < htmlPhpFiles.length; i++) {
        testPathFile(htmlPhpFiles[i]); // test RW permissions.
        ids = ids.concat(getIdsReferencedInHtml(htmlPhpFiles[i]));
        classes = classes.concat(getClassesReferencedInHtml(htmlPhpFiles[i]));
    }

    console.log(`Found: ${chalk.bold.yellow(ids.length)} total ${chalk.bold('ids')} in your HTML/PHP files.`);
    console.log(`Found: ${chalk.bold.yellow(classes.length)} total ${chalk.bold('classes')} in your HTML/PHP files.\n`);

    const unusedArray = await getUnusedCss(cssFiles, ids, classes);

    console.log(`Found: ${chalk.bold.yellow(unusedArray[0].length)} total ${chalk.bold.red('UNUSED IDS')} in your project.`);
    console.log(`Found: ${chalk.bold.yellow(unusedArray[1].length)} total ${chalk.bold.red('UNUSED CLASSES')} in your project.\n`);

    return unusedArray;
}


exports.auditCode = auditCode;
exports.fixCode = fixCode;
