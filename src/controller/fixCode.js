/**
 * @file fixCode file that contains functions in order to fix the code (remove unused css selectors)
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS repository.
 * @link https://github.com/Josee9988/Implode-CSS/issues issues or enhancements.
 */

import fs from 'fs';


/**
 * Summary: function that removes from all the css files that contain unused css selectors
 * looks for every unused css selector and removes it.
 *
 * @async
 * @param {Array} cssFiles all the css files that contain unused css selectors.
 * @param {Array} styles all the unused css classes and ids found.
 * @return {boolean} true if all ok, if there is an error false.
 */
export default async function removeUnused(cssFiles, styles) {
    let fileReaded;
    try {
        cssFiles.forEach((file) => {
            fileReaded = fs.readFileSync(file, 'utf-8'); // reads the file
            styles.forEach((stylesPath) => { // foreach of every path
                stylesPath.forEach((styleToRemove) => { // gets every element with X.css and X.path
                    const regex = new RegExp(`(?:^|}|\\.|\\#)\\s*${styleToRemove.css.substr(1)}\\s*(\\{|\\:|\\>|\\s|\\+|\\~)([^}]*)}`);
                    fileReaded = fileReaded.replace(regex, '{}');
                });
            });
            // Removes blank lines
            fs.writeFileSync(file, fileReaded.replace(/^[ \t\n]*$/gm, ''));
            // Removes lines with only {}
            fs.writeFileSync(file, fileReaded.replace(/^({)(})/gm, ''));
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        return false;
    }
    return true;
}
