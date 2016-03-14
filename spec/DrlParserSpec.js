const DrlParser = require('../drl_parser.js');

describe("DrlParser", () => {
    let parser;

    beforeAll(() => {
            parser = new DrlParser();
    });

    it("empty drl parser should fail", () => {
        expect(() => {
            parser.parse('');
        }).toThrowError(Error);
    });

    it("test real content", () => {
        expect(
            parser.parse('M48\n;FILE_FORMAT=4:2\nMETRIC,TZ,0000.00\n;TYPE=NON_PLATED\n' +
                'T01C3.00\nT02C6.20\n%\n' +
                'T01\nX+5925Y+34420\nY+42420\nX+12175\n' +
                'T02\nX+7500Y+34925\nX+9000Y+38425\nX+7500Y+41825\nX+10500Y+34925\nY+41825\n' +
                'T00\nM30\n')
        ).toEqual(
            {
                "header": [
                    {
                        "tool": 1,
                        "c": 3
                    },
                    {
                        "tool": 2,
                        "c": 6.2
                    }
                ],
                "toolset": [
                    {
                        "tool": 1,
                        "path": [
                            {
                                "x": 5925,
                                "y": 34420
                            },
                            {
                                "x": 5925,
                                "y": 42420
                            },
                            {
                                "x": 12175,
                                "y": 42420
                            }
                        ]
                    },
                    {
                        "tool": 2,
                        "path": [
                            {
                                "x": 7500,
                                "y": 34925
                            },
                            {
                                "x": 9000,
                                "y": 38425
                            },
                            {
                                "x": 7500,
                                "y": 41825
                            },
                            {
                                "x": 10500,
                                "y": 34925
                            },
                            {
                                "x": 10500,
                                "y": 41825
                            }
                        ]
                    }
                ]
            }
        );
    });
});
