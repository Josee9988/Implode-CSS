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
