// Preview mount ordering and the live-preview cap
import { describe, expect, it } from 'vitest';
import { pickToMount } from './schedule.ts';

describe('pickToMount', () => {
  const visible = [
    { key: 'far', distance: 500 },
    { key: 'near', distance: 10 },
    { key: 'mid', distance: 200 },
  ];

  it('mounts nearest first, up to the cap', () => {
    expect(pickToMount(visible, new Set(), 2)).toEqual(['near', 'mid']);
  });

  it('counts already-active previews against the cap and skips them', () => {
    expect(pickToMount(visible, new Set(['near']), 2)).toEqual(['mid']);
    expect(pickToMount(visible, new Set(['x', 'y']), 2)).toEqual([]);
  });
});
