// Component examples' read-out helper: a short log in the read-out line and the caption
import type { Stage } from './frame.ts';

/**
 * Returns `log(line)`: the newest line goes to the caption (cards and full view) and, in the
 * full view, to the read-out under the view with the previous lines below it.
 */
export function logger(stage: Stage, keep = 6): (line: string) => void {
  const out = stage.readout();
  const lines: string[] = [];
  return (line) => {
    stage.caption(line);
    lines.unshift(line);
    lines.length = Math.min(lines.length, keep);
    if (out) out.textContent = lines.join('\n');
  };
}

/** Formats a coordinate triple to two decimals. */
export function fmt(v: { x: number; y: number; z: number }): string {
  return `${v.x.toFixed(2)} ${v.y.toFixed(2)} ${v.z.toFixed(2)}`;
}
