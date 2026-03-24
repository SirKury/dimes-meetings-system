import { parsePort } from './env.util';

describe('parsePort', () => {
  it('returns fallback when value is undefined', () => {
    expect(parsePort(undefined, 3001)).toBe(3001);
  });

  it('returns fallback when value is invalid', () => {
    expect(parsePort('invalid', 3001)).toBe(3001);
  });

  it('returns parsed value when value is valid', () => {
    expect(parsePort('8080', 3001)).toBe(8080);
  });
});
