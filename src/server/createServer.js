/**
 * @file createServer contain the function to run a HTTP server.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS repository.
 * @link https://github.com/Josee9988/Implode-CSS/issues issues or enhancements.
 */

import chalk from 'chalk';
import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';


/**
 * Summary: runs an HTTP server in localhost.
 *
 * @param {Number} port port to run the server, by default 4949.
 * @return {Promise} if the server is created or not.
 */
export function runHttpServer(port = 4949) {
    const mimeType = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.eot': 'appliaction/vnd.ms-fontobject',
        '.ttf': 'aplication/font-sfnt',
    };

    const server = http.createServer((req, res) => {
        // parse URL
        const parsedUrl = url.parse(req.url);

        const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[/\\])+/, '');
        const pathname = path.join(__dirname, '/public', sanitizePath);
        fs.exists(pathname, (exist) => {
            if (!exist) {
                // if the file is not found, return 404
                res.statusCode = 404;
                res.end(`File ${pathname} not found!`);
                return;
            }

            // read file from file system
            fs.readFile(pathname, (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(`Error getting the file: ${err} at file ${pathname}.`);
                } else {
                    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                    const {
                        ext,
                    } = path.parse(pathname);
                    // if the file is found, set Content-type and send data
                    res.setHeader('Content-type', mimeType[ext] || 'text/plain');
                    res.end(data);
                }
            });
        });
    });
    // eslint-disable-next-line no-new
    return new Promise((resolve, reject) => {
        server.listen(port, () => {
            console.log('\n  Check your results at:');
            console.log(`    - ${chalk.rgb(30, 170, 119).bold(`http://localhost:${port}/index.html`)}`);
            console.log(`    - ${chalk.rgb(30, 170, 119).bold(`http://127.0.0.1:${port}/index.html`)}`);
            resolve();
        }).on('error', (err) => {
            server.close(err);
            reject();
        });
    });
}


/**
 * Summary: Writes in a file all the data to be outputed in the index.html table.
 *
 * @param {Array} unusedStyles all the unused styles.
 * @return {Boolean} True if all OK, else an error.
 */
export function writeDataFile(unusedStyles) {
    const pathname = path.join(__dirname, '../server/public/assets/js/data.js');
    try {
        fs.writeFileSync(pathname, `const contents = ${JSON.stringify(unusedStyles)}`);
        return true;
    } catch (err) {
        return err;
    }
}

export default runHttpServer;
