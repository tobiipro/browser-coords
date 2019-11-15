import cfg from './cfg';
import clientCoords from './client';
import pageCoords from './page';
import screenCoords from './screen';
import screenToClientPage from './screen-to-client-page';
import windowCoords from './window';
declare global {
    interface Window {
        mozInnerScreenX?: number;
        mozInnerScreenY?: number;
    }
}
export declare let init: () => void;
export { cfg, screenCoords as screen, windowCoords as window, clientCoords as client, pageCoords as page, screenToClientPage, screenToClientPage as screenToClient };
declare const _default: {
    cfg: {
        throttle: number;
        screen: {
            osZoomFactor: number;
            pixelRatio: number;
        };
        window: {
            borderSize: number;
            viewport: {
                x: number;
                y: number;
            };
        };
        client: {
            x: number;
            y: number;
        };
        page: {
            zoomFactor: number;
        };
    };
    screen: {
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
    window: {
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
    client: {
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
    page: {
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
    screenToClientPage: ({ screenX, screenY }: {
        screenX: number;
        screenY: number;
    }) => {
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
    };
    screenToClient: ({ screenX, screenY }: {
        screenX: number;
        screenY: number;
    }) => {
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
    };
};
export default _default;
