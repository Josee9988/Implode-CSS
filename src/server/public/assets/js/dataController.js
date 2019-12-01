/**
 * @file dataController is a file that contains all the function that the index.html needs
 * in order to read the data from the file and print it to the table.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS
 */
/* eslint-disable prefer-spread */

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


window.addEventListener('load', () => {
    const dataTable = document.getElementById('dataTable');
    const unusedCss = [].concat.apply([], contents); // FROM 2D array to 1D

    unusedCss.forEach((content) => {
        const {
            path,
        } = content;
        const tr = document.createElement('tr');
        tr.innerHTML = createUnusedTemplate(content.css, path);
        dataTable.appendChild(tr);
    });

    // Remove the loader
    document.getElementById('loader').classList.add('hidden');

    // Show information about the results
    document.getElementById('totalSelectors').innerText = `${unusedCss.length}`;
});
