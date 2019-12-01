/* eslint-disable no-undef */
import assert from 'assert';
import {
    parseArgumentsIntoOptions,
} from '../src/cli/cli';
import promptForMissingOptions from '../src/cli/promptCLI';


describe('Exceptions test suite for CLI - arguments', () => {
    it('Audit should be true, and the rest should be on their default values', () => {
        let rawArguments = ['/usr/local/bin/node', '/usr/local/bin/implodeCss', '-a'];
        let received = parseArgumentsIntoOptions(rawArguments);
        assert.deepStrictEqual(received.audit, true);
        assert.deepStrictEqual(received.defaultOptions, false);
        assert.deepStrictEqual(received.fix, false);
        assert.deepStrictEqual(received.help, false);
        assert.deepStrictEqual(received.version, false);
        assert.deepStrictEqual(received.port, 4949);
        assert.deepStrictEqual(received.ignore, undefined);
        rawArguments = ['/usr/local/bin/node', '/usr/local/bin/implodeCss', '--audit'];
        received = parseArgumentsIntoOptions(rawArguments);
        assert.deepStrictEqual(received.audit, true);
    });


    it('Audit should be true, and the rest should be on their default values', () => {
        let rawArguments = ['/usr/local/bin/node', '/usr/local/bin/implodeCss', '-f'];
        let received = parseArgumentsIntoOptions(rawArguments);
        assert.deepStrictEqual(received.fix, true);
        assert.deepStrictEqual(received.audit, false);
        assert.deepStrictEqual(received.defaultOptions, false);
        assert.deepStrictEqual(received.help, false);
        assert.deepStrictEqual(received.version, false);
        assert.deepStrictEqual(received.port, 4949);
        assert.deepStrictEqual(received.ignore, undefined);
        rawArguments = ['/usr/local/bin/node', '/usr/local/bin/implodeCss', '--fix'];
        received = parseArgumentsIntoOptions(rawArguments);
        assert.deepStrictEqual(received.fix, true);
    });


    it('Folder to implode should be the actual if the user used a: \'.\'', () => {
        const actualDirectory = process.cwd();
        const rawArguments = ['/usr/local/bin/node', '/usr/local/bin/implodeCss', '.', '-f'];
        const received = parseArgumentsIntoOptions(rawArguments);
        promptForMissingOptions(received).then((options) => {
                assert.deepStrictEqual(options.folderToImplode, actualDirectory);
            })
            .catch(() => { // if not just fail the test
                assert.deepStrictEqual(false, true);
            });
    });
});
