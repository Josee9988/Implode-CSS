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

class UnusedSelector {
    constructor(private css: string, private path: string) { }
    getCss(): string {
        return this.css;
    }
    getPath(): string {
        return this.path;
    }
}

class GeneralInfo {
    constructor(private htmlPhpLength: string, private cssFilesLength: string, private idsFoundLength: string, private classesFoundLength: string) { }
    gethtmlPhpLength(): string {
        return this.htmlPhpLength;
    }
    getcssFilesLength(): string {
        return this.cssFilesLength;
    }
    getidsFoundLength(): string {
        return this.idsFoundLength;
    }
    getclassesFoundLength(): string {
        return this.classesFoundLength;
    }
}

/**
 * Summary: Function that receives an unused style and its path and then
 * returns the result as a tds of a table.
 *
 * @param {String} element unused style to be printed.
 * @param {String} path path of the unused style.
 * @return {String} to be printed in the tr of the table.
 */
function createUnusedTemplate<T extends UnusedSelector>(cssAndPath: T): string {
    let type = '';
    if (cssAndPath.getCss().substr(0, 1) === '#') {
        // if ii is an id:
        type = 'Id';
    } else {
        type = 'Class';
    }
    return `<td>${type}</td>
            <td>${cssAndPath.getCss().substr(1)}</td>
            <td>${cssAndPath.getPath()}</td>`;
}

/**
 * Summary: finds its path, if it is an ID or a CLASS and the name of the css selector and
 * prints it in the main table.
 *
 * @async
 * @param {Object} content with a path and a CSS selector.
 * @return {void}
 */
function createElementInTable<T extends UnusedSelector>(cssAndPath: T): void {
    const dataTable = document.getElementById('dataTable') as HTMLElement;
    const tr = document.createElement('tr');
    tr.innerHTML = createUnusedTemplate(cssAndPath);
    dataTable.appendChild(tr);
}

/**
 * Summary: a function that prints all the empty files found.
 *
 * @param {Object} emptyFiles content with all the empty files found.
 * @return {array}
 */
function printEmptyFiles(emptyFiles: string): string[] {
    const emptyCss = document.getElementById('emptyCss') as HTMLElement;
    const emptyCssFiles = [];
    emptyCssFiles.push(emptyFiles);
    emptyCss.innerHTML += `<li class="list-group-item list-group-item-action list-group-item-danger"><b>${emptyFiles}</b></li>`;
    return emptyCssFiles;
}

/**
 * Summary: a function that prints the number of:
 * html/php files found, css files found, ids found and selectors found.
 *
 * @param {Object} content the object with all the lengths to print.
 * @return {void}
 */
function printGeneralInfoFound<T extends GeneralInfo>(information: T): void {
    const htmlFilesLength = document.getElementById('htmlFilesLength') as HTMLElement;
    const cssFilesLength = document.getElementById('cssFilesLength') as HTMLElement;
    const idsFound = document.getElementById('idsFound') as HTMLElement;
    const classesFound = document.getElementById('classesFound') as HTMLElement;
    htmlFilesLength.innerText = information.gethtmlPhpLength();
    cssFilesLength.innerText = information.getcssFilesLength();
    idsFound.innerText = information.getidsFoundLength();
    classesFound.innerText = information.getclassesFoundLength();
}

window.addEventListener('load', () => {
    const errorfound = document.getElementById('errorfound') as HTMLElement;
    const loader = document.getElementById('loader') as HTMLElement;
    const totalSelectors = document.getElementById('totalSelectors') as HTMLElement;
    const emptyLength = document.getElementById('emptyLength') as HTMLElement;

    //@ts-ignore
    const content: Array<any> = contents;
    let emptyCssFiles: any = [];
    const unusedCss = [].concat.apply([], content); // FROM 2D array to 1D

    try { // gathers all information. Creates every element in the table.
        for (let element of unusedCss) {
            const content: any = element;
            if (!content.emptyFiles && !content.htmlPhpLength) { // default unused styles
                createElementInTable(new UnusedSelector(content.css, content.path));
            }
        };

        // @ts-ignore // Print all the empty files found.
        emptyCssFiles = printEmptyFiles(unusedCss[unusedCss.length - 2].emptyFiles);

        // @ts-ignore Print the number of HTML/PHP files and number of selectors found.
        printGeneralInfoFound(new GeneralInfo(unusedCss[unusedCss.length - 1].htmlPhpLength, unusedCss[unusedCss.length - 1].cssFilesLength, unusedCss[unusedCss.length - 1].idsFoundLength, unusedCss[unusedCss.length - 1].classesFoundLength));
    } catch (err) { // if there is an error.
        errorfound.innerHTML = `Error found:<br>${err}<br><hr>`;
        console.error(err);
    }

    // Remove the loader with an animation made in CSS.
    loader.classList.add('hidden');

    // Show information about the number of unused selectors found.
    totalSelectors.innerText = unusedCss !== null ? unusedCss.length.toString() : '0' as string;

    // Show the number of files that are not used:
    emptyLength.innerText = emptyCssFiles !== null ? emptyCssFiles.length.toString() : '0' as string;
});
