import StrictContext from './StrictContext';
import {
  vi,
  describe,
  it,
  expect,
} from 'vitest';
import useKeyStore from './useKeyStore';

vi.mock('./keyStore', () => ({
  default: vi.fn((...args) => ({ keyStore: args })),
}));
vi.mock('./StrictContext', () => ({ default: { Strict: 'context' } }));
vi.mock('react', () => ({ 
  useContext: vi.fn((context) => context),
}));

describe('useKeyStore', () => {
  it('returns a StrictDict with context from StrictContext', () => {
    const strictDict = useKeyStore();
    const target = { key1: 'value1', key2: 'value2' };
    expect(strictDict(target)).toEqual({ keyStore: [target, StrictContext] });
  });
});
