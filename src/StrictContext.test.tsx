import * as React from 'react';
import {
  vi,
  describe,
  it,
  expect,
} from 'vitest';
import StrictContext from './StrictContext';

vi.mock('react', () => ({
   createContext: vi.fn(context => ({ createContext: context })),
}));

describe('StrictContext', () => {
  it('returns simple ReactContext with empty object value', () => { 
    expect(StrictContext).toEqual(React.createContext({}));
  });
});
