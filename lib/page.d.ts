export declare let toJSON: () => {
    cfg: {
        zoomFactor: number;
    };
    x: number;
    y: number;
    width: number;
    height: number;
    url: string;
    zoomFactorPercentile: number;
};
export declare let page: {
    cfg: {
        zoomFactor: number;
    };
    x: () => number;
    y: () => number;
    width: (() => number) & {
        shouldThrottle: boolean;
    };
    height: (() => number) & {
        shouldThrottle: boolean;
    };
    zoomFactor: () => number;
    toJSON: () => {
        cfg: {
            zoomFactor: number;
        };
        x: number;
        y: number;
        width: number;
        height: number;
        url: string;
        zoomFactorPercentile: number;
    };
};
export default page;
