// FAQ: formatMethod on axis labels and series labels: round float noise, choose decimals, add a unit
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = ['Q1', 'Q2', 'Q3', 'Q4'].map((x, i) => ({ x, y: 0.1 + ([0.2, 1.1, 0.7, 1.45][i] ?? 0) + i * 0.0000001 }));

const UNITS = ['none', 'k', '%'] as const;
interface S {
  decimals: number;
  unit: (typeof UNITS)[number];
}

const mount: Mount = (el, ctx) => {
  const fmt = (s: S) => (v: number | string): string => {
    const n = Number(v);
    return s.unit === 'k' ? `${(n * 1000).toFixed(s.decimals)}k` : s.unit === '%' ? `${(n * 100).toFixed(s.decimals)}%` : n.toFixed(s.decimals);
  };
  return mountLive<S>(el, ctx, {
    initial: { decimals: 1, unit: 'none' },
    previewMs: 1500,
    step: (s, i) => ({ decimals: i % 3, unit: i % 2 ? 'k' : s.unit }),
    controls: (bar, live) => {
      select(bar, 'decimals', ['0', '1', '2'], (v) => live.set({ decimals: Number(v) })).value = '1';
      select(bar, 'unit', UNITS, (v) => live.set({ unit: v as S['unit'] }));
    },
    build: (s): ISpec => ({
      type: 'bar',
      data: [{ id: 'd', values }],
      xField: 'x',
      yField: 'y',
      axes: [{ orient: 'left', label: { formatMethod: fmt(s) } }],
      label: { visible: true, formatMethod: fmt(s) },
    }) as ISpec,
  });
};

export default mount;
