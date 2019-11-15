declare type ScreenXY = {
    screenX: number;
    screenY: number;
};
declare type ClientPageXY = {
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
};
export declare let screenToClientPage: ({ screenX, screenY }: ScreenXY) => ClientPageXY;
export default screenToClientPage;
