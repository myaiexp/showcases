// A y scale transform converts Fahrenheit to Celsius
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const sftemp = await csv('sf-temperatures.csv');
  return mountPlot(el, ctx, {
    initial: { celsius: true },
    render: ({ celsius }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: celsius
          ? { grid: true, label: 'Temperature (°C)', transform: (f: number) => (f - 32) * (5 / 9) }
          : { grid: true, label: 'Temperature (°F)' },
        marks: [Plot.ruleY([32]), Plot.lineY(sftemp, Plot.windowY(7, { x: 'date', y: 'high' }))],
      }),
    step: ({ celsius }) => ({ celsius: !celsius }),
    controls: (bar, live) => toggle(bar, 'transform to °C ', live.state.celsius, (celsius) => live.set({ celsius })),
  });
};

export default mount;
