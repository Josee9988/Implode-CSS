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

/**
 * Summary: audirCode is the main function of auditing. It does not make any
 * modification or perform any specific task, it simply shows an output of the
 * unused styles. Simply shows a preview of what might be fixed.
 *
 * @param {string} folderToImplode rootFolder in which we will look
 * for unused CSS styles.
 * @return {void}
 */
export async function auditCode(folderToImplode) {
    const htmlPhpFiles = getArrayHtmlPhpPaths(folderToImplode);
    const cssFiles = findFilesInDir(folderToImplode, '.css');

    console.log(`Found: ${chalk.bold.yellow(htmlPhpFiles.length)} files that may contain references to CSS styles.`);
    console.log(`Found: ${chalk.bold.yellow(cssFiles.length)} files that contain CSS styles.\n`);

    // if there is not enough files to look for.
    if (htmlPhpFiles.length === 0 || cssFiles.length === 0) {
        exitCodes(404);
    }

    // Find ids and classes in the HTML/PHP files
    let ids = [];
    let classes = [];
    for (let i = 0; i < htmlPhpFiles.length; i++) {
        ids = ids.concat(getIdsReferencedInHtml(htmlPhpFiles[i]));
        classes = classes.concat(getClassesReferencedInHtml(htmlPhpFiles[i]));
    }

    console.log(`Found: ${chalk.bold.yellow(ids.length)} total ${chalk.bold('ids')} in your HTML\\PHP files.`);
    console.log(`Found: ${chalk.bold.yellow(classes.length)} total ${chalk.bold('classes')} in your HTML\\PHP files.`);

    getUnusedCss(cssFiles, ids, classes);
}


/**
 * Summary: fixCode is the main function of fixing. It does make all the
 * modifications and fixes in order to remove all unused css styles. Also
 * it shows a little output of what has been fixed.
 *
 * @param {string} folderToImplode rootFolder in which we will look
 * for unused CSS styles.
 * @return {void}
 */
export async function fixCode(folderToImplode) {
    console.log('TODO');
}


exports.auditCode = auditCode;
exports.fixCode = fixCode;
