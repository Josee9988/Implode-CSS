/* eslint-disable no-undef */ /* eslint-disable prefer-spread */
/**
 * @file dataController is a file that contains all the function that the index.html needs
 * in order to read the data from the file and print it to the table.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS
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
    const dataTable = document.getElementById('dataTable');
    const {
        path,
    } = content;
    const tr = document.createElement('tr');
    tr.innerHTML = createUnusedTemplate(content.css, path);
    dataTable.appendChild(tr);
}


window.addEventListener('load', () => {
    const unusedCss = [].concat.apply([], contents); // FROM 2D array to 1D

    // Creates every element in the table asynchronously
    unusedCss.forEach((content) => {
        createElementInTable(content);
    });

    // Remove the loader with an animation made in CSS.
    document.getElementById('loader').classList.add('hidden');

    // Show information about the number of unused selectors found.
    document.getElementById('totalSelectors').innerText = `${unusedCss.length}`;
});
