"use strict";

const _ = require('lodash');
const zpad = require('zpad');

const toolPadding = 2;
const coordinatePadding = 6;
const lineNumberPadding = 4;

class OutSerializer {
    constructor() {
    }

    serialize(drl, offset) {
        if (offset.scale) {
            let stat = statistics(drl, offset);
            offset = {
                x: offset.x - (stat.maxX + stat.minX) / 2,
                y: offset.y + stat.minY
            };
        }

        let result = '%% {' +
            drl.header.map((h) => {
                return `T${zpad(h.tool, toolPadding)}=${h.c.toFixed(1)}`;
            }).join(', ') +
            ' this is 0}\nXYM50\n';

        let toolset = _.reduce(drl.toolset.map((t) => {
            let path = t.path.map((p) => {
                return `X+${zpad(offset.x + p.x, coordinatePadding)}Y+${zpad(offset.y - p.y,coordinatePadding)}`;
            });
            path[0] = `${path[0]}T${zpad(t.tool, toolPadding)}`;
            return path;
        }), (result, tool) => {
            return result.concat(tool)
        }, []);

        for (let i = 0; i < toolset.length; i++) {
            toolset[i] = `N${zpad(i, lineNumberPadding)}${toolset[i]}`;
        }

        result += toolset.join('\n') + '\nXYM30';
        return result;
    }
}

function statistics(drl, offset) {
    return _.reduce(_.flatMap(drl.toolset, (tool) => {
        return tool.path;
    }), (stat, path) => {
        if (path.x > stat.maxX) {
            stat.maxX = path.x;
        }
        if (path.x < stat.minX) {
            stat.minX = path.x;
        }
        if (path.y < stat.minY) {
            stat.minY = path.y;
        }
        return stat;
    }, { minX: offset.x, maxX: 0, minY: offset.y });
}

module.exports = OutSerializer;