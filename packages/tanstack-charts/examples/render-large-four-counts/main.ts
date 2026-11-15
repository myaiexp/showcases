// Honest accounting: each representation reports four counts, and a sample says it is a sample
import { scaleLinear as d3Linear } from 'd3-scale';
import { defineChart, dot, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cloud } from '../../shared/render-data.ts';
import { countNodes } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const source = cloud(30000, 77);
const [x0, x1] = [Math.min(...source.map((p) => p.x)), Math.max(...source.map((p) => p.x))];
const [y0, y1] = [Math.min(...source.map((p) => p.y)), Math.max(...source.map((p) => p.y))];

function grid(nx: number, ny: number) {
  const counts = new Map<number, number>();
  for (const p of source) {
    const i = Math.min(nx - 1, Math.floor(((p.x - x0) / (x1 - x0)) * nx));
    const j = Math.min(ny - 1, Math.floor(((p.y - y0) / (y1 - y0)) * ny));
    counts.set(j * nx + i, (counts.get(j * nx + i) ?? 0) + 1);
  }
  const wx = (x1 - x0) / nx;
  const wy = (y1 - y0) / ny;
  return [...counts].map(([k, count]) => ({ id: `c${k}`, x1: x0 + (k % nx) * wx, x2: x0 + ((k % nx) + 1) * wx, y1: y0 + Math.floor(k / nx) * wy, y2: y0 + (Math.floor(k / nx) + 1) * wy, count }));
}

type Mode = 'sample' | 'fine' | 'coarse';
const modes: readonly (readonly [Mode, string])[] = [
  ['sample', 'a sample of 1,500 dots'],
  ['fine', 'a 40 by 24 grid'],
  ['coarse', 'a 10 by 6 grid'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compare the four counts: only the grids account for every source row.' });
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();

  const build = (mode: Mode) => {
    const common = { scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } } };
    if (mode === 'sample') {
      const prepared = source.filter((_, i) => i % 20 === 0);
      return { prepared: prepared.length, represented: prepared.length, definition: defineChart({ marks: [dot(prepared, { x: 'x', y: 'y', key: 'id', r: 2, fill: '#60a5fa', fillOpacity: 0.6 })], ...common, pointer: false }) };
    }
    const cells = mode === 'fine' ? grid(40, 24) : grid(10, 6);
    return {
      prepared: cells.length,
      represented: cells.reduce((s, c) => s + c.count, 0),
      definition: defineChart({ marks: [rect(cells, { x1: 'x1', x2: 'x2', y1: 'y1', y2: 'y2', color: 'count', inset: 0.4, key: 'id' })], scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, grid: false } }, color: { scale: d3Linear, range: ['#1e293b', '#38bdf8', '#fde047'] }, pointer: false }),
    };
  };
  const first = build('sample');
  const host = stage.own(mountChart(stage.box, { definition: first.definition as never, height: stage.height, initialWidth: 640, ariaLabel: 'Representation of 30,000 rows' }));
  const show = (mode: Mode): void => {
    const b = build(mode);
    host.update({ definition: b.definition as never, height: stage.height, initialWidth: 640, ariaLabel: 'Representation of 30,000 rows' });
    const nodes = Object.values(countNodes(host.getScene().nodes)).reduce((s, n) => s + n, 0);
    const text = `source ${source.length}  represented ${b.represented}  prepared ${b.prepared}  rendered: ${nodes} scene nodes, ${stage.box.querySelectorAll('*').length} DOM elements`;
    if (readout) readout.textContent = text;
    else stage.say(`${modes.find((m) => m[0] === mode)![1]}: ${b.represented} of ${source.length} rows represented`);
  };
  show('sample');
  if (stage.bar) select(stage.bar, 'representation', modes, show);
  else stage.cycle(modes.map((m) => m[0]), 2400, show);
  return () => stage.dispose();
};

export default mount;
