/**
 * @file getCssUnused is a file that contains all the functions that allows to get all the
 * unused CSS styles.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS
 */

import fs from 'fs';

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
export async function getUnusedCss(cssFiles, idsFoundHTML, classFoundHTML) {
    let idsInCss = [];
    let classInCss = [];
    const unusedArray = [];
    let classNotUsed = [];
    let idsNotUsed = [];


    // Find all css and classes created (we do not know if they are used yet)
    for (let i = 0; i < cssFiles.length; i++) {
        const texto = fs.readFileSync(cssFiles[i], 'utf-8').split(/\r?\n/).join('');
        idsInCss = idsInCss.concat(texto.match(/#-?[_a-zA-Z]+[_a-zA-Z0-9-]*(?=[^}]*\{)/g));
        classInCss = classInCss.concat(texto.match(/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*(?=[^}]*\{)/g));
    }

    // check if the ids are used if not add the Css selector to 'idsNotUsed'
    for (let i = 0; i < idsInCss.length; i++) {
        if (idsFoundHTML.indexOf(idsInCss[i].substr(1)) === -1) { // if it hasn't been used
            idsNotUsed = idsNotUsed.concat(idsInCss[i]); // adds it to the array of unused
        }
    }

    // check if the classes are used if not add the Css selector to 'classNotUsed'
    for (let i = 0; i < classInCss.length; i++) {
        if (classFoundHTML.indexOf(classInCss[i].substr(1)) === -1) { // if it hasn't been used
            classNotUsed = classNotUsed.concat(classInCss[i]); // adds it to the array of unused
        }
    }

    unusedArray.push(idsNotUsed, classNotUsed);
    return unusedArray;
}

export default getUnusedCss;
