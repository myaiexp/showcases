// Preview mount order, cap, pacing, settling and eviction
import { describe, expect, it } from 'vitest';
import { type Card, plan } from './schedule.ts';

const LIMITS = { cap: 3, concurrency: 1, settleMs: 150 };

function card(key: string, over: Partial<Card<string>> = {}): Card<string> {
  return { key, distance: 0, visible: true, visibleFor: 1000, state: 'idle', ...over };
}

describe('plan', () => {
  it('mounts the visible card nearest the viewport centre first, one at a time', () => {
    const cards = [card('far', { distance: 500 }), card('near', { distance: 10 }), card('mid', { distance: 200 })];
    expect(plan(cards, LIMITS)).toEqual({ mount: ['near'], evict: [] });
    expect(plan(cards, { ...LIMITS, concurrency: 2 }).mount).toEqual(['near', 'mid']);
  });

  it('starts nothing while a mount is still in flight', () => {
    const cards = [card('a', { state: 'mounting' }), card('b')];
    expect(plan(cards, LIMITS)).toEqual({ mount: [], evict: [] });
  });

  it('skips cards that only flash past, and wakes when the next one settles', () => {
    const cards = [card('passing', { visibleFor: 40 }), card('arriving', { visibleFor: 100 })];
    expect(plan(cards, LIMITS)).toEqual({ mount: [], evict: [], wakeInMs: 50 });
  });

  it('counts live and mounting previews against the cap', () => {
    const cards = [card('a', { state: 'live' }), card('b', { state: 'live' }), card('c', { state: 'live' }), card('d')];
    expect(plan(cards, LIMITS)).toEqual({ mount: [], evict: [] });
  });

  it('evicts an off-screen preview, furthest first, to make room for a visible one', () => {
    const cards = [
      card('gone', { state: 'live', visible: false, distance: 900 }),
      card('leaving', { state: 'live', visible: false, distance: 600 }),
      card('shown', { state: 'live' }),
      card('waiting', { distance: 50 }),
    ];
    expect(plan(cards, LIMITS)).toEqual({ mount: ['waiting'], evict: ['gone'] });
  });

  it('never evicts a visible preview, and evicts nothing when there is room', () => {
    const full = [card('a', { state: 'live' }), card('b', { state: 'live' }), card('c', { state: 'live' }), card('d')];
    expect(plan(full, LIMITS).evict).toEqual([]);
    const room = [card('off', { state: 'live', visible: false }), card('d')];
    expect(plan(room, LIMITS)).toEqual({ mount: ['d'], evict: [] });
  });

  it('trims previews past a lowered cap: off-screen first, then furthest from centre', () => {
    const cards = [
      card('centre', { state: 'live', distance: 10 }),
      card('edge', { state: 'live', distance: 300 }),
      card('mid', { state: 'mounting', distance: 100 }),
      card('off', { state: 'live', visible: false, distance: 50 }),
      card('waiting', { distance: 0 }),
    ];
    expect(plan(cards, { ...LIMITS, cap: 2 })).toEqual({ mount: [], evict: ['off', 'edge'] });
  });

  it('ignores cards that are neither visible nor running', () => {
    expect(plan([card('x', { visible: false })], LIMITS)).toEqual({ mount: [], evict: [] });
  });
});
