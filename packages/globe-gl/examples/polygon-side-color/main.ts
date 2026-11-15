// Polygons: polygonSideColor paints the cone walls apart from the cap colour
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

const sideColors = {
  'by index': (d: object) => `hsl(${((d as Country).properties.index * 47) % 360}, 70%, 50%)`,
  'by latitude': (d: object) => ((d as Country).properties.center[0] >= 0 ? '#ff9f43' : '#2ec4b6'),
  'translucent': () => 'rgba(255, 255, 255, 0.35)',
} as const;
type Mode = keyof typeof sideColors;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Caps stay dark grey; only the walls change colour.' });
  const dark = await texture('dark');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .polygonsData(countries)
    .polygonAltitude(0.07)
    .polygonCapColor(() => '#26323f')
    .polygonSideColor(sideColors['by index']);

  globe.pointOfView({ lat: 5, lng: 20, altitude: 2.1 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.8;

  const modes = Object.keys(sideColors) as Mode[];
  if (stage.bar) {
    select(stage.bar, 'Side colour', modes, (v) => globe.polygonSideColor(sideColors[v]));
  } else {
    // A card has no controls: cycle the colourings instead.
    let i = 0;
    stage.every(2500, () => globe.polygonSideColor(sideColors[modes[++i % modes.length]!]));
  }
  return stage.dispose;
};

export default mount;
