// link: edges between placed nodes, with strokeWidth from a weight field and a choice of cap and curve
import { defineChart, dot, link, mountChart, text } from '@tanstack/charts';
import { d3Curve } from '@tanstack/charts/d3/shape';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { curveBumpX, curveLinear, curveNatural } from 'd3-shape';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const nodes = [
  { id: 'A', x: 1, y: 5 },
  { id: 'B', x: 3, y: 8 },
  { id: 'C', x: 4, y: 2 },
  { id: 'D', x: 7, y: 6 },
  { id: 'E', x: 9, y: 3 },
];
const at = new Map(nodes.map((n) => [n.id, n]));
const edges = [
  ['A', 'B', 4],
  ['A', 'C', 2],
  ['B', 'D', 6],
  ['C', 'D', 3],
  ['C', 'E', 5],
  ['D', 'E', 1],
].map(([from, to, weight]) => {
  const a = at.get(from as string)!;
  const b = at.get(to as string)!;
  return { id: `${from}-${to}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y, weight: weight as number };
});

const curves = { straight: undefined, linear: d3Curve(curveLinear), bump: d3Curve(curveBumpX), natural: d3Curve(curveNatural) } as const;
type Mode = keyof typeof curves;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (mode: Mode) => {
    const curve = curves[mode];
    return defineChart({
      svgAnimation: true,
      marks: [
        link(edges, {
          x1: 'x1',
          y1: 'y1',
          x2: 'x2',
          y2: 'y2',
          key: 'id',
          stroke: '#94a3b8',
          strokeOpacity: 0.8,
          strokeWidth: (edge) => edge.weight,
          lineCap: 'butt',
          ...(curve ? { curve } : {}),
        }),
        dot(nodes, { x: 'x', y: 'y', r: 9, fill: '#60a5fa' }),
        text(nodes, { x: 'x', y: 'y', text: 'id', fill: '#0b0b0f', fontWeight: 700 }),
      ],
      scales: {
        x: { scale: scaleLinear().domain([0, 10]) },
        y: { scale: scaleLinear().domain([0, 10]) },
      },
      guides: false,
    });
  };

  const options = (mode: Mode) => ({ definition: build(mode), height: stage.height, ariaLabel: 'Weighted edges between five nodes' });
  const host = stage.own(mountChart(stage.box, options('straight')));
  const modes = (Object.keys(curves) as Mode[]).map((m) => [m, m === 'straight' ? 'no curve (a rule)' : `curve: ${m}`] as const);
  const show = (mode: Mode): void => host.update(options(mode));
  if (stage.bar) select(stage.bar, 'curve', modes, show);
  else stage.cycle(modes.map((m) => m[0]), 1700, show);
  return () => stage.dispose();
};

export default mount;
