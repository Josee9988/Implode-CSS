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
import exitCodes from './exitCodes';

const readline = require('readline');

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
    fs.readFile(filePath, {
        encoding: 'utf-8',
    }, (err, data) => {
        if (!err) { // file found
            // console.log('received data: ' + data);
            getIdsAndClassesFromString(data);
        } else {
            console.log(err);
        }
    });
}

export function getIdsAndClassesFromString(lineWithCss) {
    console.log(`linea: ${lineWithCss}`);
    const idDoubleNormalComma = lineWithCss.replace(/(id="(.*?)(\"))/g, '');
    console.log(/(id="(.*?)(\"))/g.exec(lineWithCss)[2]);
}
