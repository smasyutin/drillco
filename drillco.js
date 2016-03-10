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

    console.info(`took ${path.resolve(__dirname, options.options['source'])}`);

    const Parser = require('./drl_parser.js');
    const drl = (new Parser()).parse(
        fs.readFileSync(path.resolve(__dirname, options.options['source']), 'utf8')
    );
    console.log('...parsed');

    const Serializer = require('./out_serializer.js');
    const data = (new Serializer()).serialize(drl, {
        x: parseInt(options.options['x-offset']),
        y: parseInt(options.options['y-offset'])
    });
    console.log('...converted');

    fs.writeFileSync(path.resolve(__dirname, options.options['target']), data, 'utf8');

    console.info(`saved to ${path.resolve(__dirname, options.options['source'])}`);
} catch (e) {
    console.error(e);
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
