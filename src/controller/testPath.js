/**
 * @file testPath tests the permissions of the path
 * and if we have read and write permissions, if not it stops
 * the program and shows an output of the error.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0
 * @link https://github.com/Josee9988/Implode-CSS repository.
 * @link https://github.com/Josee9988/Implode-CSS/issues issues or enhancements.
 */

import fs from 'fs';
import exitCodes from '../Exceptions/exitCodes';


/**
 * Summary: tesPath analyzes a path and checks if it has read, write and or
 * if it exists, if not it stops the process and shows an error to the user.
 *
 * @async
 * @param {string} startPath path to test.
 * @return {void}
 */
export async function testPath(startPath) {
    // Directory exists
    if (!fs.existsSync(startPath)) {
        exitCodes(401, startPath);
    }

    // Directory read permissions
    try {
        fs.accessSync(startPath, fs.constants.R_OK);
    } catch (err) {
        exitCodes(402, startPath, err);
    }
}


/**
 * Summary: tesPath analyzes a path and checks if it has read, write and or
 * if it exists, if not it stops the process and shows an error to the user.
 *
 * @async
 * @param {string} startPath path to test.
 * @return {void}
 */
export async function testPathFile(startPath) {
    // File exists
    if (!fs.existsSync(startPath)) {
        exitCodes(401, startPath);
    }

    // Directory read permissions
    if (!fs.readFileSync(startPath)) {
        exitCodes(402, startPath);
    }

}

export default testPath;
