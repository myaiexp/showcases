// Crosshair rule and text styling and the maxRadius reach
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

interface State {
  maxRadius: number;
  ruleWidth: number;
  textStroke: number;
}

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<State>(el, ctx, {
    initial: { maxRadius: 40, ruleWidth: 2, textStroke: 5 },
    render: ({ maxRadius, ruleWidth, textStroke }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.dot(penguins, { x: 'flipper_length_mm', y: 'body_mass_g', fill: 'species', r: 2.5 }),
          Plot.crosshair(penguins, {
            x: 'flipper_length_mm',
            y: 'body_mass_g',
            ruleStroke: 'orange',
            ruleStrokeOpacity: 0.8,
            ruleStrokeWidth: ruleWidth,
            textFill: 'orange',
            textStroke: 'black',
            textStrokeWidth: textStroke,
            maxRadius,
          }),
        ],
      }),
    after: (root, _live, size) =>
      size.preview ? sweepPointer(root, (t) => [0.2 + 0.6 * t, 0.5 + 0.3 * Math.sin(t * Math.PI * 4)], 5000) : undefined,
    controls: (bar, live) => {
      slider(bar, 'maxRadius', [5, 200, 5], live.state.maxRadius, (maxRadius) => live.set({ maxRadius }));
      slider(bar, 'ruleStrokeWidth', [1, 8, 1], live.state.ruleWidth, (ruleWidth) => live.set({ ruleWidth }));
      slider(bar, 'textStrokeWidth', [0, 10, 1], live.state.textStroke, (textStroke) => live.set({ textStroke }));
    },
  });
};

export default mount;
