// domainLine startSymbol / endSymbol: arrows or dots at the ends of the axis lines
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { scatterPoints } from '../../shared/components-data.ts';

const SHAPES = ['arrow', 'triangle', 'circle', 'diamond'];

interface S { shape: string; size: number }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { shape: 'arrow', size: 12 },
    previewMs: 1300,
    step: (_s, i) => ({ shape: SHAPES[i % SHAPES.length] as string, size: 12 }),
    build: (s) => {
      const symbol = (visible: boolean) => ({ visible, symbolType: s.shape, size: s.size, style: { fill: '#fbbf24', stroke: '#fbbf24' } });
      return {
        type: 'scatter',
        data: [{ id: 'd', values: scatterPoints(30, 5) }],
        xField: 'x',
        yField: 'y',
        seriesField: 'type',
        legends: { visible: false },
        axes: [
          { orient: 'bottom', type: 'linear', domainLine: { visible: true, style: { stroke: '#fbbf24', lineWidth: 2 }, endSymbol: symbol(true), startSymbol: symbol(false) } },
          { orient: 'left', type: 'linear', domainLine: { visible: true, style: { stroke: '#fbbf24', lineWidth: 2 }, endSymbol: symbol(true), startSymbol: symbol(true) } },
        ],
      };
    },
    controls: (bar, live) => {
      select(bar, 'symbolType', SHAPES, (v) => live.set({ shape: v }));
      slider(bar, 'size', [6, 24, 2], live.state.size, (v) => live.set({ size: v }));
    },
  });

export default mount;
