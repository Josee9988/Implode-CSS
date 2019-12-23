/* eslint-disable no-undef */ /* eslint-disable prefer-spread */
/**
 * @file dataController is a file that contains all the function that the index.html needs
 * in order to read the data from the file and print it to the table.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS repository.
 * @link https://github.com/Josee9988/Implode-CSS/issues issues or enhancements.
 */
var UnusedSelector = /** @class */ (function () {
    function UnusedSelector(css, path) {
        this.css = css;
        this.path = path;
    }
    UnusedSelector.prototype.getCss = function () {
        return this.css;
    };
    UnusedSelector.prototype.getPath = function () {
        return this.path;
    };
    return UnusedSelector;
}());
var GeneralInfo = /** @class */ (function () {
    function GeneralInfo(htmlPhpLength, cssFilesLength, idsFoundLength, classesFoundLength) {
        this.htmlPhpLength = htmlPhpLength;
        this.cssFilesLength = cssFilesLength;
        this.idsFoundLength = idsFoundLength;
        this.classesFoundLength = classesFoundLength;
    }
    GeneralInfo.prototype.gethtmlPhpLength = function () {
        return this.htmlPhpLength;
    };
    GeneralInfo.prototype.getcssFilesLength = function () {
        return this.cssFilesLength;
    };
    GeneralInfo.prototype.getidsFoundLength = function () {
        return this.idsFoundLength;
    };
    GeneralInfo.prototype.getclassesFoundLength = function () {
        return this.classesFoundLength;
    };
    return GeneralInfo;
}());
/**
 * Summary: Function that receives an unused style and its path and then
 * returns the result as a tds of a table.
 *
 * @param {String} element unused style to be printed.
 * @param {String} path path of the unused style.
 * @return {String} to be printed in the tr of the table.
 */
function createUnusedTemplate(cssAndPath) {
    var type = '';
    if (cssAndPath.getCss().substr(0, 1) === '#') {
        // if ii is an id:
        type = 'Id';
    }
    else {
        type = 'Class';
    }
    return "<td>" + type + "</td>\n            <td>" + cssAndPath.getCss().substr(1) + "</td>\n            <td>" + cssAndPath.getPath() + "</td>";
}
/**
 * Summary: finds its path, if it is an ID or a CLASS and the name of the css selector and
 * prints it in the main table.
 *
 * @async
 * @param {Object} content with a path and a CSS selector.
 * @return {void}
 */
function createElementInTable(cssAndPath) {
    var dataTable = document.getElementById('dataTable');
    var tr = document.createElement('tr');
    tr.innerHTML = createUnusedTemplate(cssAndPath);
    dataTable.appendChild(tr);
}
/**
 * Summary: a function that prints all the empty files found.
 *
 * @param {Object} emptyFiles content with all the empty files found.
 * @return {array}
 */
function printEmptyFiles(emptyFiles) {
    var emptyCss = document.getElementById('emptyCss');
    var emptyCssFiles = [];
    emptyCssFiles.push(emptyFiles);
    emptyCss.innerHTML += "<li class=\"list-group-item list-group-item-action list-group-item-danger\"><b>" + emptyFiles + "</b></li>";
    return emptyCssFiles;
}
/**
 * Summary: a function that prints the number of:
 * html/php files found, css files found, ids found and selectors found.
 *
 * @param {Object} content the object with all the lengths to print.
 * @return {void}
 */
function printGeneralInfoFound(information) {
    var htmlFilesLength = document.getElementById('htmlFilesLength');
    var cssFilesLength = document.getElementById('cssFilesLength');
    var idsFound = document.getElementById('idsFound');
    var classesFound = document.getElementById('classesFound');
    htmlFilesLength.innerText = information.gethtmlPhpLength();
    cssFilesLength.innerText = information.getcssFilesLength();
    idsFound.innerText = information.getidsFoundLength();
    classesFound.innerText = information.getclassesFoundLength();
}
window.addEventListener('load', function () {
    var errorfound = document.getElementById('errorfound');
    var loader = document.getElementById('loader');
    var totalSelectors = document.getElementById('totalSelectors');
    var emptyLength = document.getElementById('emptyLength');
    //@ts-ignore
    var content = contents;
    var emptyCssFiles = [];
    var unusedCss = [].concat.apply([], content); // FROM 2D array to 1D
    try { // gathers all information. Creates every element in the table.
        for (var _i = 0, unusedCss_1 = unusedCss; _i < unusedCss_1.length; _i++) {
            var content_1 = unusedCss_1[_i];
            if (!content_1.emptyFiles && !content_1.htmlPhpLength) { // default unused styles
                createElementInTable(new UnusedSelector(content_1.css, content_1.path));
            }
        }
        ;
        // Print all the empty files found.
        emptyCssFiles = printEmptyFiles(unusedCss[unusedCss.length - 2].emptyFiles);
        // Print the number of HTML/PHP files and number of selectors found.
        printGeneralInfoFound(new GeneralInfo(unusedCss[unusedCss.length - 1].htmlPhpLength, unusedCss[unusedCss.length - 1].cssFilesLength, unusedCss[unusedCss.length - 1].idsFoundLength, unusedCss[unusedCss.length - 1].classesFoundLength));
    }
    catch (err) { // if there is an error.
        errorfound.innerHTML = "Error found:<br>" + err + "<br><hr>";
        console.error(err);
    }
    // Remove the loader with an animation made in CSS.
    loader.classList.add('hidden');
    // Show information about the number of unused selectors found.
    totalSelectors.innerText = unusedCss !== null ? unusedCss.length.toString() : '0';
    // Show the number of files that are not used:
    emptyLength.innerText = emptyCssFiles !== null ? emptyCssFiles.length.toString() : '0';
});
