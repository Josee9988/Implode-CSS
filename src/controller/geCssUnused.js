/**
 * @file getCssUnused is a file that contains all the functions that allows to get all the
 * unused CSS styles.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS
 */

import fs from 'fs';
import chalk from 'chalk';


/**
 * Summary getUnusedCss receives all the css files, and all the ids and classes found from
 * html files, then it looks if the styles are used, and returns a 2D array with the unused
 * CSS selectors.
 *
 * @async
 * @param {Array} cssFiles all css files to look for.
 * @param {Array} idsFoundHTML all ids found from HTML files.
 * @param {Array} classFoundHTML all classes found from HTML files.
 * @return {Array.<string[]>} 2D array with [0] = unused ids and [1] = unused classes.
 */
export function getUnusedCss(cssFiles, idsFoundHTML, classFoundHTML) {
    let idsInCss = [];
    let classInCss = [];
    const unusedArray = [];
    let classNotUsed = [];
    let idsNotUsed = [];


    // Find all css and classes created (we do not know if they are used yet)
    for (let i = 0; i < cssFiles.length; i++) {
        const texto = fs.readFileSync(cssFiles[i], 'utf-8').split(/\r?\n/).join('');
        idsInCss = idsInCss.concat({
            css: texto.match(/#-?[_a-zA-Z]+[_a-zA-Z0-9-]*(?=[^}]*\{)/g),
            path: cssFiles[i],
        });
        classInCss = classInCss.concat({
            css: texto.match(/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*(?=[^}]*\{)/g),
            path: cssFiles[i],
        });
    }

    // check if the ids are used if not add the Css selector to 'idsNotUsed'
    // eslint-disable-next-line consistent-return
    idsInCss.forEach((element) => {
        const {
            path,
        } = element;
        if (element.css === null) {
            return false;
        }
        element.css.forEach((css) => {
            if (idsFoundHTML.indexOf(css.substr(1)) === -1) { // if it hasn't been used
                idsNotUsed = idsNotUsed.concat({
                    css,
                    path,
                }); // adds it to the array of unused
            }
        });
    });

    // check if the classes are used if not add the Css selector to 'classNotUsed'
    // eslint-disable-next-line consistent-return
    classInCss.forEach((element) => {
        const {
            path,
        } = element;
        if (element.css === null) {
            return false;
        }
        element.css.forEach((css) => {
            if (classFoundHTML.indexOf(css.substr(1)) === -1) { // if it hasn't been used
                classNotUsed = classNotUsed.concat({
                    css,
                    path,
                }); // adds it to the array of unused
            }
        });
    });


    // check for files without any CSS selector
    for (let i = 0; i < classInCss.length; i++) {
        if (classInCss[i].css === null && idsInCss[i].css === null) {
            console.log(`${chalk.bgRed('Unconsistency')} - File: '${chalk.bold(classInCss[i].path)}'. does not contain any CSS styles!`);
        }
    }

    unusedArray.push(idsNotUsed, classNotUsed);
    return unusedArray;
}

export default getUnusedCss;
