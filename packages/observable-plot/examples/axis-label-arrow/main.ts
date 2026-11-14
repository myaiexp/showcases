// The labelArrow option: which arrow, if any, follows an axis label
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const ARROWS = ['auto', 'up', 'right', 'down', 'left', 'none', 'true'] as const;
type Arrow = (typeof ARROWS)[number];

const mount: Mount = (el, ctx) =>
  mountPlot<{ arrow: Arrow }>(el, ctx, {
    initial: { arrow: 'auto' },
    render: ({ arrow }, { width, height }) => {
      const labelArrow = arrow === 'true' ? true : arrow;
      return Plot.plot({
        width,
        height,
        grid: true,
        x: { domain: [0, 10] },
        y: { domain: [0, 10] },
        marks: [
          Plot.axisX({ label: `x, labelArrow: ${arrow}`, labelArrow }),
          Plot.axisY({ label: `y, labelArrow: ${arrow}`, labelArrow }),
        ],
      });
    },
    step: ({ arrow }) => ({ arrow: ARROWS[(ARROWS.indexOf(arrow) + 1) % ARROWS.length] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'labelArrow', ARROWS, 'auto', (arrow) => live.set({ arrow }));
    },
  });

export default mount;
