/// <reference types="lodash" />
import { Fn } from 'lodash-firecloud/types';
declare type Rect = {
    x: number;
    y: number;
    left: number;
    top: number;
    width: number;
    height: number;
};
export declare let roundRect: <T extends Partial<Rect>>(obj: T, precision?: number) => T;
export declare let throttle: <T extends Fn<unknown, unknown[]>>(fn: T) => T & import("lodash").Cancelable;
export declare let shouldThrottle: <T extends Fn<unknown, unknown[]>>(fn: T) => T & {
    shouldThrottle: boolean;
};
export {};
