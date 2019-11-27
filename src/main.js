/**
 * @file main.js, it includes the logic of the package
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS
 */

const getFilesAndStyles = require('./getFilesAndStyles');


export async function auditCode(folderToImplode) {

    const htmlPhpFiles = getFilesAndStyles.getArrayHtmlPhpPaths(folderToImplode);

    const cssFiles = getFilesAndStyles.findFilesInDir(folderToImplode, '.html');

    for (let i = 0; i < htmlPhpFiles.length; i++) {
        console.log('a');
        console.log(getFilesAndStyles.getCssReferencedInHtml(htmlPhpFiles[i]));
    }
    // get the css:
}

export async function fixCode(folderToImplode) {

}


exports.auditCode = auditCode;
exports.fixCode = fixCode;
