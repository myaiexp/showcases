// Polygons: polygonsData with a cap colour read from each country's area
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

const MAX_AREA = Math.max(...countries.map((c) => c.properties.area));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every country is one polygon; its cap colour is a function of its land area.' });
  const dark = await texture('dark');

  let scale: 'log' | 'linear' = 'log';
  // Maps a country's area to 0..1, then to a colour from teal to orange.
  const capColor = (d: object): string => {
    const a = (d as Country).properties.area;
    const t = scale === 'log' ? Math.log(a + 1) / Math.log(MAX_AREA + 1) : Math.sqrt(a / MAX_AREA);
    return `hsl(${Math.round(190 - 160 * t)}, 75%, ${Math.round(32 + 26 * t)}%)`;
  };

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .polygonsData(countries)
    .polygonCapColor(capColor)
    .polygonSideColor(() => 'rgba(30, 60, 90, 0.5)')
    .polygonStrokeColor(() => '#0b1622')
    .polygonAltitude(0.01);

  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  if (stage.bar) {
    select(stage.bar, 'Colour scale', ['log', 'linear'] as const, (v) => {
      scale = v;
      // Accessors are read again only when the prop is set.
      globe.polygonCapColor(capColor);
    });
  }
  return stage.dispose;
};

export default mount;
