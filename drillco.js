"use strict";

const argv = require( 'yargs')
    .demand(['source', 'target'])
    .boolean('auto-scale').default('auto-scale', true)
    .default('x', 25000)
    .default('y', 63000)
    .argv;

const fs = require('fs');
const path = require('path');

try {
    validate(argv);

    console.info(`took ${path.resolve(__dirname, argv['source'])}`);

    const Parser = require('./drl_parser.js');
    const drl = (new Parser()).parse(
        fs.readFileSync(path.resolve(__dirname, argv['source']), 'utf8')
    );
    console.log('...parsed');

    const Serializer = require('./out_serializer.js');
    const data = (new Serializer()).serialize(drl, {
        x: parseInt(argv['x']),
        y: parseInt(argv['y']),
        scale: argv['auto-scale']
    });
    console.log('...converted');

    fs.writeFileSync(path.resolve(__dirname, argv['target']), data, 'utf8');

    console.info(`saved to ${path.resolve(__dirname, argv['source'])}`);
} catch (e) {
    console.error(e);
    process.exit(1);
}

function validate(options) {
    fileExists(path.resolve(__dirname, options['source']));
    isNotEmpty(options['target']);
    isNumeric(options['x']);
    isNumeric(options['y']);
}

function fileExists(file) {
    fs.accessSync(file, fs.F_OK);
}

function isNumeric(n) {
    if(!/^\d+$/.test(n)) {
        throw new Error(`${n} is not a number`);
    }
}

function isNotEmpty(string) {
    if (!string || string.trim() == '') {
        throw new Error('target cannot be empty');
    }
}
