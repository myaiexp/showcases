// Tree options: textLayout, dots versus link markers, and link styling
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MARKERS = ['none', 'arrow', 'circle', 'dot'] as const;
type Marker = (typeof MARKERS)[number];
const LAYOUTS = ['mirrored', 'normal'] as const;

const mount: Mount = async (el, ctx) => {
  const all = await csv('flare.csv');
  const flare = all.filter((d) => d.name === 'flare' || d.name.startsWith('flare.animate.interpolate'));
  return mountPlot(el, ctx, {
    initial: { textLayout: 'mirrored' as (typeof LAYOUTS)[number], marker: 'none' as Marker, dashed: false },
    render: ({ textLayout, marker, dashed }, { width, height }) =>
      Plot.plot({
        width,
        height: height ?? 520,
        axis: null,
        margin: 10,
        marginLeft: 30,
        marginRight: 140,
        marks: [
          Plot.tree(flare, {
            path: 'name',
            delimiter: '.',
            textLayout,
            // A marker replaces the dots unless dot: true brings them back.
            marker: marker === 'none' ? undefined : marker,
            dot: marker === 'none' ? true : undefined,
            strokeDasharray: dashed ? '3,2' : undefined,
            strokeOpacity: 0.7,
            textStroke: 'var(--plot-background)',
          }),
        ],
      }),
    step: (s, i) => ({
      textLayout: LAYOUTS[i % 2] ?? 'mirrored',
      marker: MARKERS[Math.floor(i / 2) % MARKERS.length] ?? 'none',
      dashed: s.dashed,
    }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'textLayout', LAYOUTS, live.state.textLayout, (textLayout) => live.set({ textLayout }));
      select(bar, 'marker', MARKERS, live.state.marker, (marker) => live.set({ marker }));
      toggle(bar, 'strokeDasharray', live.state.dashed, (dashed) => live.set({ dashed }));
    },
  });
};

export default mount;
