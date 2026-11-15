// The draggingConstraint parser reads the Interactivity page's bodies without running code
import { describe, expect, it } from 'vitest';
import { parseDragConstraint } from '../packages/penrose/shared/drag-constraint.ts';

describe('parseDragConstraint', () => {
  it('reads the docs’ two bodies', () => {
    expect(parseDragConstraint('return [x, y]')(3, -4)).toEqual([3, -4]);
    expect(parseDragConstraint('return [Math.max(0, x), Math.max(0, y)]')(-5, 7)).toEqual([0, 7]);
  });

  it('handles precedence, unary minus, constants and a trailing semicolon', () => {
    const f = parseDragConstraint('return [-x + 2 * (y - 1), Math.hypot(x, y) / Math.PI];');
    const [a, b] = f(3, 4);
    expect(a).toBe(3);
    expect(b).toBeCloseTo(5 / Math.PI);
  });

  it('refuses anything that is not arithmetic over x, y and Math', () => {
    expect(() => parseDragConstraint('return [alert(1), y]')).toThrow(/not supported/);
    expect(() => parseDragConstraint('return [window.x, y]')).toThrow(/not supported/);
    expect(() => parseDragConstraint('return [Math.random(), y]')).toThrow(/Math.random/);
    expect(() => parseDragConstraint('return [x, y]; fetch(1)')).toThrow(/unexpected/);
  });
});
