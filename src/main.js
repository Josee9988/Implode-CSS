/**
 * @file main.js, it includes the logic of the package
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 */
import chalk from 'chalk';
/*import path from 'path';
import fs from 'fs';*/
const path = require('path'),
    fs = require('fs');
const readline = require('readline');



export async function showOptions(options) {
    process.stdout.write("Your ");
    process.stdout.write(chalk.yellow("options"));
    process.stdout.write(" are:\n");
    process.stdout.write("Root folder to search CSS's, HTML's and PHP's: ");
    console.log(chalk.bold.green(options.folderToImplode));
    process.stdout.write("Audit (not performing any action, just showing the unused classes): ");
    console.log(chalk.bold.green(options.audit));
    process.stdout.write("Fix (removed unused CSS ids and classes): ");
    console.log(chalk.bold.green(options.fix) + chalk.white('\n'));

    //console.log(files);
}

export async function auditCode(folderToImplode) {
    const htmlFiles = findFilesInDir(folderToImplode, '.html');
    const phpFiles = findFilesInDir(folderToImplode, '.php');


    const htmlPhpFiles = htmlFiles.concat(phpFiles);
    const cssFiles = findFilesInDir(folderToImplode, '.html');
    for (let i = 0; i < htmlPhpFiles.length; i++) {
        console.log('a');
        console.log(getCssReferencedInHtml(htmlPhpFiles[i]));
    }
    // get the css:
}

function getCssReferencedInHtml(filePath) {
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

function getIdsAndClassesFromString(lineWithCss) {
    console.log('linea: ' + lineWithCss);
    let idDoubleNormalComma = lineWithCss.replace(/(id="(.*?)(\"))/g, '')
    console.log(/(id="(.*?)(\"))/g.exec(lineWithCss)[2])
}

/**
 * Find all files recursively in specific folder with specific extension, e.g:
 * findFilesInDir('./src', '.html') => ['./src/a.html','./src/build/index.html']
 * @param  {String} startPath    Relative path to the root folder.
 * @param  {String} filter       Extension name, e.g: '.html' lowercase letters.
 * @return {Array}               Result files with absolute path in an array.
 */
function findFilesInDir(startPath, filter) {

    var results = [];

    if (!fs.existsSync(startPath)) {
        console.error(chalk.bold.red('The given path does not exists or there is a lack of permissions'));
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





export default showOptions;
exports.auditCode = auditCode;
