// y2 instead of y skips the implicit stack; a blend mode shows overlap
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountPlot<{ overlap: boolean }>(el, ctx, {
    initial: { overlap: true },
    render: ({ overlap }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginBottom: preview ? 10 : 100,
        x: { label: null, tickRotate: 90, axis: preview ? null : 'bottom' },
        y: { grid: true },
        color: { legend: !preview },
        marks: [
          Plot.barY(olympians, Plot.groupX({ [overlap ? 'y2' : 'y']: 'count' }, { x: 'sport', fill: 'sex', mixBlendMode: overlap ? 'screen' : undefined })),
          Plot.ruleY([0]),
        ],
      }),
    step: ({ overlap }) => ({ overlap: !overlap }),
    controls: (bar, live) => toggle(bar, 'y2 (overlap) instead of y (stack)', live.state.overlap, (overlap) => live.set({ overlap })),
  });
};

export default mount;
