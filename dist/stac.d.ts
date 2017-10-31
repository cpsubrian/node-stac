export default class Stac {
    private _stack;
    private _sorted;
    private _options;
    private _sortBy;
    private _defaultVal;
    private _comparator;
    [key: string]: any;
    constructor(options?: Object, items?: any);
    readonly length: number;
    _getVal(item: any): any;
    _sort(): void;
    add(val: any, obj?: any): this;
    remove(obj: any): this;
    first(val: any, obj?: any): this;
    unshift(val: any, obj: any): this;
    last(val: any, obj?: any): this;
    push(val: any, obj?: any): this;
    multi(method: string, items: any[]): this;
    items(): any[];
    toJSON(): any[];
    map(iterator: (item: any, i: number) => any[], thisArg: any): any[][];
    forEach(iterator: (item: any, i: number) => void, thisArg: any): void;
    pop(): any;
    shift(): any;
    clone(): Stac;
}
