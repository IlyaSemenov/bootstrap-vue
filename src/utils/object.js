/**
 * Aliasing Object[method] allows the minifier to shorten methods to a single character variable,
 * as well as giving BV a chance to inject polyfills.
 * As long as we avoid
 * - import * as Object from "utils/object"
 * all unused exports should be removed by tree-shaking.
 */

// @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != "function") {
    Object.assign = function(target, varArgs) {
        // .length of function is 2

        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError("Cannot convert undefined or null to object");
        }

        let to = Object(target);

        for (let index = 1; index < arguments.length; index++) {
            const nextSource = arguments[index];

            if (nextSource != null) {
                // Skip over if undefined or null
                for (const nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

// @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Polyfill
if (!Object.is) {
  Object.is = function(x, y) {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
     // Step 6.a: NaN == NaN
     return x !== x && y !== y;
    }
  };
}

export const assign = Object.assign;
export const getOwnPropertyNames = Object.getOwnPropertyNames;
export const keys = Object.keys;
export const defineProperties = Object.defineProperties;
export const defineProperty = Object.defineProperty;
export const freeze = Object.freeze;
export const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
export const getOwnPropertySymbols = Object.getOwnPropertySymbols;
export const getPrototypeOf = Object.getPrototypeOf;
export const create = Object.create;
export const isFrozen = Object.isFrozen;
export const is = Object.is;

export function readonlyDescriptor() {
    return { enumerable: true, configurable: false, writable: false };
}
