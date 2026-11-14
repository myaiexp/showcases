// Projection clip: frame (default), a great-circle radius in degrees, or none
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const CLIPS = ['frame', '30', '60', '90', '120', 'null'] as const;

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  return mountPlot<{ clip: (typeof CLIPS)[number] }>(el, ctx, {
    initial: { clip: '60' },
    render: ({ clip }, { width, height }) =>
      Plot.plot({
        width,
        height,
        projection: {
          type: 'azimuthal-equidistant',
          rotate: [-10, -50],
          clip: clip === 'frame' ? 'frame' : clip === 'null' ? null : Number(clip),
        },
        marks: [Plot.graticule(), Plot.geo(land, { fill: 'currentColor', fillOpacity: 0.5 }), Plot.frame()],
      }),
    step: ({ clip }) => ({ clip: CLIPS[(CLIPS.indexOf(clip) + 1) % CLIPS.length] }),
    previewMs: 1600,
    controls: (bar, live) => {
      select(bar, 'clip', CLIPS, live.state.clip, (clip) => live.set({ clip }));
    },
  });
};

export default mount;
