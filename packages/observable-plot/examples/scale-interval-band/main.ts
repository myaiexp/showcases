// An x interval of "day" shows days without data as gaps
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = (await csv('aapl.csv')).slice(-40);
  return mountPlot(el, ctx, {
    initial: { intervaled: true },
    render: ({ intervaled }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginBottom: preview ? 50 : 80,
        x: { tickRotate: -90, interval: intervaled ? 'day' : undefined, label: null },
        y: { transform: (d: number) => d / 1e6, label: 'Daily trade volume (millions)' },
        marks: [Plot.barY(aapl, { x: 'Date', y: 'Volume' }), Plot.ruleY([0])],
      }),
    step: ({ intervaled }) => ({ intervaled: !intervaled }),
    controls: (bar, live) => toggle(bar, 'interval: day ', live.state.intervaled, (intervaled) => live.set({ intervaled })),
  });
};

export default mount;
