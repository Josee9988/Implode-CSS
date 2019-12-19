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


/**
 * Summary: Function that receives an unused style and its path and then
 * returns the result as a tds of a table.
 *
 * @param {String} element unused style to be printed.
 * @param {String} path path of the unused style.
 * @return {String} to be printed in the tr of the table.
 */
function createUnusedTemplate(element, path) {
    let type = '';
    if (element.substr(0, 1) === '#') { // if ii is an id:
        type = 'Id';
    } else {
        type = 'Class';
    }
    return `<td>${type}</td>
            <td>${element.substr(1)}</td>
            <td>${path}</td>`;
}


/**
 * Summary: finds its path, if it is an ID or a CLASS and the name of the css selector and
 * prints it in the main table.
 *
 * @async
 * @param {Object} content with a path and a CSS selector.
 * @return {void}
 */
async function createElementInTable(content) {
    const {
        path,
    } = content;
    const tr = document.createElement('tr');
    tr.innerHTML = createUnusedTemplate(content.css, path);
    document.getElementById('dataTable').appendChild(tr);
}


/**
 * Summary: a function that prints all the empty files found.
 *
 * @param {Object} emptyFiles content with all the empty files found.
 * @return {array}
 */
function printEmptyFiles(emptyFiles) {
    const emptyCssFiles = [];
    emptyCssFiles.push(emptyFiles);
    document.getElementById('emptyCss').innerHTML += `<li class="list-group-item list-group-item-action list-group-item-danger"><b>${emptyFiles}</b></li>`;
    return emptyCssFiles;
}


/**
 * Summary: a function that prints the number of:
 * html/php files found, css files found, ids found and selectors found.
 *
 * @param {Object} content the object with all the lengths to print.
 * @return {void}
 */
function printGeneralInfoFound(content) {
    document.getElementById('htmlFilesLength').innerText = content.htmlPhpLength;
    document.getElementById('cssFilesLength').innerText = content.cssFilesLength;
    document.getElementById('idsFound').innerText = content.idsFoundLength;
    document.getElementById('classesFound').innerText = content.classesFoundLength;
}


window.addEventListener('load', () => {
    let emptyCssFiles = [];
    const unusedCss = [].concat.apply([], contents); // FROM 2D array to 1D

    try { // gathers all information.
        // Creates every element in the table
        unusedCss.forEach((content) => {
            if (!content.emptyFiles && !content.htmlPhpLength) { // default unused styles
                createElementInTable(content);
            }
        });
        // Print all the empty files found.
        emptyCssFiles = printEmptyFiles(unusedCss[unusedCss.length - 2].emptyFiles);

        // Print the number of HTML/PHP files and number of selectors found.
        printGeneralInfoFound(unusedCss[unusedCss.length - 1]);
    } catch (err) { // if there is an error.
        document.getElementById('errorfound').innerHTML = `Error found:<br>${err}<br><hr>`;
        console.error(err);
    }

    // Remove the loader with an animation made in CSS.
    document.getElementById('loader').classList.add('hidden');

    // Show information about the number of unused selectors found.
    document.getElementById('totalSelectors').innerText = `${unusedCss.length}`;

    // Show the number of files that are not used:
    document.getElementById('emptyLength').innerText = emptyCssFiles.length;
});
