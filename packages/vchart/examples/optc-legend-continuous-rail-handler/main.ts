// Continuous legend parts: rail, track, handler style, slidable and inverse
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { scatterPoints } from '../../shared/components-data.ts';

interface S { slidable: boolean; inverse: boolean }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { slidable: true, inverse: false },
    previewMs: 1500,
    step: (s, i) => ({ slidable: i % 4 !== 3, inverse: i % 2 === 1 }),
    build: (s) =>
      ({
        type: 'scatter',
        data: [{ id: 'd', values: scatterPoints(50, 8) }],
        xField: 'x',
        yField: 'y',
        point: { style: { size: 10, fill: { field: 'size', scale: 'color' } } },
        // The linear colour scale is what the continuous legend reads.
        color: { type: 'linear', domain: [{ dataId: 'd', fields: ['size'] }], range: ['#38bdf8', '#fbbf24', '#f87171'] },
        axes: [{ orient: 'left', type: 'linear' }, { orient: 'bottom', type: 'linear' }],
        legends: [
          {
            type: 'color',
            visible: true,
            field: 'size',
            orient: 'bottom',
            slidable: s.slidable,
            inverse: s.inverse,
            rail: { width: 260, height: 10, style: { fill: 'rgba(255,255,255,0.12)' } },
            track: { style: { fill: '#fbbf24', fillOpacity: 0.35 } },
            handler: { visible: true, style: { symbolType: 'circle', size: 16, fill: '#fbbf24', stroke: '#0f172a', lineWidth: 2 } },
            handlerText: { visible: true, formatter: (v: number) => `${Math.round(v)} pts`, style: { fill: '#e5e7eb' } },
            startText: { visible: true, space: 24, text: 'small', style: { fill: '#38bdf8' } },
            endText: { visible: true, space: 24, text: 'large', style: { fill: '#f87171' } },
          },
        ],
      }) as never,
    controls: (bar, live) => {
      select(bar, 'slidable', ['true', 'false'], (v) => live.set({ slidable: v === 'true' }));
      select(bar, 'inverse', ['false', 'true'], (v) => live.set({ inverse: v === 'true' }));
    },
  });

export default mount;
