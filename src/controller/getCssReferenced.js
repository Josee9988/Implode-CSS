/**
 * @file getCssReferenced is a file that contains functions in order to obtain
 * classes and ids from HTML or PHP files.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0
 * @link https://github.com/Josee9988/Implode-CSS repository.
 * @link https://github.com/Josee9988/Implode-CSS/issues issues or enhancements.
 */

/* eslint-disable consistent-return */
import fs from 'fs';


/**
 * Summary: function that receives a line with HTML and checks if it contains a ID.
 *
 * @param {String} lineWithCss line with css, to test if there is an id in it.
 * @return {String} if it found an ID, or null.
 */
export function getIdsFromString(lineWithCss) {
    const idFound = lineWithCss.match(/(id="(.*?)("))|(id='(.*?)('))|(id=`(.*?)(`))/g);
    if (idFound !== null) {
        return idFound.toString().substr(4, idFound.toString().length - 5);
    }
}


/**
 * Summary: function that receives a line with HTML and checks if it contains a class.
 *
 * @param {String} lineWithCss line with css, to test if there is an class in it.
 * @return {String} if it found an CLASS, or null.
 */
export function getClassFromString(lineWithCss) {
    const classFound = lineWithCss.match(/(class="(.*?)("))|(class='(.*?)('))|(class=`(.*?)(`))/g);
    if (classFound !== null) {
        return classFound.toString().substr(7, classFound.toString().length - 8);
    }
}


/**
 * Summary: a function that reads line by line the received path looks for ids in the line.
 *
 * @param {String} filePath path to read line by line.
 * @return {Array.String} array of found ids.
 */
export function getIdsReferencedInHtml(filePath) {
    let ids = [];
    fs.readFileSync(filePath, 'utf-8').split(/\r?\n/).forEach((line) => {
        if (getIdsFromString(line) !== undefined) {
            ids = ids.concat(getIdsFromString(line));
        }
    });
    return ids;
}


/**
 * Summary: a function that reads line by line the received path looks for classes in the line.
 *
 * @param {String} filePath path to read line by line.
 * @return {Array.String} array of found classes.
 */
export function getClassesReferencedInHtml(filePath) {
    let classes = [];
    fs.readFileSync(filePath, 'utf-8').split(/\r?\n/).forEach((line) => {
        const result = getClassFromString(line);
        if (result !== undefined) {
            classes = classes.concat(result.split(' '));
        }
    });
    return classes;
}


export default getIdsReferencedInHtml;
