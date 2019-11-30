/* eslint-disable prefer-spread */
/* eslint-disable no-undef */

function createUnusedTemplate(element) {
    let type = '';
    if (element.substr(0, 1) === '#') { // if ii is an id:
        type = 'Id';
    } else {
        type = 'Class';
    }
    return `<td>${type}</td>
            <td>${element.substr(1)}</td>`;
}


window.addEventListener('load', () => {
    const dataTable = document.getElementById('dataTable');
    unusedCss = [].concat.apply([], contents); // FROM 2D array to 1D

    unusedCss.forEach((content) => {
        const tr = document.createElement('tr');
        tr.innerHTML = createUnusedTemplate(content);
        dataTable.appendChild(tr);
    });

});
