"use strict";

const _ = require("lodash");

class DrlParser {

    constructor() {
        this.parser = require('./drl-parser.js');
    }

    parse(string) {
        let drl = this.parser.parse(string);
        normalize(drl);
        return drl;

    }
}

function normalize(drl) {
    for (let tool of drl.toolset) {
        let i = 0;
        let pp = tool.path[i++];
        while (i < tool.path.length) {
            let p = tool.path[i++];
            if (!p.x) {
                p.x = pp.x;
            }
            if (!p.y) {
                p.y = pp.y;
            }
            pp = p;
        }
    }
}

module.exports = DrlParser;