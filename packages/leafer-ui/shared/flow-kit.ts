// Flow scaffolding: numbered tiles, a scaled pane, container-size sweeps
import { Box, type Leafer, type UI } from 'leafer-ui';
import { slider } from './controls.ts';
import { label } from './basics.ts';
import type { Stage } from './stage.ts';

const FILLS = ['#FF4B4B', '#FEB027', '#79CB4D'] as const;

/** The docs' tile: a coloured Box holding a centred, numbered Text of the given size. Colours cycle red, gold, green. */
export function tile(n: number, w: number, h: number, extra: Record<string, unknown> = {}): Box {
  return new Box({
    fill: FILLS[(n - 1) % 3],
    ...extra,
    children: [{ tag: 'Text', text: String(n), fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: w, height: h }],
  });
}

/** The docs' tiles for an x flow: 25 wide, 20 / 40 / 30 high, repeated. */
export function xTiles(count = 3): Box[] {
  const h = [20, 40, 30];
  return Array.from({ length: count }, (_, i) => tile(i + 1, 25, h[i % 3]!));
}

/** The docs' tiles for a y flow: 25 high, 20 / 40 / 30 wide, repeated. */
export function yTiles(count = 3): Box[] {
  const w = [20, 40, 30];
  return Array.from({ length: count }, (_, i) => tile(i + 1, w[i % 3]!, 25));
}

/** Scale from the docs' 100 x 100 flow to the pane: a card has 160 px for it, the full view 280. */
export const flowScale = (stage: Pick<Stage, 'preview'>): number => (stage.preview ? 1.4 : 2.6);

/** Where to put a flow of `w` x `h` docs units so its largest size sits centred in the pane. */
export function flowOrigin(
  stage: Pick<Stage, 'width' | 'height' | 'preview'>,
  maxW = 140,
  maxH = 140,
  k = flowScale(stage),
): { x: number; y: number } {
  return { x: Math.round((stage.width - maxW * k) / 2), y: Math.round(Math.max(8, (stage.height - maxH * k) / 2)) };
}

export interface Sweep {
  /** Which sides the card swings and the full view's sliders drive. */
  w?: readonly [number, number];
  h?: readonly [number, number];
}

/**
 * The container's size, in docs units. Full view: width and height sliders. Card: no pointer, so
 * the size swings between the ranges (width and height out of step) and a caption shows it.
 */
export function sweepSize(stage: Stage, flow: UI & { width?: number; height?: number }, sweep: Sweep = {}, period = 6): void {
  const { w, h } = sweep;
  const w0 = flow.width ?? 100;
  const h0 = flow.height ?? 100;
  if (stage.bar) {
    if (w) slider(stage.bar, 'width', w[0], w[1], 1, w0, (v) => (flow.width = v));
    if (h) slider(stage.bar, 'height', h[0], h[1], 1, h0, (v) => (flow.height = v));
    return;
  }
  const say = label(stage, '', true);
  stage.loop((_dt, t) => {
    const u = (phase: number): number => 0.5 - 0.5 * Math.cos((t / period) * Math.PI * 2 + phase);
    if (w) flow.width = Math.round(w[0] + (w[1] - w[0]) * u(0));
    if (h) flow.height = Math.round(h[0] + (h[1] - h[0]) * u(1.7));
    say(`${w ? `width ${flow.width}` : ''}${w && h ? '   ' : ''}${h ? `height ${flow.height}` : ''}`);
  });
}

/** Adds a flow to the pane at the origin, scaled so the docs' numbers fit. */
export function place(stage: Stage, leafer: Leafer, flow: UI, maxW = 140, maxH = 140, k = flowScale(stage)): void {
  const { x, y } = flowOrigin(stage, maxW, maxH, k);
  flow.set({ x, y, scale: k });
  leafer.add(flow);
}
