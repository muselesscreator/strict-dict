import {
  vi,
  describe,
  it,
  expect,
} from 'vitest';

import keyStore from './keyStore';

const testObj = { key1: 'value1', key2: 'value2' };

vi.mock('./StrictDict', () => ({
  default: vi.fn(val => ({ StrictDict: val })),
}));

describe('keyStore', () => {
  it('provides a StrictDict from the keys of passed object', () => {
    expect(keyStore(testObj)).toEqual({ StrictDict: ['key1', 'key2'] });

  });
});
