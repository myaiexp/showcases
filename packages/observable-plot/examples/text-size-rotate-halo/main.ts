// Text: fontSize and rotate as channels, and a halo from fill, stroke, paintOrder
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['fontSize channel', 'rotate channel', 'halo over dots'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  const cars = await csv('cars.csv');
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: MODES[0] },
    render: ({ mode }, { width, height, preview }) => {
      if (mode === 'halo over dots') {
        const labelled = cars.filter((_, i) => i % 28 === 0);
        return Plot.plot({
          width,
          height,
          grid: true,
          marks: [
            Plot.dot(cars, { x: 'weight (lb)', y: 'economy (mpg)', r: 4, fill: 'orange', fillOpacity: 0.6 }),
            // Foreground fill, background stroke; paintOrder defaults to stroke, so the stroke sits behind.
            Plot.text(labelled, { x: 'weight (lb)', y: 'economy (mpg)', text: 'name', fill: 'currentColor', stroke: 'var(--plot-background)', strokeWidth: 4, fontWeight: 'bold', dy: -8 }),
          ],
        });
      }
      return Plot.plot({
        width,
        height,
        label: null,
        y: mode === 'fontSize channel' ? { axis: null } : {},
        marks: [
          Plot.text(alphabet, {
            x: 'letter',
            y: mode === 'fontSize channel' ? 0 : 'frequency',
            text: 'letter',
            fontSize: mode === 'fontSize channel' ? (d: { frequency: number }) => 6 + d.frequency * (preview ? 150 : 300) : 12,
            rotate: mode === 'rotate channel' ? (d: { frequency: number }) => d.frequency * 2000 - 90 : 0,
          }),
        ],
      });
    },
    step: (_s, i) => ({ mode: MODES[i % MODES.length] ?? MODES[0] }),
    controls: (bar, live) => {
      select(bar, 'text styling', MODES, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;
