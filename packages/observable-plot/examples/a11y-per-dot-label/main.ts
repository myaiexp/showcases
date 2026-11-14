// ariaLabel and ariaDescription per mark: one short label for every dot
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, thin } from '../../shared/data.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = (await csv('penguins.csv')).filter((d) => d.sex);
  const penguins = ctx.preview ? thin(all, 9) : thin(all, 3);
  const label = (d: (typeof all)[number]): string => `${d.species} penguin on ${d.island}, ${d.sex.toLowerCase()}, bill ${d.culmen_length_mm} by ${d.culmen_depth_mm} mm`;
  const n = penguins.length;
  return mountPlot<{ focus: number }>(el, ctx, {
    initial: { focus: 0 },
    render: ({ focus }, { width, height, preview }) => {
      const current = penguins[focus % n]!;
      return Plot.plot({
        width,
        height,
        grid: true,
        marginTop: preview ? 26 : 40,
        title: preview ? undefined : 'Screen reader cursor',
        subtitle: preview ? undefined : label(current),
        x: { label: 'culmen length (mm)' },
        y: { label: 'culmen depth (mm)' },
        marks: [
          // Each dot's <circle> carries its own aria-label; the whole mark carries the description.
          Plot.dot(penguins, {
            x: 'culmen_length_mm',
            y: 'culmen_depth_mm',
            stroke: 'species',
            ariaLabel: label,
            ariaDescription: 'Bill length against bill depth, one dot per penguin',
          }),
          Plot.dot([current], { x: 'culmen_length_mm', y: 'culmen_depth_mm', r: 8, stroke: 'currentColor', strokeWidth: 2 }),
          preview ? Plot.text([current], { text: (d) => d.species, frameAnchor: 'top-left', dx: 6, dy: -22, textAnchor: 'start' }) : null,
        ],
      });
    },
    step: ({ focus }) => ({ focus: (focus + 1) % n }),
    previewMs: 700,
    controls: (bar, live) => {
      slider(bar, 'focused dot', [0, n - 1, 1], 0, (focus) => live.set({ focus }));
    },
  });
};

export default mount;
