import Vue from 'vue';

export { createNamespace } from './create';
export { addUnit } from './format/unit';

export const inBrowser = typeof window !== 'undefined';
export const isServer: boolean = Vue.prototype.$isServer;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function get(object: any, path: string): any {
  const keys = path.split('.');
  let result = object;

  keys.forEach((key) => {
    result = result[key] ?? '';
  });

  return result;
}

export function getPropByPath(obj: any, path: string, strict: any) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  const keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};
