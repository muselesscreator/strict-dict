/* v8 ignore start */
export type SymbolObject<T extends object = Record<string, unknown>, K = T[keyof T]> = {
  [key:string|number|symbol]:K
}
type NonUndefined<T> = T extends undefined ? never : T;
export type ObjectValue = NonUndefined<unknown>;
export type StrictKey = string | symbol;
type ConfigParams = { target: StrictTarget; key: StrictKey };
export type ConfigFunction = (params: ConfigParams) => void;
export type ConfigObject = { [param: string]: ConfigFunction };
export type StrictTarget = { [key: StrictKey]: ObjectValue } | string[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StrictReturn = any;
export type StrictObject = SymbolObject<StrictTarget, StrictReturn>;
