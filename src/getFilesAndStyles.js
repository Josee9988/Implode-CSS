import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
const readline = require('readline');
import exitCodes from './exitCodes';

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

    var results = [];

    if (!fs.existsSync(startPath)) {
        exitCodes(401, startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        //filename = filename.toLocaleLowerCase();
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            results = results.concat(findFilesInDir(filename, filter)); //recurse
        } else if (filename.indexOf(filter) >= 0) {
            results.push(filename);
        }
    }
    return results;
}

export function getCssReferencedInHtml(filePath) {
    fs.readFile(filePath, {
        encoding: 'utf-8'
    }, function (err, data) {
        if (!err) { // file found
            //console.log('received data: ' + data);
            getIdsAndClassesFromString(data);
        } else {
            console.log(err);
        }
    });
}

export function getIdsAndClassesFromString(lineWithCss) {
    console.log('linea: ' + lineWithCss);
    let idDoubleNormalComma = lineWithCss.replace(/(id="(.*?)(\"))/g, '')
    console.log(/(id="(.*?)(\"))/g.exec(lineWithCss)[2])
}
