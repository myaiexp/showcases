// A wavy track and a follower arrow for the motion path examples
import { Path, Rect, type Group } from 'leafer-ui';
import type { Stage } from './stage.ts';

/** SVG path data for a smooth S-curve across the pane, with a margin. */
export function wavePath(stage: Pick<Stage, 'width' | 'height'>, margin = 24): string {
  const { width: w, height: h } = stage;
  const m = margin;
  const top = h * 0.2;
  const bot = h * 0.78;
  return `M ${m} ${h * 0.55} C ${w * 0.25} ${top}, ${w * 0.35} ${bot + 20}, ${w * 0.5} ${h * 0.5} S ${w * 0.78} ${top - 10}, ${w - m} ${h * 0.5}`;
}

/** The motion path itself: a stroked Path other children of the group follow. */
export function track(stage: Pick<Stage, 'width' | 'height'>, extra: Record<string, unknown> = {}): Path {
  return new Path({
    path: wavePath(stage),
    stroke: 'rgba(0,0,0,0.25)',
    strokeWidth: 3,
    dashPattern: [6, 6],
    motionPath: true, // siblings in the group can move along it
    ...extra,
  });
}

/** A small arrow-ish follower: wider than tall, pointing right at rotation 0. */
export function follower(stage: Pick<Stage, 'preview'>, extra: Record<string, unknown> = {}): Rect {
  const s = stage.preview ? 18 : 26;
  return new Rect({ width: s * 1.6, height: s, cornerRadius: [s / 2, s / 2, s / 2, 4], fill: '#32cd79', ...extra });
}

/** Shows a number as a CSS-ish percent. */
export const pct = (v: number): string => `${Math.round(v)}%`;

export type { Group };
