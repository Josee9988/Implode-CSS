/* eslint-disable max-len */
/**
 * @file main.js, it includes the logic of the package
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS repository.
 * @link https://github.com/Josee9988/Implode-CSS/issues issues or enhancements.
 */

import chalk from 'chalk';
import {
    testPath,
    testPathFile,
} from './controller/testPath';
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
import {
    runHttpServer,
    writeDataFile,
} from './server/createServer';
import removeUnused from './controller/fixCode';


module.exports = class ImplodeCssClass {
    constructor(options = {}) {
        this.options = options;
        this.options.audit = options.audit || false;
        this.options.fix = options.fix || false;
        this.options.port = options.port || 4949;
        this.options.ignore = options.ignore || undefined;
        this.options.folderToImplode = options.folderToImplode || undefined;
        testPath(options.folderToImplode);
    }


    /**
     * Summary: mainGetUnusedCss called by fixCode and auditCode, shows an output of all the
     * total files, total styles and total unused classes and then returns a 2D array with
     * the unused ids ([0]) and the unused classes ([1])
     *
     * @async
     * @param {string} folderToImplode rootFolder in which we will look
     * @param {Array} ignore all the folders to not look into
     * for unused CSS styles.
     * @return {Array.<string[]>} 2D array with [0] = unused ids and [1] = unused classes.
     */
    async mainGetUnusedCss() {
        // eslint-disable-next-line max-len
        const htmlPhpFiles = getArrayHtmlPhpPaths(this.options.folderToImplode, this.options.ignore);
        const cssFiles = findFilesInDir(this.options.folderToImplode, '.css', this.options.ignore);

        // if there is not enough files to look for.
        if (htmlPhpFiles.length === 0 || cssFiles.length === 0) {
            exitCodes(404); // it will stop the process.
        }

        // Find ids and classes in the HTML/PHP files
        let ids = [];
        let classes = [];
        for (let i = 0; i < htmlPhpFiles.length; i++) {
            testPathFile(htmlPhpFiles[i]); // test RW permissions.
            ids = ids.concat(getIdsReferencedInHtml(htmlPhpFiles[i]));
            classes = classes.concat(getClassesReferencedInHtml(htmlPhpFiles[i]));
        }

        let unusedArray = getUnusedCss(cssFiles, ids, classes);
        const test = {
            htmlPhpLength: htmlPhpFiles.length,
            cssFilesLength: cssFiles.length,
            idsFoundLength: ids.length,
            classesFoundLength: classes.length,
        };
        unusedArray = unusedArray.concat(test);
        return unusedArray;
    }


    /**
     * Summary: auditCode is the main function of auditing. It does not make any
     * modification or perform any specific task, it simply shows an output of the
     * unused styles. Simply shows a preview of what might be fixed.
     *
     * @async
     * @param {Object} options object with all the options.
     * @return {void}
     */
    auditCode() {
        this.mainGetUnusedCss(this.options.folderToImplode, this.options.ignore).then((unusedStyles) => {
            if (writeDataFile(unusedStyles) === true) {
                runHttpServer(this.options.port).then(() => {
                    console.log(`\nAll unused selectors were ${chalk.bold.blueBright('successfully')} found.`);
                    console.log(`For more information or issues visit: ${chalk.bold('\'https://github.com/Josee9988/Implode-CSS\'')}`);
                    console.log(`To stop the server type: ${chalk.bold('CTRL+C')}`);
                }).catch((err) => {
                    exitCodes(501, this.options.port, err);
                });
            } else {
                exitCodes(405, writeDataFile(unusedStyles));
            }
        }).catch((err) => {
            exitCodes(502, '', err);
        });
    }


    /**
     * Summary: fixCode is the main function of fixing. It does make all the
     * modifications and fixes in order to remove all unused css styles. Also
     * it shows a little output of what has been fixed.
     *
     * @async
     * @param {Object} options object with all the options.
     * @return {void}
     */
    fixCode() {
        // await is Necessary
        const unusedStyles = this.mainGetUnusedCss(this.options.folderToImplode, this.options.ignore);
        if (writeDataFile(unusedStyles) === true) {
            const cssFiles = findFilesInDir(this.options.folderToImplode, '.css', this.options.ignore);
            if (!removeUnused(cssFiles, unusedStyles)) { // if there is a mistake, shutdown the program
                exitCodes(406);
            }
            runHttpServer(this.options.port).then(() => {
                console.log(`\nAll unused selectors ${chalk.bold.blueBright('successfully')} found and fixed.`);
                console.log(`For more information or issues visit: ${chalk.bold('\'https://github.com/Josee9988/Implode-CSS\'')}`);
                console.log(`To stop the server type: ${chalk.bold('CTRL+C')}`);
            }).catch((err) => {
                exitCodes(501, this.options.port, err);
            });
        } else {
            exitCodes(405, writeDataFile(unusedStyles));
        }
    }
};
