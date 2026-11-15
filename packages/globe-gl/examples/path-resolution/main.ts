// Paths: pathResolution is the longest ground gap before a segment is split
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

// A few widely spaced points: how the gaps between them are filled decides if the line hugs the globe.
const paths = [
  [[50, -100], [0, -40], [-50, 20], [0, 80], [50, 140]],
  [[-20, -150], [30, -90], [60, -30], [30, 30], [-20, 90]],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['pathResolution: 60', 'pathResolution: 2 (default)'],
    hint: 'Coarse: long straight chords cut under the surface. Fine: the line follows the sphere.',
  });
  const dark = await texture('dark');

  const [left, right] = stage.panes;
  const coarse = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .pathsData(paths)
    // Gaps wider than this many degrees get extra points; 60 leaves them as straight chords.
    .pathResolution(60)
    .pathColor(() => '#ffd166');

  const fine = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .pathsData(paths)
    .pathResolution(2)
    .pathColor(() => '#5ec8ff');

  if (stage.bar) {
    slider(stage.bar, 'Left pane (deg)', 1, 90, 1, 60, (v) => coarse.pathResolution(v));
  }

  for (const g of [coarse, fine]) {
    g.pointOfView({ lat: 10, lng: 20, altitude: stage.preview ? 3 : 2.8 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.8;
  }

  return stage.dispose;
};

export default mount;
