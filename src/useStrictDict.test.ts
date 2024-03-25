import StrictContext from './StrictContext';
import {
  vi,
  describe,
  it,
  expect,
} from 'vitest';
import useStrictDict from './useStrictDict';

vi.mock('./StrictDict', () => ({
  default: vi.fn((...args) => ({ StrictDict: args })),
}));
vi.mock('./StrictContext', () => ({ default: { Strict: 'context' } }));
vi.mock('react', () => ({ 
  useContext: vi.fn((context) => context),
}));

describe('useStrictDict', () => {
  it('returns a StrictDict with context from StrictContext', () => {
    const strictDict = useStrictDict();
    const target = { key1: 'value1', key2: 'value2' };
    expect(strictDict(target)).toEqual({ StrictDict: [target, StrictContext] });
  });
});
