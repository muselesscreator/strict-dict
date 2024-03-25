/* v8 ignore start */
/**
 * @typedef {Object} SymbolObject
 */ 
export type SymbolObject<T extends object = Record<string, unknown>, K = T[keyof T]> = {
  [key:string|number|symbol]:K
}
type NonUndefined<T> = T extends undefined ? never : T;
/**
 * Allowed return values for a StrictDict (explicity excludes undefined)
 * @typedef {Object} ObjectValue
 */
export type ObjectValue = NonUndefined<unknown>;
export type StrictKey = string | symbol;

/**
 * Passed method that takes a target object and invalid called key for handling
 * failed get calls.
 * @typedef {Function} ConfigFunction
 * @param {Object} params
 * @param {Object} params.target - The target object that the key was called on.
 * @param {string} params.key - The key that was called on the target object.
 */
export type ConfigFunction = (params: { target: StrictTarget, key: StrictKey }) => void;

/**
 * Object of ConfigFunctions keyed by run environment, that determine error behavior in those
 * environemnts.
 * @typedef {Object} ConfigObject
 */
export type ConfigObject = { [param: string]: ConfigFunction };

/**
 * Target object or string array for StrictDict generation
 * @typedef {Object|string[]} StrictTarget
 * @property {Object} [key] - An object with string keys and arbitrarily complex values.
 * @property {string[]} [key] - An array of strings.
 */
export type StrictTarget = { [key: StrictKey]: ObjectValue } | string[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StrictReturn = any;

/**
 * Custom proxy object that enforces strict key access on a target object.
 * @typedef {Object} StrictObject
 */
export type StrictObject = SymbolObject<StrictTarget, StrictReturn>;
