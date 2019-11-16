export declare let toJSON: () => {
    cfg: {
        borderSize: number;
        viewport: {
            x: number;
            y: number;
        };
    };
    x: number;
    y: number;
    width: number;
    height: number;
    viewport: {
        x: number;
        y: number;
    };
};
export declare let window2: {
    cfg: {
        borderSize: number;
        viewport: {
            x: number;
            y: number;
        };
    };
    x: (() => number) & {
        shouldThrottle: boolean;
    };
    y: (() => number) & {
        shouldThrottle: boolean;
    };
    width: (() => number) & {
        shouldThrottle: boolean;
    };
    height: (() => number) & {
        shouldThrottle: boolean;
    };
    viewport: {
        x: () => number;
        y: () => number;
    };
    borderSize: () => number;
    toJSON: () => {
        cfg: {
            borderSize: number;
            viewport: {
                x: number;
                y: number;
            };
        };
        x: number;
        y: number;
        width: number;
        height: number;
        viewport: {
            x: number;
            y: number;
        };
    };
};
export default window2;
