/**
 * @file CLI contains the main commands to receive the raw arguments, interpret
 * it and then calls to the proper functions given by the user.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0
 * @link https://github.com/Josee9988/Implode-CSS repository.
 * @link https://github.com/Josee9988/Implode-CSS/issues issues or enhancements.
 */

import arg from 'arg';
import confirm from '@inquirer/confirm';
import notifyForUpdates from './notifyForUpdates';
import exitCodes from '../Exceptions/exitCodes';
import promptForMissingOptions from './promptCLI';
import {
    showOptions,
    showHelp,
    showVersion,
} from './informationCLI';
import createProcessesHandlers from '../Exceptions/processHandlers';

const ImplodeCssClass = require('../main');


/**
 * Summary: parseArgumentsIntoOptions receives the raw arguments given by
 * the user and transform them into an object that will be returned.
 *
 * @param {object} rawArgs arguments directly given by the user.
 * @return {object} options as a JavaScript object.
 */
export function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        '--audit': Boolean,
        '--fix': Boolean,
        '--yes': Boolean,
        '--help': Boolean,
        '--version': Boolean,
        '--port': Number,
        '--ignoreFolders': String,
        '-a': '--audit',
        '-f': '--fix',
        '-y': '--yes',
        '-h': '--help',
        '-v': '--version',
        '-p': '--port',
        '-i': '--ignoreFolders',
    }, {
        argv: rawArgs.slice(2),
    });
    return {
        defaultOptions: args['--yes'] || false,
        audit: args['--audit'] || false,
        fix: args['--fix'] || false,
        help: args['--help'] || false,
        version: args['--version'] || false,
        port: args['--port'] || 4949,
        ignore: args['--ignoreFolders'] || undefined,
        folderToImplode: args._[0],
    };
}


/**
 * Summary: cli is a funcion called from 'bin/implodeCss.js' that receives the
 * arguments given by the user, and makes all the function calls ordered
 * by these arguments.
 *
 * @param {object} rawArgs arguments directly given by the user.
 * @return {void}
 */
export async function cli(rawArgs) {
    createProcessesHandlers();
    notifyForUpdates();
    let options;
    try {
        options = parseArgumentsIntoOptions(rawArgs);
    } catch (err) {
        showHelp();
        exitCodes(400, rawArgs, err);
    }
    const ImplodeCss = new ImplodeCssClass(options);

    if (!options.help && !options.version) {
        options = await promptForMissingOptions(options);
        showOptions(options);
        if (options.audit) { // if the user wants to audit
            ImplodeCss.auditCode(options);
        } else if (options.fix) { // if the user wants to fix
            const answer = await confirm({
                message: 'Do you want to fix your data? Remember that this feature is beta and may not be perfect is some scenarios, please do a backup first.',
                default: true,
            });
            if (answer === true) { // if the user wants to continue
                ImplodeCss.fixCode(options);
            } else { // if the user cancelled the operation we will leave
                exitCodes(200);
            }
        }
    } else if (options.help) { // if the user specified help
        showHelp();
    } else if (options.version) { // if the user specified version
        showVersion();
    }
}

export default cli;
