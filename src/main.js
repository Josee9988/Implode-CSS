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

export async function fixCode(folderToImplode) {

}









exports.auditCode = auditCode;
exports.fixCode = fixCode;
