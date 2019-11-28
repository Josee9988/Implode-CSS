/* eslint-disable prefer-arrow-callback */
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const port = 4949;

export function runHttpServer() {
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

    http.createServer((req, res) => {
        // parse URL
        const parsedUrl = url.parse(req.url);

        const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[/\\])+/, '');
        let pathname = path.join(__dirname, sanitizePath);
        pathname += 'index.html';
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
                    res.end(`Error getting the file: ${err}.`);
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
    }).listen(parseInt(port, 10));

    console.log(`\tServer running in http://localhost:${port}`);
    console.log(`\tServer running in http://127.0.0.1:${port}`);
}

export default runHttpServer;
