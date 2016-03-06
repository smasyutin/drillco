"use strict";

const argv = require( 'argv' );
const options = argv.option([
    {
        name: 'source',
        short: 's',
        type: 'string, path'
    },
    {
        name: 'target',
        short: 'o',
        type: 'string, path'
    },
    {
        name: 'x-offset',
        short: 'x',
        type: 'string'
    },
    {
        name: 'y-offset',
        short: 'y',
        type: 'string'
    }
]).run();

const fs = require('fs');
const path = require('path');

try {
    validate(options.options);

    const Parser = require('./drl_parser.js');
    const drl = (new Parser()).parse(
        fs.readFileSync(path.resolve(__dirname, options.options['source']), 'utf8')
    );

    const Serializer = require('./out_serializer.js');
    fs.writeFileSync(path.resolve(__dirname, options.options['target']),
        (new Serializer()).serialize(drl, {
            x: parseInt(options.options['x-offset']),
            y: parseInt(options.options['y-offset'])
        }),
        'utf8');
} catch (e) {
    console.log(e);
    process.exit(1);
}

function validate(options) {
    fileExists(path.resolve(__dirname, options['source']));
    isNotEmpty(options['target']);
    isNumeric(options['x-offset']);
    isNumeric(options['y-offset']);
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
