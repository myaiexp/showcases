// Grid with strokeDasharray: dashed grid lines, any dash pattern
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const DASHES = ['2', '5,3', '8,2,2,2', '1,6', 'solid'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ dash: (typeof DASHES)[number] }>(el, ctx, {
    initial: { dash: '2' },
    render: ({ dash }, { width, height }) =>
      Plot.gridX({ strokeDasharray: dash === 'solid' ? undefined : dash, strokeOpacity: 1 }).plot({ width, height, x: { type: 'linear' } }),
    step: ({ dash }) => ({ dash: DASHES[(DASHES.indexOf(dash) + 1) % DASHES.length] }),
    previewMs: 1800,
    controls: (bar, live) => select(bar, 'strokeDasharray', DASHES, live.state.dash, (dash) => live.set({ dash })),
  });

export default mount;
