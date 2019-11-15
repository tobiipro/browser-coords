export declare let toJSON: () => {
    cfg: {
        x: number;
        y: number;
    };
    x: number;
    y: number;
    width: number;
    height: number;
    isIframe: boolean;
    scroll: {
        x: number;
        y: number;
    };
};
export declare let client: {
    cfg: {
        x: number;
        y: number;
    };
    x: () => number;
    y: () => number;
    width: (() => number) & {
        shouldThrottle: boolean;
    };
    height: (() => number) & {
        shouldThrottle: boolean;
    };
    isIframe: (() => boolean) & {
        shouldThrottle: boolean;
    };
    scroll: {
        x: (() => number) & {
            shouldThrottle: boolean;
        };
        y: (() => number) & {
            shouldThrottle: boolean;
        };
    };
    toJSON: () => {
        cfg: {
            x: number;
            y: number;
        };
        x: number;
        y: number;
        width: number;
        height: number;
        isIframe: boolean;
        scroll: {
            x: number;
            y: number;
        };
    };
};
export default client;
