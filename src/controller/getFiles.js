/**
 * @file getFilesAndStyles contains all the functions which allow implodeCss to
 * get all the file paths that may contain CSS referenced styles such as .html
 * or .php, and also all the file paths that contains the styles itselfs .css.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS repository.
 * @link https://github.com/Josee9988/Implode-CSS/issues issues or enhancements.
 */

import fs from 'fs';
import path from 'path';


/**
 * Find all files recursively in specific folder with specific extension, e.g:
 * findFilesInDir('./src', '.html') => ['./src/a.html','./src/build/index.html']
 * @param  {String} startPath    Relative path to the root folder.
 * @param  {String} filter       Extension name, e.g: '.html' lowercase letters.
 * @param  {Array}  ignore       Folders to be ignored
 * @return {Array}               Result files with absolute path in an array.
 */
export function findFilesInDir(startPath, filter, ignore) {
    let results = [];
    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        // if it's a directory and it is node_modules and .git
        if (stat.isDirectory() && !filename.match(/node_modules/g) && !filename.match(/.git/g)) {
            if (ignore !== undefined) { // if there are ignored folders
                let isIgnored = false;
                // eslint-disable-next-line consistent-return
                ignore.forEach((folder) => { // check every folder ignored by the user
                    if (filename.match(folder)) { // if the folder is one of the ignored...
                        isIgnored = true;
                        return true;
                    }
                });
                if (!isIgnored) {
                    results = results.concat(findFilesInDir(filename, filter, ignore)); // recurse
                }
            } else if (ignore === undefined) {
                results = results.concat(findFilesInDir(filename, filter, ignore)); // recurse
            }
        } else if (filename.indexOf(filter) >= 0) {
            results.push(filename);
        }
    }
    // eslint-disable-next-line consistent-return
    return results;
}


/**
 * Main function that gathers all the path to the files with extensions
 * HTML and PHP, and returns them as an array.
 *
 * @param {String} folderToImplode path to the folder.
 * @return {Array} array with all the HTML and PHP files found in the directory
 */
export function getArrayHtmlPhpPaths(folderToImplode, ignore) {
    const htmlFiles = findFilesInDir(folderToImplode, '.html', ignore);
    const phpFiles = findFilesInDir(folderToImplode, '.php', ignore);
    return htmlFiles.concat(phpFiles);
}
