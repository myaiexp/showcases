// The CSS scoping check the integrity test relies on
import { describe, expect, it } from 'vitest';
import { isScopedCss } from './tree.ts';

describe('isScopedCss', () => {
  const id = 'zdog/spin-and-drag';
  it('accepts one block under the example selector, either quote style', () => {
    expect(isScopedCss(`/* c */\n[data-example='${id}'] { .a { color: red; } }\n`, id)).toBe(true);
    expect(isScopedCss(`[data-example="${id}"] { .a { color: red; } }`, id)).toBe(true);
  });
  it('rejects unscoped rules, a second top-level block, or another example id', () => {
    expect(isScopedCss('.a { color: red; }', id)).toBe(false);
    expect(isScopedCss(`[data-example='${id}'] { } .leak { }`, id)).toBe(false);
    expect(isScopedCss(`[data-example='zdog/other'] { }`, id)).toBe(false);
  });
});
