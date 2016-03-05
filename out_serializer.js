"use strict";

const zpad = require("zpad");

const toolPadding = 2;
const coordinatePadding = 6;
const lineNumberPadding = 4;

class OutSerializer {
    constructor() {
    }

    serialize(drl, offset) {
        let result = '%% {' +
            drl.header.map((h) => {
                return `T${zpad(h.tool, toolPadding)}=${h.c.toFixed(1)}`;
            }).join(', ') +
            ' this is 0}\nXYM50\n';

        let toolset = flatten(drl.toolset.map((t) => {
            let path = t.path.map((p) => {
                return `X+${zpad(offset.x + p.x, coordinatePadding)}Y+${zpad(offset.y - p.y,coordinatePadding)}`;
            });
            path[0] = `${path[0]}T${zpad(t.tool, toolPadding)}`;
            return path;
        }));

        for (let i = 0; i < toolset.length; i++) {
            toolset[i] = `N${zpad(i, lineNumberPadding)}${toolset[i]}`;
        }

        result += toolset.join('\n') + '\nXYM30';
        return result;
    }
}

function flatten(x) {
    return x.reduce(function(a, b) {
        return a.concat(b);
    }, []);
}

module.exports = OutSerializer;