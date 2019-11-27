#!/usr/bin/env node

/**
 * @file implodeCss is the root of the package, it is called from the
 * terminal, uses node in order to run, and it calles the function CLI,
 * from 'src/' and requires esm. Do not touch this file unless you know
 * what you are doing.
 *
 * @author Jose Gracia Berenguer
 * @since 1.0.0.
 * @link https://github.com/Josee9988/Implode-CSS
 */


// eslint-disable-next-line no-global-assign
require = require('esm')(module /* , options */);

require('../src/cli').cli(process.argv);
