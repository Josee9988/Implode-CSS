import arg from 'arg';
import confirm from '@inquirer/confirm';
import exitCodes from './exitCodes';
import promptForMissingOptions from './promptCLI';
const mainFile = require('./main');
const informationCLI = require('./informationCLI');


function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        '--audit': Boolean,
        '--fix': Boolean,
        '--yes': Boolean,
        '--help': Boolean,
        '--version': Boolean,
        '-a': '--audit',
        '-f': '--fix',
        '-y': '--yes',
        '-h': '--help',
        '-v': '--version'
    }, {
        argv: rawArgs.slice(2),
    })
    return {
        defaultOptions: args['--yes'] || false,
        audit: args['--audit'] || false,
        fix: args['--fix'] || false,
        help: args['--help'] || false,
        version: args['--version'] || false,
        folderToImplode: args._[0],
    }
}



export async function cli(args) {
    let options;
    try {
        options = parseArgumentsIntoOptions(args);
    } catch (error) {
        exitCodes(400, args);
    }
    if (!options.help && !options.version) {
        options = await promptForMissingOptions(options);
        informationCLI.showOptions(options);

        if (options.audit) { // if the user wants to audit
            await mainFile.auditCode(options.folderToImplode);
            console.log('AUDITING');
        } else if (options.fix) { // if the user wants to fix
            const answer = await confirm({
                message: 'Do you want to fix your data, please do a backup first?',
                default: true,
            });
            if (answer === true) { // if the user wants to continue
                //await mainFile.fixCode(options.folderToImplode);
                console.log('FIXING');
            } else { // if the user cancelled the operation we will leave
                exitCodes(200);
            }
        }

    } else if (options.help) { // if the user specified help
        informationCLI.showHelp();
    } else if (options.version) { // if the user specified version
        informationCLI.showVersion();
    }
}
