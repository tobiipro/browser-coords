declare global {
    interface Screen {
        availLeft?: number;
        availTop?: number;
    }
}
export declare let getOsZoomFactor: () => number;
export declare let toJSON: () => {
    cfg: {
        osZoomFactor: number;
        pixelRatio: number;
    };
    width: number;
    height: number;
    available: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    orientation: {
        angle: number;
        type: OrientationType;
    };
    osZoomFactorPercentile: number;
    pixelRatioPercentile: number;
};
export declare let screen: {
    cfg: {
        osZoomFactor: number;
        pixelRatio: number;
    };
    width: (() => number) & {
        shouldThrottle: boolean;
    };
    height: (() => number) & {
        shouldThrottle: boolean;
    };
    available: {
        left: (() => number) & {
            shouldThrottle: boolean;
        };
        top: (() => number) & {
            shouldThrottle: boolean;
        };
        width: (() => number) & {
            shouldThrottle: boolean;
        };
        height: (() => number) & {
            shouldThrottle: boolean;
        };
    };
    orientation: {
        angle: (() => number) & {
            shouldThrottle: boolean;
        };
        type: (() => OrientationType) & {
            shouldThrottle: boolean;
        };
    };
    osZoomFactor: (() => number) & {
        shouldThrottle: boolean;
    };
    pixelRatio: (() => number) & {
        shouldThrottle: boolean;
    };
    toJSON: () => {
        cfg: {
            osZoomFactor: number;
            pixelRatio: number;
        };
        width: number;
        height: number;
        available: {
            left: number;
            top: number;
            width: number;
            height: number;
        };
        orientation: {
            angle: number;
            type: OrientationType;
        };
        osZoomFactorPercentile: number;
        pixelRatioPercentile: number;
    };
};
export default screen;
