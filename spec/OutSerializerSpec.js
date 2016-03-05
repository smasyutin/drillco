import { OutSerializer } from '../out_serializer'

describe("OutSerializer", () => {
    let serializer;

    beforeAll(() => {
        serializer = new OutSerializer();
    });
    it("test real content: 20000, 65000 offset", () => {
        expect(
            serializer.serialize(
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
                }, { x: 20000, y: 65000 })
        ).toEqual(
            "%% {T01=3.0, T02=6.2 this is 0}\nXYM50\n" +
            "N0000X+025925Y+030580T01\nN0001X+025925Y+022580\nN0002X+032175Y+022580\n" +
            "N0003X+027500Y+030075T02\nN0004X+029000Y+026575\nN0005X+027500Y+023175\nN0006X+030500Y+030075\nN0007X+030500Y+023175\n" +
            "XYM30");
    });

    it("test real content: 15960, 96038 offset", () => {
        expect(
            serializer.serialize(
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
                }, { x: 15960, y: 96038 })
        ).toEqual(
            "%% {T01=3.0, T02=6.2 this is 0}\nXYM50\n" +
            "N0000X+021885Y+061618T01\nN0001X+021885Y+053618\nN0002X+028135Y+053618\n" +
            "N0003X+023460Y+061113T02\nN0004X+024960Y+057613\nN0005X+023460Y+054213\nN0006X+026460Y+061113\nN0007X+026460Y+054213\n" +
            "XYM30");
    });
});