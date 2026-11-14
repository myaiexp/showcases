// Spec background as a gradient object: linear angle, radial and conical variants
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

type Kind = 'linear' | 'radial' | 'conical';
const KINDS: Kind[] = ['linear', 'radial', 'conical'];

const stops = (kind: Kind): { offset: number; color: string }[] =>
  kind === 'conical'
    ? [
        { offset: 0, color: '#2b1d52' },
        { offset: 0.33, color: '#1d3a52' },
        { offset: 0.66, color: '#1d5246' },
        { offset: 1, color: '#2b1d52' },
      ]
    : [
        { offset: 0, color: '#1d2a52' },
        { offset: 1, color: '#5a2a52' },
      ];

// x0/y0/x1/y1 are fractions of the chart box, so an angle becomes two points on a line through the centre.
function gradient(kind: Kind, angle: number): unknown {
  if (kind === 'radial') return { gradient: 'radial', x0: 0.5, y0: 0.5, r0: 0, x1: 0.5, y1: 0.5, r1: 0.7, stops: stops(kind) };
  if (kind === 'conical') return { gradient: 'conical', x: 0.5, y: 0.5, startAngle: 0, endAngle: Math.PI * 2, stops: stops(kind) };
  const a = (angle * Math.PI) / 180;
  return {
    gradient: 'linear',
    x0: 0.5 - Math.cos(a) / 2,
    y0: 0.5 - Math.sin(a) / 2,
    x1: 0.5 + Math.cos(a) / 2,
    y1: 0.5 + Math.sin(a) / 2,
    stops: stops(kind),
  };
}

const mount: Mount = (el, ctx) =>
  mountLive<{ kind: Kind; angle: number }>(el, ctx, {
    initial: { kind: 'linear', angle: 60 },
    mode: 'rebuild',
    previewMs: 1500,
    step: (s, i) => ({ kind: KINDS[Math.floor(i / 3) % KINDS.length] ?? 'linear', angle: (s.angle + 50) % 360 }),
    build: ({ kind, angle }, preview) =>
      ({
        type: 'bar',
        data: [{ id: 'd', values: groupedRows(['Q1', 'Q2', 'Q3', 'Q4'], ['North', 'South'], 5) }],
        xField: 'x',
        yField: 'y',
        seriesField: 'c',
        background: gradient(kind, angle),
        legends: { visible: !preview },
      }) as unknown as ISpec,
    controls: (bar, live) => {
      select(bar, 'gradient', KINDS, (v) => live.set({ kind: v as Kind }));
      slider(bar, 'linear angle', [0, 360, 5], 60, (v) => live.set({ angle: v }));
    },
  });

export default mount;
