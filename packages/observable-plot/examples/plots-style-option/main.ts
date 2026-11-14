// The style option as a string or an object, and className, on a bar chart
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after } from '../../shared/marks-data.ts';

const STYLES = ['default', 'string', 'object'] as const;
type StyleMode = (typeof STYLES)[number];

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ mode: StyleMode }>(el, ctx, {
    initial: { mode: 'default' },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        // Unitless numbers are unreliable in style objects, so lengths carry units.
        style:
          mode === 'string'
            ? 'background: #1f2a44; color: gold; padding: 10px; font-size: 14px;'
            : mode === 'object'
              ? { background: '#2b1f44', color: 'lightpink', padding: '10px', fontFamily: 'serif' }
              : undefined,
        className: mode === 'default' ? undefined : 'styled-plot',
        marks: [Plot.barY(alphabet, { x: 'letter', y: 'frequency' }), Plot.ruleY([0])],
      }),
    step: ({ mode }) => ({ mode: after(STYLES, mode) }),
    controls: (bar, live) => {
      select(bar, 'style', STYLES, 'default', (mode) => live.set({ mode }));
    },
  });
};

export default mount;
