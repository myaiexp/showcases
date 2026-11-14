// Frame-pace governor: lowering, raising, blame and cooldown
import { describe, expect, it } from 'vitest';
import { FramePace, type PaceLimits } from './pace.ts';

const LIMITS: PaceLimits = {
  max: 6,
  min: 1,
  slowMs: 50,
  fastMs: 25,
  windowMs: 1000,
  hangMs: 3000,
  raiseAfterMs: 3000,
  blameMs: 2000,
  cooldownMs: 5000,
  maxCooldownMs: 40000,
};

/** Feeds frames `gap` ms apart until `until`; returns every verdict that was not 'none'. */
function run(pace: FramePace, from: number, until: number, gap: number): { at: number; kind: string }[] {
  const out: { at: number; kind: string }[] = [];
  for (let t = from; t <= until; t += gap) {
    const v = pace.frame(t);
    if (v !== 'none') out.push({ at: t, kind: v });
  }
  return out;
}

describe('FramePace', () => {
  it('starts at the maximum and holds it while frames are fast', () => {
    const pace = new FramePace(LIMITS);
    expect(run(pace, 0, 10000, 16)).toEqual([]);
    expect(pace.cap).toBe(6);
  });

  it('lowers the cap once per window while frames stay slow, down to the minimum', () => {
    const pace = new FramePace(LIMITS);
    run(pace, 0, 500, 16);
    const verdicts = run(pace, 600, 12000, 100);
    expect(verdicts.every((v) => v.kind === 'lower')).toBe(true);
    expect(pace.cap).toBe(1);
    // One step per full window of slow frames, not one per frame.
    expect(verdicts[1]!.at - verdicts[0]!.at).toBeGreaterThanOrEqual(1000);
  });

  it('ignores an isolated long frame (a mount spike) when the rest are fast', () => {
    const pace = new FramePace(LIMITS);
    run(pace, 0, 2000, 16);
    expect(pace.frame(2400)).toBe('none');
    expect(run(pace, 2416, 6000, 16)).toEqual([]);
    expect(pace.cap).toBe(6);
  });

  it('treats one hang as long as the window as slow on its own', () => {
    const pace = new FramePace(LIMITS);
    run(pace, 0, 1000, 16);
    expect(pace.frame(4000)).toBe('lower');
  });

  it('ignores a lone hitch shorter than a hang, such as a one-off shader compile', () => {
    const pace = new FramePace(LIMITS);
    run(pace, 0, 1000, 16);
    pace.mountStarted(1000);
    expect(pace.frame(3000)).toBe('none');
    expect(run(pace, 3016, 8000, 16)).toEqual([]);
    expect(pace.cap).toBe(6);
  });

  it('does not blame a mount started before the page had shown it was healthy', () => {
    const pace = new FramePace(LIMITS);
    pace.mountStarted(0);
    expect(run(pace, 0, 2000, 100)[0]?.kind).toBe('lower');
  });

  it('does not blame a mount started right after a lowering cleared the window', () => {
    const pace = new FramePace(LIMITS);
    const first = run(pace, 0, 1100, 100);
    expect(first.map((v) => v.kind)).toEqual(['lower']);
    pace.mountStarted(first[0]!.at);
    expect(run(pace, 1200, 3000, 100)[0]?.kind).toBe('lower');
  });

  it('forgets a suspect that was unmounted before it settled', () => {
    const pace = new FramePace(LIMITS);
    run(pace, 0, 2000, 16);
    pace.mountStarted(2000);
    pace.suspectGone();
    expect(run(pace, 2100, 4000, 120)[0]?.kind).toBe('lower');
  });

  it('blames the card that just mounted when a healthy page turns slow', () => {
    const pace = new FramePace(LIMITS);
    run(pace, 0, 2000, 16);
    pace.mountStarted(2000);
    pace.mountSettled(2050);
    const verdicts = run(pace, 2100, 4000, 120);
    expect(verdicts[0]?.kind).toBe('blame');
    expect(pace.cap).toBe(6);
  });

  it('blames a mount whose first frame hangs before it has settled', () => {
    const pace = new FramePace(LIMITS);
    run(pace, 0, 2000, 16);
    pace.mountStarted(2000);
    expect(pace.frame(2016)).toBe('none');
    expect(pace.frame(30000)).toBe('blame');
  });

  it('stops suspecting a card once the blame window after it settled has passed', () => {
    const pace = new FramePace(LIMITS);
    run(pace, 0, 2000, 16);
    pace.mountStarted(2000);
    pace.mountSettled(2100);
    run(pace, 2116, 6000, 16);
    expect(run(pace, 6100, 8000, 100)[0]?.kind).toBe('lower');
  });

  it('lowers instead of blaming when the page was already slow before the mount', () => {
    const pace = new FramePace(LIMITS);
    run(pace, 0, 900, 120);
    pace.mountStarted(900);
    pace.mountSettled(900);
    expect(run(pace, 1020, 3000, 120)[0]?.kind).toBe('lower');
  });

  it('raises the cap again after frames stay fast past the cooldown', () => {
    const pace = new FramePace(LIMITS);
    const lowered = run(pace, 0, 1300, 100);
    expect(lowered.map((v) => v.kind)).toEqual(['lower']);
    expect(pace.cap).toBe(5);
    const verdicts = run(pace, 1316, 9000, 16);
    expect(verdicts.map((v) => v.kind)).toEqual(['raise']);
    expect(verdicts[0]!.at).toBeGreaterThanOrEqual(lowered[0]!.at + 5000);
    expect(pace.cap).toBe(6);
  });

  it('doubles the cooldown when a raise slows the page again', () => {
    const pace = new FramePace(LIMITS);
    run(pace, 0, 1300, 100); // lower at ~1000, cooldown 5 s
    run(pace, 1316, 6400, 16); // raise at ~6300
    const slowAgain = run(pace, 6500, 8000, 100);
    expect(slowAgain[0]?.kind).toBe('lower');
    const lowered = slowAgain[0]!.at;
    const back = run(pace, 8016, 30000, 16).find((v) => v.kind === 'raise');
    expect(back!.at - lowered).toBeGreaterThanOrEqual(10000);
  });

  it('forgets the gap left by a hidden tab', () => {
    const pace = new FramePace(LIMITS);
    run(pace, 0, 1000, 16);
    pace.reset();
    expect(pace.frame(60000)).toBe('none');
    expect(run(pace, 60016, 62000, 16)).toEqual([]);
  });
});
