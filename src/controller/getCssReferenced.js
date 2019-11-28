import fs from 'fs';

// eslint-disable-next-line consistent-return
export function getIdsFromString(lineWithCss) {
    const idFound = lineWithCss.match(/(id="(.*?)("))|(id='(.*?)('))|(id=`(.*?)(`))/g);
    if (idFound !== null) {
        return idFound.toString().substr(4, idFound.toString().length - 6);
    }
}

// eslint-disable-next-line consistent-return
export function getClassFromString(lineWithCss) {
    const classFound = lineWithCss.match(/(class="(.*?)("))|(class='(.*?)('))|(class=`(.*?)(`))/g);
    if (classFound !== null) {
        return classFound.toString().substr(7, classFound.toString().length - 8);
    }
}

export function getIdsReferencedInHtml(filePath) {
    const ids = [];
    fs.readFileSync(filePath, 'utf-8').split(/\r?\n/).forEach((line) => {
        if (getIdsFromString(line) !== undefined) {
            ids.push(getIdsFromString(line));
        }
    });
    return ids;
}

export function getClassesReferencedInHtml(filePath) {
    const classes = [];
    fs.readFileSync(filePath, 'utf-8').split(/\r?\n/).forEach((line) => {
        const result = getClassFromString(line);
        if (result !== undefined) {
            classes.push(result.split(' '));
        }
    });
    return classes;
}


export default getIdsReferencedInHtml;
