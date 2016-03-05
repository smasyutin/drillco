"use strict";

const argv = require( 'argv' );

const DrlParser = require('./drl_parser.js');
const OutTranfromer = require('./out_serializer.js');

const options = argv.option([
    {
        name: 'source',
        short: 's',
        type: 'string,path'
    },
    {
        name: 'output',
        short: 'o',
        type: 'string,path'
    },
    {
        name: 'x-offset',
        short: 'x',
        type: 'int'
    },
    {
        name: 'y-offset',
        short: 'y',
        type: 'int'
    },
]).run();

const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve(__dirname, options.options['source']), 'utf8');

const drl = (new DrlParser()).parse(content);
const out = (new OutTranfromer()).serialize(drl, { x: options.options['x-offset'], y: options.options['y-offset'] });

fs.writeFileSync(path.resolve(__dirname, options.options['output']), out, 'utf8');
