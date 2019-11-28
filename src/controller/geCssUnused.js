import fs from 'fs';

export async function getUnusedCss(cssFiles, idsFoundHTML, classFoundHTML) {
    let idsInCss = [];
    let classInCss = [];


    // Find all css and classes created (we do not know if used yet)
    for (let i = 0; i < cssFiles.length; i++) {
        const texto = fs.readFileSync(cssFiles[i], 'utf-8').split(/\r?\n/).join('');
        idsInCss = idsInCss.concat(texto.match(/#-?[_a-zA-Z]+[_a-zA-Z0-9-]*(?=[^}]*\{)/g));
        classInCss = classInCss.concat(texto.match(/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*(?=[^}]*\{)/g));
    }

    // check if the ids are used
    let idsNotUsed = [];
    for (let i = 0; i < idsInCss.length; i++) {
        if (idsFoundHTML.indexOf(idsInCss[i].substr(1)) === -1) { // if it doesn't found an used id...
            idsNotUsed = idsNotUsed.concat(idsInCss[i]); // adds it to the array of unused
        }
    }

    let classNotUsed = [];
    for (let i = 0; i < classInCss.length; i++) {
        if (classFoundHTML.indexOf(classInCss[i].substr(1)) === -1) { // if it doesn't found an used class...
            classNotUsed = classNotUsed.concat(classInCss[i]); // adds it to the array of unused
        }
    }
    console.log(idsNotUsed);
    console.log(classNotUsed);
}

export default getUnusedCss;
