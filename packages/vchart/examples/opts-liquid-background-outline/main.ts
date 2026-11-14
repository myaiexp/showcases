// Liquid marks: liquid (fill), liquidBackground and liquidOutline styled separately
import { registerLiquidChart } from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

registerLiquidChart();

interface S { level: number; frame: boolean }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { level: 0.6, frame: true },
    previewMs: 1500,
    step: (s, i) => ({ level: [0.25, 0.6, 0.85, 0.45][i % 4] as number, frame: i % 6 < 4 }),
    build: (s) =>
      ({
        type: 'liquid',
        data: { id: 'd', values: [{ value: s.level }] },
        valueField: 'value',
        maskShape: 'circle',
        outlineMargin: 6,
        outlinePadding: 8,
        liquid: { style: { fill: '#38bdf8', fillOpacity: 0.85 } },
        liquidBackground: { style: { fill: s.frame ? 'rgba(56,189,248,0.12)' : 'transparent', lineWidth: 0 } },
        liquidOutline: { style: { stroke: s.frame ? '#fbbf24' : 'transparent', lineWidth: 4 } },
        indicator: { visible: true, title: { visible: true, style: { text: `${Math.round(s.level * 100)}%`, fill: '#e5e7eb', fontSize: 28 } } },
      }) as never,
    controls: (bar, live) => {
      slider(bar, 'level', [0, 1, 0.05], live.state.level, (v) => live.set({ level: v }));
      select(bar, 'background + outline', ['true', 'false'], (v) => live.set({ frame: v === 'true' }));
    },
  });

export default mount;
