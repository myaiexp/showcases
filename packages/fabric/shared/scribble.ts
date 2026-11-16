// Point lists for ghost strokes in a 360x240 scene: waves, loops and a zigzag
import type { XY } from 'fabric';

/** A sine wave from x0 to x1 around the line y, `turns` full periods, with a wobble so it looks hand-made. */
export function wave(x0: number, x1: number, y: number, amp: number, turns: number, n = 36): XY[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    return { x: x0 + (x1 - x0) * t, y: y + amp * Math.sin(t * turns * Math.PI * 2) + 2 * Math.sin(t * 41) };
  });
}

/** A circle (or spiral when `grow` is not 1) around cx, cy, `turns` times round. */
export function loop(cx: number, cy: number, r: number, turns = 1, grow = 1, n = 40): XY[] {
  return Array.from({ length: Math.round(n * turns) + 1 }, (_, i) => {
    const t = i / (n * turns);
    const rr = r * (1 + (grow - 1) * t);
    const a = t * turns * Math.PI * 2 - Math.PI / 2;
    return { x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a) };
  });
}

/** A zigzag of `teeth` points between two x values, tooth height h, interpolated so strokes stay smooth. */
export function zigzag(x0: number, x1: number, y: number, h: number, teeth: number, per = 6): XY[] {
  const corners: XY[] = Array.from({ length: teeth + 1 }, (_, i) => ({
    x: x0 + ((x1 - x0) * i) / teeth,
    y: y + (i % 2 ? h : -h),
  }));
  const out: XY[] = [];
  corners.slice(1).forEach((c, i) => {
    const a = corners[i]!;
    for (let k = 0; k < per; k++) out.push({ x: a.x + ((c.x - a.x) * k) / per, y: a.y + ((c.y - a.y) * k) / per });
  });
  out.unshift(corners[0]!);
  out.push(corners[corners.length - 1]!);
  return out;
}

/** Points with a little hand jitter added, deterministic from `seed`. */
export function jitter(points: readonly XY[], amount: number, seed = 1): XY[] {
  let s = seed * 9301 + 49297;
  const rnd = (): number => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 - 0.5;
  };
  return points.map((p) => ({ x: p.x + rnd() * amount, y: p.y + rnd() * amount }));
}
