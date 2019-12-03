import fs from 'fs';

export default function removeUnused(cssFiles, styles) {
    let fileReaded;
    cssFiles.forEach((file) => {
        fileReaded = fs.readFileSync(file, 'utf-8'); // reads the file
        styles.forEach((stylesPath) => { // foreach of every path
            stylesPath.forEach((styleToRemove) => { // gets every element with X.css and X.path
                const regex = new RegExp(`(?:^|}|\\.|\\#)\\s*${styleToRemove.css.substr(1)}\\s*(\\{|\\:|\\>|\\s|\\+|\\~)([^}]*)}`);
                fileReaded = fileReaded.replace(regex, '');
            });
        });
        // writes in file and removes blank lines
        fs.writeFileSync(file, fileReaded.replace(/^[ \t\n]*$/gm, ''));
    });
}
