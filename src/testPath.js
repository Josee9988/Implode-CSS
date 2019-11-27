/**
 * @file testPath tests the permissions of the path
 * and if we have read and write permissions, if not it stops
 * the program and shows an output of the error.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0
 * @link https://github.com/Josee9988/Implode-CSS
 */

import fs from 'fs';
import exitCodes from './Exceptions/exitCodes';

/**
 * Summary: tesPath analyzes a path and checks if it has read, write and or
 * if it exists, if not it stops the process and shows an error to the user.
 *
 * @param {string} startPath path to test.
 * @return {void}
 */
export function testPath(startPath) {
    // Directory exists
    if (!fs.existsSync(startPath)) {
        exitCodes(401, startPath);
    }

    // Directory read permissions
    if (!fs.readdirSync(startPath)) {
        exitCodes(402, startPath);
    }

    // Directory write permissions
    fs.access(startPath, fs.W_OK, () => {
        exitCodes(403, startPath);
    });
}

export default testPath;