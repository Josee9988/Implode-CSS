/**
 * @file getFilesAndStyles contains all the functions which allow implodeCss to
 * get all the file paths that may contain CSS referenced styles such as .html
 * or .php, and also all the file paths that contains the styles itselfs .css.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import exitCodes from './Exceptions/exitCodes';


/**
 * Main function that gathers all the path to the files with extensions
 * HTML and PHP, and returns them as an array.
 *
 * @param {String} folderToImplode path to the folder.
 * @return {Array} array with all the HTML and PHP files found in the directory
 */
export function getArrayHtmlPhpPaths(folderToImplode) {
    const htmlFiles = this.findFilesInDir(folderToImplode, '.html');
    const phpFiles = this.findFilesInDir(folderToImplode, '.php');
    return htmlFiles.concat(phpFiles);
}


/**
 * Find all files recursively in specific folder with specific extension, e.g:
 * findFilesInDir('./src', '.html') => ['./src/a.html','./src/build/index.html']
 * @param  {String} startPath    Relative path to the root folder.
 * @param  {String} filter       Extension name, e.g: '.html' lowercase letters.
 * @return {Array}               Result files with absolute path in an array.
 */
export function findFilesInDir(startPath, filter) {
    let results = [];
    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory() && !filename.match(/node_modules/g) && !filename.match(/.git/g)) {
            results = results.concat(findFilesInDir(filename, filter)); // recurse
        } else if (filename.indexOf(filter) >= 0) {
            results.push(filename);
        }
    }
    // eslint-disable-next-line consistent-return
    return results;
}

export function getCssReferencedInHtml(filePath) {
    let ids = [];
    fs.readFileSync(filePath, 'utf-8').split(/\r?\n/).forEach((line) => {
        if (this.getIdsFromString(line) !== undefined) {
            ids.push(this.getIdsFromString(line));
        }
    });
    console.log(ids);
}

export function getIdsFromString(lineWithCss) {
    const idFound = lineWithCss.match(/(id="(.*?)(\"))|(id='(.*?)(\'))|(id=`(.*?)(\`))/g);
    if (idFound !== null) {
        return idFound.toString().substr(4, idFound.toString().length - 5);
    }
}
