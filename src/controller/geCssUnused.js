import fs from 'fs';

export async function getUnusedCss(cssFiles, idsFoundHTML, classFoundHTML) {
    let idsInCss = [];
    let classInCss = [];
    const unusedArray = [];
    let classNotUsed = [];
    let idsNotUsed = [];


    // Find all css and classes created (we do not know if used yet)
    for (let i = 0; i < cssFiles.length; i++) {
        const texto = fs.readFileSync(cssFiles[i], 'utf-8').split(/\r?\n/).join('');
        idsInCss = idsInCss.concat(texto.match(/#-?[_a-zA-Z]+[_a-zA-Z0-9-]*(?=[^}]*\{)/g));
        classInCss = classInCss.concat(texto.match(/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*(?=[^}]*\{)/g));
    }

    // check if the ids are used if not add the selector to 'idsNotUsed'
    for (let i = 0; i < idsInCss.length; i++) {
        if (idsFoundHTML.indexOf(idsInCss[i].substr(1)) === -1) { // if it hasn't been used
            idsNotUsed = idsNotUsed.concat(idsInCss[i]); // adds it to the array of unused
        }
    }

    // check if the classes are used if not add the selector to 'classNotUsed'
    for (let i = 0; i < classInCss.length; i++) {
        if (classFoundHTML.indexOf(classInCss[i].substr(1)) === -1) { // if it hasn't been used
            classNotUsed = classNotUsed.concat(classInCss[i]); // adds it to the array of unused
        }
    }

    unusedArray.push(idsNotUsed, classNotUsed);
    return unusedArray;
}

export default getUnusedCss;
