// Task first: pick what the reader must do and get the first-choice chart for the same kind of data
import { areaY, barX, barY, binX, cell, defineChart, dot, lineY, mountChart, rect } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { clusters, products, signups } from '../../shared/concepts-data.ts';
import { normal, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const points = clusters(3, 15);
const next = normal(rng(5), 100, 20);
const samples = Array.from({ length: 300 }, (_, i) => ({ id: `o${i}`, value: next() }));
const bins = binX(samples, { value: 'value', thresholds: 16 });
const ranges = signups.map((r) => ({ ...r, low: r.value - 12, high: r.value + 15 }));
const grid = ['Mon', 'Tue', 'Wed', 'Thu'].flatMap((day, d) => ['AM', 'Noon', 'PM'].map((slot, s) => ({ id: `${day}${slot}`, day, slot, load: (d * 3 + s * 5) % 11 })));
const compose = (['Hardware', 'Services', 'Support'] as const).flatMap((kind, k) => signups.map((r) => ({ id: `${kind}${r.month}`, month: r.month, kind, value: r.value * (0.5 + k * 0.25) })));

const band = () => scaleBand<string>().padding(0.15);
const point = () => scalePoint<string>().padding(0.2);
const lin = { scale: scaleLinear, nice: true, grid: true } as const;

const tasks = [
  ['Follow change over time: line', () => defineChart({ marks: [lineY(signups, { x: 'month', y: 'value', points: true })], scales: { x: { scale: point }, y: lin }, tooltip })],
  ['Compare named categories: horizontal bars', () => defineChart({ marks: [barX(products, { x: 'revenue', y: 'product' })], scales: { x: lin, y: { scale: band } }, tooltip })],
  ['Inspect a relationship: scatterplot', () => defineChart({ marks: [dot(points, { x: 'x', y: 'y', r: 4 })], scales: { x: lin, y: lin }, tooltip })],
  ['Inspect one distribution: histogram', () => defineChart({ marks: [rect(bins, { x1: 'x1', x2: 'x2', y1: () => 0, y2: 'value', inset: 0.5 })], scales: { x: { scale: scaleLinear, nice: true }, y: lin }, tooltip })],
  ['Show an interval: range area', () => defineChart({ marks: [areaY(ranges, { x: 'month', y1: 'low', y2: 'high', fillOpacity: 0.4 })], scales: { x: { scale: point }, y: lin }, tooltip })],
  ['Show composition: stacked bars', () => defineChart({ marks: [barY(compose, { x: 'month', y: 'value', z: 'kind' })], scales: { x: { scale: band }, y: lin }, tooltip })],
  ['Show a matrix: heatmap cells', () => defineChart({ marks: [cell(grid, { x: 'day', y: 'slot', fill: 'load' })], scales: { x: { scale: band }, y: { scale: band } } })],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const options = (definition: (typeof tasks)[number][1]) => ({ definition: definition(), height: stage.height, ariaLabel: 'Chart for the chosen task' });
  const host = stage.own(mountChart(stage.box, options(tasks[0][1]) as never));
  const show = (make: (typeof tasks)[number][1], label: string): void => {
    host.update(options(make) as never);
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'reader task', tasks.map(([l, m]) => [m, l] as const), (m) => show(m, ''));
  else stage.cycle(tasks, 1700, ([l, m]) => show(m, l));
  return () => stage.dispose();
};

export default mount;
