{
    function flatten(x) {
        return x.reduce(function(a, b) {
            return a.concat(b);
        }, []).filter(function(a) {
            return a != null;
        });
    }
}

Program
    = _* header: Header* '%' _ toolset: Toolset .* {
        return {
            header: header.filter(function(h) { return !Array.isArray(h); }),
            toolset: toolset
    }
}

Header
    = ('T' t:Integer 'C' c:Float _) { return { tool: t, c: c }; }
    / CommentLine
    / SystemLine

Toolset
    = toolset:Tool* 'T00' { return toolset; }

Tool
    = 'T' t:Integer _ p:Path { return { tool: t, path: p }; }

Path
    = head:Action _ tail:(Action _)* {
        var result = [head];
        for (var i = 0; i < tail.length; i++) {
            var e = tail[i];
            result.push(e);
        }
        return flatten(result);
    }

Action
    = x:XAxis y:YAxis { return { x: x.x, y: y.y } }
    / XAxis
    / YAxis

XAxis
    = "X+" c:Integer { return { x: c }; }
    / Integer

YAxis
    = "Y+" c:Integer { return { y: c }; }
    / Integer

Integer "integer"
    = [0-9]+ { return parseInt(text()); }

Float "float"
    = [0-9]+.[0-9]* { return parseFloat(text()); }

SystemLine
    = 'M' Integer _
    / 'METRIC' (!_ .)* _

CommentLine
    = ';' (!_ .)* _

_
    = [\n\r]+ { return null; }
