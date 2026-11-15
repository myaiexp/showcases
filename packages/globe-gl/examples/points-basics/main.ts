// Points layer: each accessor as an attribute name, a constant or a function of the datum
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Column height and width follow each city’s population; colour follows its hemisphere.' });
  const dark = await texture('dark');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .pointsData(cities)
    // Attribute names: read d.lat and d.lng (also the defaults).
    .pointLat('lat')
    .pointLng('lng')
    // Functions of the datum.
    .pointColor((d) => ((d as City).lat >= 0 ? '#ffb347' : '#5ec8ff'))
    .pointAltitude((d) => (d as City).pop / 60)
    .pointRadius((d) => 0.25 + Math.sqrt((d as City).pop) * 0.12)
    // A plain constant: 24 segments around each column.
    .pointResolution(24)
    .pointLabel((d) => `${(d as City).name}: ${(d as City).pop} M`);

  globe.pointOfView({ lat: 20, lng: 60, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  return stage.dispose;
};

export default mount;
