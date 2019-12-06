/**
 * @file cli contains the main commands to receive the raw arguments, interpret
 * it and then calls to the proper functions given by the user.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0
 * @link https://github.com/Josee9988/Implode-CSS
 */

import arg from 'arg';
import confirm from '@inquirer/confirm';
import exitCodes from '../Exceptions/exitCodes';
import promptForMissingOptions from './promptCLI';
import testPath from '../controller/testPath';
import {
    auditCode,
    fixCode,
} from '../main';
import {
    showOptions,
    showHelp,
    showVersion,
} from './informationCLI';


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
    let options;
    try {
        options = parseArgumentsIntoOptions(rawArgs);
    } catch (error) {
        exitCodes(400, rawArgs);
    }
    if (!options.help && !options.version) {
        options = await promptForMissingOptions(options);
        showOptions(options);
        await testPath(options.folderToImplode);
        if (options.audit) { // if the user wants to audit
            await auditCode(options.folderToImplode, options.port, options.ignore);
        } else if (options.fix) { // if the user wants to fix
            const answer = await confirm({
                message: 'Do you want to fix your data? Remember that this feature is beta and may not be perfect is some scenarios, please do a backup first',
                default: true,
            });
            if (answer === true) { // if the user wants to continue
                await fixCode(options.folderToImplode, options.port, options.ignore);
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
