/**
 * Testing Strategy:
 * The testing strategy for this file is to define a set of tests against
 * created StrictDict instances, and run those tests against an initial
 * object, as well as an initial array.
 * These tests will cover general dict access, key access, default failure
 * behavior, and custom failure behavior.
 */
import {
  vi,
  beforeEach,
  describe,
  it,
  expect,
} from 'vitest';
import {
  StrictObject,
  StrictKey,
  StrictTarget,
} from './types';
import StrictDict from './StrictDict';

const value1 = 'valUE1';
const value2 = 'vALue2';
const key1 = 'Key1';
const key2 = 'keY2';

const fakeError = { stack: 'error', name: 'test', message: 'test' };
const windowError = vi.spyOn(window, 'Error');
const errorSpy = vi.spyOn(console, 'error');
const logSpy = vi.spyOn(console, 'log');
windowError.mockImplementation(() => fakeError);
errorSpy.mockImplementation(() => {});
logSpy.mockImplementation(() => {});

const rawDict = {
  [key1]: value1,
  [key2]: value2,
};

const rawArray = [value1, value2];
const arrayDict = { [value1]: value1, [value2]: value2 };


const testDict = (target: StrictTarget, expectedDict: StrictObject) => {
  let dict = StrictDict(target) as StrictObject;
  it('allows key listing', () => {
    expect(Object.keys(dict)).toEqual(Object.keys(expectedDict));
  });
  it('allows item listing', () => {
    expect(Object.values(dict)).toEqual(Object.values(expectedDict));
  });
  it('allows stringification', () => {
    expect(dict.toString()).toEqual(expectedDict.toString());
    expect({ ...dict }).toEqual({ ...expectedDict });
  });
  it('allows entry listing', () => {
    expect(Object.entries(dict)).toEqual(Object.entries(expectedDict));
  });
  it('allows $$typeof access', () => {
    expect(typeof dict).toEqual(typeof expectedDict);
    expect(dict['$$typeof']).toEqual(typeof expectedDict);
  });
  it('provides get access with strictGet', () => {
    const key = Object.keys(expectedDict)[0] as StrictKey;
    expect(dict[key]).toEqual(expectedDict[key]);
  });
  describe('invalid key behavior', () => {
    describe('default behavior', () => {
      it('logs error with target, name, and error stack', () => {
        expect(dict['invalid']).toEqual(undefined);
        expect(logSpy).toHaveBeenCalledWith('invalid');
        expect(errorSpy).toHaveBeenCalledWith({ target: dict, key: 'invalid' });
        expect(errorSpy).toHaveBeenCalledWith(fakeError.stack);
      });
    });
    describe('custom behavior', () => {
      const devBehavior = vi.fn();
      const prodBehavior = vi.fn();
      const config = {
        development: devBehavior,
        production: prodBehavior,
      };
      it('provides default behavior for unconfigured environment', () => {
        vi.stubEnv('NODE_ENV', 'custom');
        dict = StrictDict(target, config) as StrictObject;
        expect(dict['invalid']).toEqual(undefined);
        expect(logSpy).toHaveBeenCalledWith('invalid');
        expect(errorSpy).toHaveBeenCalledWith({ target: dict, key: 'invalid' });
        expect(errorSpy).toHaveBeenCalledWith(fakeError.stack);
      });
      it('calls configured behavior with key and target', () => {
        vi.stubEnv('NODE_ENV', 'production');
        dict = StrictDict(target, config) as StrictObject;
        expect(dict['invalid']).toEqual(undefined);
        expect(prodBehavior).toHaveBeenCalledWith({ target: dict, key: 'invalid' });
        vi.stubEnv('NODE_ENV', 'development');
        dict = StrictDict(target, config) as StrictObject;
        expect(dict['invalid']).toEqual(undefined);
        expect(devBehavior).toHaveBeenCalledWith({ target: dict, key: 'invalid' });
      });
    });
  });
};

describe('StrictDict', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    logSpy.mockClear();
    errorSpy.mockClear();
  });
  describe('from object', () => {
    testDict(rawDict, rawDict);
  });
  describe('from array', () => {
    testDict(rawArray, arrayDict);
  });
});
